import { ApprenticeProfile, InductionProgress } from '../types/induction';
import { getAccessToken, initAuth } from './googleAuth';
import {
  saveOrUpdateApprenticeToSheet,
  findExistingSpreadsheet,
  SpreadsheetInfo,
  SPREADSHEET_TITLE,
  CACHED_SHEET_ID_KEY,
} from './googleSheetsService';

export type AutoSyncStatus = 'idle' | 'syncing' | 'synced' | 'not_connected' | 'error';

export interface AutoSyncState {
  status: AutoSyncStatus;
  lastSyncTime: string | null;
  spreadsheetInfo: SpreadsheetInfo | null;
  lastError: string | null;
  lastMilestone: string | null;
  isAuthenticated: boolean;
}

export const CACHED_SHEET_URL_KEY = 'sena_google_sheet_url';
export const CACHED_SHEET_TITLE_KEY = 'sena_google_sheet_title';

// Initialize with cached info if available from prior sessions
const initialCachedUrl = typeof window !== 'undefined' ? localStorage.getItem(CACHED_SHEET_URL_KEY) : null;
const initialCachedId = typeof window !== 'undefined' ? localStorage.getItem(CACHED_SHEET_ID_KEY) : null;
const initialCachedTitle = typeof window !== 'undefined' ? localStorage.getItem(CACHED_SHEET_TITLE_KEY) : null;

let syncState: AutoSyncState = {
  status: 'idle',
  lastSyncTime: null,
  spreadsheetInfo: initialCachedId && initialCachedUrl ? {
    id: initialCachedId,
    title: initialCachedTitle || SPREADSHEET_TITLE,
    webViewLink: initialCachedUrl,
  } : null,
  lastError: null,
  lastMilestone: null,
  isAuthenticated: false,
};

type SyncListener = (state: AutoSyncState) => void;
const listeners = new Set<SyncListener>();

const notifyListeners = () => {
  listeners.forEach((listener) => {
    try {
      listener({ ...syncState });
    } catch {
      // ignore listener errors
    }
  });
};

export const subscribeToSyncState = (listener: SyncListener): (() => void) => {
  listeners.add(listener);
  // Send current state immediately upon subscription
  listener({ ...syncState });
  return () => {
    listeners.delete(listener);
  };
};

export const getSyncState = (): AutoSyncState => {
  return { ...syncState };
};

// In-memory queue & debounce
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let pendingPayload: { profile: ApprenticeProfile; progress: InductionProgress; milestone: string } | null = null;
let isCurrentlySyncing = false;

/**
 * Initializes automatic background synchronization and auth monitoring.
 */
export const initAutoSync = () => {
  initAuth(
    async (user, token) => {
      syncState.isAuthenticated = true;
      if (syncState.status === 'not_connected') {
        syncState.status = 'idle';
      }
      notifyListeners();

      // Check and refresh spreadsheet link
      try {
        const found = await findExistingSpreadsheet();
        if (found) {
          syncState.spreadsheetInfo = found;
          localStorage.setItem(CACHED_SHEET_ID_KEY, found.id);
          localStorage.setItem(CACHED_SHEET_URL_KEY, found.webViewLink);
          localStorage.setItem(CACHED_SHEET_TITLE_KEY, found.title);
          notifyListeners();
        }
      } catch {
        // silent check
      }

      // If there was a pending payload waiting for login, sync immediately!
      if (pendingPayload) {
        const payload = pendingPayload;
        pendingPayload = null;
        executeSync(payload.profile, payload.progress, payload.milestone);
      }
    },
    () => {
      syncState.isAuthenticated = false;
      syncState.status = 'not_connected';
      notifyListeners();
    }
  );
};

/**
 * Core execution of Google Sheets synchronization.
 */
const executeSync = async (
  profile: ApprenticeProfile,
  progress: InductionProgress,
  milestone: string
) => {
  if (isCurrentlySyncing) {
    // Queue up payload for next run
    pendingPayload = { profile, progress, milestone };
    return;
  }

  const token = await getAccessToken();
  if (!token) {
    syncState.status = 'not_connected';
    syncState.lastMilestone = milestone;
    pendingPayload = { profile, progress, milestone };
    notifyListeners();
    return;
  }

  isCurrentlySyncing = true;
  syncState.status = 'syncing';
  syncState.lastMilestone = milestone;
  syncState.lastError = null;
  notifyListeners();

  try {
    const result = await saveOrUpdateApprenticeToSheet(profile, progress);
    syncState.status = 'synced';
    syncState.spreadsheetInfo = result.spreadsheetInfo;
    syncState.lastSyncTime = new Date().toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    syncState.lastError = null;

    localStorage.setItem(CACHED_SHEET_ID_KEY, result.spreadsheetInfo.id);
    localStorage.setItem(CACHED_SHEET_URL_KEY, result.spreadsheetInfo.webViewLink);
    localStorage.setItem(CACHED_SHEET_TITLE_KEY, result.spreadsheetInfo.title);
  } catch (error: any) {
    console.warn('Error en sincronización automática con Google Sheets:', error);
    syncState.status = 'error';
    syncState.lastError = error?.message || 'Error al sincronizar con Google Sheets';
  } finally {
    isCurrentlySyncing = false;
    notifyListeners();

    // If another milestone was queued during sync, execute it
    if (pendingPayload) {
      const next = pendingPayload;
      pendingPayload = null;
      setTimeout(() => {
        executeSync(next.profile, next.progress, next.milestone);
      }, 500);
    }
  }
};

/**
 * Dispatches an automatic sync request with 1.2s debounce to prevent API rate limits.
 */
export const triggerAutoSync = (
  profile: ApprenticeProfile,
  progress: InductionProgress,
  milestone: string
) => {
  pendingPayload = { profile, progress, milestone };

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    if (pendingPayload) {
      const p = pendingPayload;
      pendingPayload = null;
      executeSync(p.profile, p.progress, p.milestone);
    }
  }, 1200);
};
