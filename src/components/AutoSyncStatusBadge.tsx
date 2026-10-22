import React, { useState, useEffect } from 'react';
import { Cloud, Check, RefreshCw, ExternalLink, AlertCircle, FileSpreadsheet } from 'lucide-react';
import { subscribeToSyncState, AutoSyncState } from '../services/autoSyncService';
import { googleSignIn } from '../services/googleAuth';

interface AutoSyncStatusBadgeProps {
  onOpenModal: () => void;
}

export const AutoSyncStatusBadge: React.FC<AutoSyncStatusBadgeProps> = ({ onOpenModal }) => {
  const [syncState, setSyncState] = useState<AutoSyncState>({
    status: 'idle',
    lastSyncTime: null,
    spreadsheetInfo: null,
    lastError: null,
    lastMilestone: null,
    isAuthenticated: false,
  });
  const [isQuickConnecting, setIsQuickConnecting] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeToSyncState((state) => {
      setSyncState(state);
    });
    return () => unsubscribe();
  }, []);

  const handleQuickConnect = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickConnecting(true);
    try {
      await googleSignIn();
    } catch {
      // handled inside googleSignIn
    } finally {
      setIsQuickConnecting(false);
    }
  };

  const hasSheetLink = Boolean(syncState.spreadsheetInfo?.webViewLink);

  return (
    <div className="flex items-center gap-1.5 text-xs">
      {/* Primary Auto-Sync Status Button */}
      <button
        onClick={onOpenModal}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
        title={
          syncState.lastSyncTime
            ? `Sincronización automática activa · Última actualización: ${syncState.lastSyncTime} (${syncState.lastMilestone || 'Hito'})`
            : 'Sincronización automática con Google Sheets en Google Drive'
        }
      >
        {syncState.status === 'syncing' ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 text-[#39A900] animate-spin shrink-0" />
            <span className="hidden sm:inline font-medium text-[11px] text-emerald-700 dark:text-emerald-400">
              Guardando en Sheets...
            </span>
          </>
        ) : syncState.status === 'synced' ? (
          <>
            <Cloud className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
            <span className="hidden sm:inline font-medium text-[11px] text-slate-700 dark:text-slate-200">
              Drive: Al día
            </span>
            {syncState.lastSyncTime && (
              <span className="hidden lg:inline text-[10px] text-slate-400 font-mono">
                {syncState.lastSyncTime.slice(0, 5)}
              </span>
            )}
          </>
        ) : syncState.status === 'error' ? (
          <>
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="hidden sm:inline font-medium text-[11px] text-amber-600 dark:text-amber-400">
              Reintentar Sync
            </span>
          </>
        ) : !syncState.isAuthenticated ? (
          <span
            onClick={handleQuickConnect}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-[#39A900]"
          >
            <Cloud className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="hidden sm:inline font-medium text-[11px]">
              {isQuickConnecting ? 'Conectando...' : 'Conectar Drive'}
            </span>
          </span>
        ) : (
          <>
            <Cloud className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
            <span className="hidden sm:inline font-medium text-[11px] text-slate-700 dark:text-slate-200">
              Drive Activo
            </span>
          </>
        )}
      </button>

      {/* Direct One-Click Link to Google Sheets if available */}
      {hasSheetLink && (
        <a
          href={syncState.spreadsheetInfo!.webViewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-[#39A900] dark:text-emerald-300 rounded-lg transition-colors cursor-pointer text-[11px] font-semibold"
          title={`Abrir "${syncState.spreadsheetInfo!.title}" directamente en Google Sheets`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
          <span className="hidden md:inline">Ver Hoja</span>
          <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
        </a>
      )}
    </div>
  );
};
