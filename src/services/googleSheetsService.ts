import { ApprenticeProfile, InductionProgress } from '../types/induction';
import { getAccessToken } from './googleAuth';

export const SPREADSHEET_TITLE = 'SENA Inducción - Registro de Aprendices';
export const CACHED_SHEET_ID_KEY = 'sena_google_sheet_id';

export interface SheetApprenticeRecord {
  id: string;
  registeredAt: string;
  fullName: string;
  docType: string;
  docNumber: string;
  regional: string;
  center: string;
  program: string;
  ficha: string;
  modality: string;
  jornada: string;
  modulesCompleted: string;
  quizScore: string;
  status: string;
  certificateCode: string;
  certificateDate: string;
  updatedAt: string;
}

export interface SpreadsheetInfo {
  id: string;
  title: string;
  webViewLink: string;
  createdTime?: string;
}

/**
 * Searches for an existing "SENA Inducción - Registro de Aprendices" spreadsheet in user's Drive.
 */
export const findExistingSpreadsheet = async (): Promise<SpreadsheetInfo | null> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Usuario no autenticado en Google');

  // Check cached ID first
  const cachedId = localStorage.getItem(CACHED_SHEET_ID_KEY);
  if (cachedId) {
    try {
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files/${cachedId}?fields=id,name,webViewLink,trashed`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const file = await res.json();
        if (!file.trashed) {
          return {
            id: file.id,
            title: file.name,
            webViewLink: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
          };
        }
      }
    } catch {
      // ignore and perform search
    }
  }

  // Search by name and MIME type in Drive
  const q = encodeURIComponent(
    `name = '${SPREADSHEET_TITLE}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`
  );
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,webViewLink,createdTime)&orderBy=modifiedTime desc`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || 'Error al buscar archivo en Google Drive');
  }

  const data = await response.json();
  if (data.files && data.files.length > 0) {
    const found = data.files[0];
    localStorage.setItem(CACHED_SHEET_ID_KEY, found.id);
    return {
      id: found.id,
      title: found.name,
      webViewLink: found.webViewLink || `https://docs.google.com/spreadsheets/d/${found.id}/edit`,
      createdTime: found.createdTime,
    };
  }

  return null;
};

/**
 * Creates a brand new Google Spreadsheet in Google Drive formatted for SENA Induction records.
 */
export const createInductionSpreadsheet = async (): Promise<SpreadsheetInfo> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Usuario no autenticado en Google');

  const createBody = {
    properties: {
      title: SPREADSHEET_TITLE,
    },
    sheets: [
      {
        properties: {
          title: 'Aprendices',
          gridProperties: {
            frozenRowCount: 1,
          },
        },
      },
      {
        properties: {
          title: 'Bitácora de Evaluaciones',
          gridProperties: {
            frozenRowCount: 1,
          },
        },
      },
    ],
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createBody),
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(err?.error?.message || 'Error al crear la hoja de cálculo en Google Sheets');
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  localStorage.setItem(CACHED_SHEET_ID_KEY, spreadsheetId);

  // Initialize Headers in "Aprendices" tab
  const headers = [
    [
      'ID Registro',
      'Fecha Registro',
      'Nombre Completo',
      'Tipo Documento',
      'Número Documento',
      'Regional',
      'Centro de Formación',
      'Programa de Formación',
      'Ficha',
      'Modalidad',
      'Jornada',
      'Módulos Completados',
      'Puntaje Evaluación (%)',
      'Estado Inducción',
      'Código Certificado',
      'Fecha Certificación',
      'Última Actualización',
    ],
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices!A1:Q1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: headers }),
    }
  );

  // Initialize Headers in "Bitácora de Evaluaciones" tab
  const logHeaders = [
    [
      'Marca Temporal',
      'Número Documento',
      'Nombre del Aprendiz',
      'Ficha',
      'Tipo de Actividad',
      'Puntaje Obtenido (%)',
      'Estado',
      'Detalles / Código Verificación',
    ],
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Bitácora de Evaluaciones'!A1:H1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: logHeaders }),
    }
  );

  return {
    id: spreadsheetId,
    title: SPREADSHEET_TITLE,
    webViewLink: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
  };
};

/**
 * Ensures that the spreadsheet exists, either by returning the existing one or creating it.
 */
export const getOrCreateSpreadsheet = async (): Promise<SpreadsheetInfo> => {
  const existing = await findExistingSpreadsheet();
  if (existing) return existing;
  return await createInductionSpreadsheet();
};

/**
 * Saves or updates an apprentice's induction progress in the Google Sheet.
 */
export const saveOrUpdateApprenticeToSheet = async (
  profile: ApprenticeProfile,
  progress: InductionProgress
): Promise<{ success: boolean; spreadsheetInfo: SpreadsheetInfo; isUpdate: boolean }> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Usuario no autenticado en Google');

  const sheetInfo = await getOrCreateSpreadsheet();
  const spreadsheetId = sheetInfo.id;
  const nowStr = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

  const passed = progress.quizCompleted || progress.quizScore >= 70;
  const statusStr = passed ? 'APROBADO (Certificado Emitido)' : 'EN PROGRESO';

  // Read existing rows to check if apprentice already has a row (Column E = Document Number)
  const rowsRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices!A2:Q1000`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  let existingRowIndex = -1;
  let registeredAtStr = nowStr;
  let recordId = `REG-${profile.docNumber.slice(-4)}-${Date.now().toString().slice(-4)}`;

  if (rowsRes.ok) {
    const data = await rowsRes.json();
    const rows: string[][] = data.values || [];
    existingRowIndex = rows.findIndex((r) => r[4] === profile.docNumber || (r[8] === profile.ficha && r[4] === profile.docNumber));
    if (existingRowIndex !== -1) {
      recordId = rows[existingRowIndex][0] || recordId;
      registeredAtStr = rows[existingRowIndex][1] || nowStr;
    }
  }

  const rowValues = [
    recordId,
    registeredAtStr,
    profile.fullName,
    profile.docType,
    profile.docNumber,
    profile.regional,
    profile.center,
    profile.program,
    profile.ficha,
    profile.modality,
    profile.jornada,
    `${progress.modulesCompleted.length} de 8 módulos`,
    `${progress.quizScore}%`,
    statusStr,
    progress.certificateCode,
    passed ? new Date(progress.certificateDate).toLocaleDateString('es-CO') : 'Pendiente',
    nowStr,
  ];

  let isUpdate = false;

  if (existingRowIndex !== -1) {
    // Update existing row (Row index is 0-indexed relative to A2, so sheet row number is existingRowIndex + 2)
    const targetRow = existingRowIndex + 2;
    const updateRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices!A${targetRow}:Q${targetRow}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [rowValues] }),
      }
    );

    if (!updateRes.ok) {
      const err = await updateRes.json();
      throw new Error(err?.error?.message || 'Error al actualizar registro en Google Sheets');
    }
    isUpdate = true;
  } else {
    // Append new row
    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices!A:Q:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [rowValues] }),
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.json();
      throw new Error(err?.error?.message || 'Error al insertar nuevo aprendiz en Google Sheets');
    }
  }

  // Also append to audit log tab
  try {
    const logValues = [
      nowStr,
      profile.docNumber,
      profile.fullName,
      profile.ficha,
      passed ? 'Evaluación Final Aprobada' : 'Progreso de Módulos / Perfil',
      `${progress.quizScore}%`,
      statusStr,
      `Certificado: ${progress.certificateCode} · XP: ${progress.xp}`,
    ];

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Bitácora de Evaluaciones'!A:H:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [logValues] }),
      }
    );
  } catch (logErr) {
    console.warn('No se pudo registrar en la bitácora auxiliar:', logErr);
  }

  return { success: true, spreadsheetInfo: sheetInfo, isUpdate };
};

/**
 * Reads all stored apprentices from the Google Sheet for preview.
 */
export const fetchApprenticesFromSheet = async (
  spreadsheetId: string
): Promise<SheetApprenticeRecord[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Usuario no autenticado en Google');

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices!A2:Q100`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || 'Error al consultar aprendices en Google Sheets');
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];

  return rows.map((r, i) => ({
    id: r[0] || `REC-${i + 1}`,
    registeredAt: r[1] || '',
    fullName: r[2] || '',
    docType: r[3] || 'CC',
    docNumber: r[4] || '',
    regional: r[5] || '',
    center: r[6] || '',
    program: r[7] || '',
    ficha: r[8] || '',
    modality: r[9] || '',
    jornada: r[10] || '',
    modulesCompleted: r[11] || '',
    quizScore: r[12] || '',
    status: r[13] || '',
    certificateCode: r[14] || '',
    certificateDate: r[15] || '',
    updatedAt: r[16] || '',
  }));
};
