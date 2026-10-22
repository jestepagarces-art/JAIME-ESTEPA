import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  Cloud,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  LogOut,
  AlertCircle,
  Database,
  UserCheck,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logoutGoogle,
  getAccessToken,
} from '../services/googleAuth';
import {
  findExistingSpreadsheet,
  saveOrUpdateApprenticeToSheet,
  fetchApprenticesFromSheet,
  SpreadsheetInfo,
  SheetApprenticeRecord,
  SPREADSHEET_TITLE,
} from '../services/googleSheetsService';
import { ApprenticeProfile, InductionProgress } from '../types/induction';

interface GoogleDriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  progress: InductionProgress;
  onSyncSuccess?: () => void;
}

export const GoogleDriveSyncModal: React.FC<GoogleDriveSyncModalProps> = ({
  isOpen,
  onClose,
  profile,
  progress,
  onSyncSuccess,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [sheetInfo, setSheetInfo] = useState<SpreadsheetInfo | null>(null);
  const [apprenticesList, setApprenticesList] = useState<SheetApprenticeRecord[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [showConfirmSync, setShowConfirmSync] = useState<boolean>(false);
  const [urlCopied, setUrlCopied] = useState<boolean>(false);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2500);
  };

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        checkSpreadsheet(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setSheetInfo(null);
        setApprenticesList([]);
      }
    );

    return () => unsubscribe();
  }, []);

  // When modal opens, check token & sheet
  useEffect(() => {
    if (isOpen) {
      getAccessToken().then((t) => {
        if (t) {
          setToken(t);
          checkSpreadsheet(t);
        }
      });
    }
  }, [isOpen]);

  const checkSpreadsheet = async (authToken?: string) => {
    if (!authToken && !token) return;
    try {
      const found = await findExistingSpreadsheet();
      if (found) {
        setSheetInfo(found);
        loadRecords(found.id);
      }
    } catch (err) {
      console.warn('Error verificando hoja existente:', err);
    }
  };

  const loadRecords = async (spreadsheetId: string) => {
    setIsLoadingRecords(true);
    try {
      const records = await fetchApprenticesFromSheet(spreadsheetId);
      setApprenticesList(records);
    } catch {
      // ignore
    } finally {
      setIsLoadingRecords(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setStatusMessage({
          type: 'success',
          text: `Conectado exitosamente como ${res.user.displayName || res.user.email}`,
        });
        checkSpreadsheet(res.accessToken);
      } else {
        // User closed or dismissed the popup window
        setStatusMessage({
          type: 'info',
          text: 'La ventana de inicio de sesión fue cerrada. Haz clic nuevamente en "Iniciar sesión con Google" para continuar.',
        });
      }
    } catch (err: any) {
      const msg = err?.message || 'Error al iniciar sesión con Google';
      if (msg.includes('popup-closed-by-user') || msg.includes('cancelled-popup-request')) {
        setStatusMessage({
          type: 'info',
          text: 'La ventana de inicio de sesión fue cerrada. Haz clic en "Iniciar sesión con Google" para continuar.',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: msg,
        });
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setToken(null);
    setSheetInfo(null);
    setApprenticesList([]);
    setStatusMessage({ type: 'info', text: 'Sesión de Google cerrada' });
  };

  // Perform the sync operation with user confirmation
  const handleExecuteSync = async () => {
    setIsSyncing(true);
    setStatusMessage(null);
    setShowConfirmSync(false);

    try {
      const result = await saveOrUpdateApprenticeToSheet(profile, progress);
      setSheetInfo(result.spreadsheetInfo);
      setStatusMessage({
        type: 'success',
        text: result.isUpdate
          ? `¡Datos del aprendiz ${profile.fullName} actualizados en Google Sheets!`
          : `¡Nuevo aprendiz ${profile.fullName} registrado en Google Sheets!`,
      });
      loadRecords(result.spreadsheetInfo.id);
      if (onSyncSuccess) onSyncSuccess();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Error al sincronizar con Google Sheets',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (!isOpen) return null;

  const passed = progress.quizCompleted || progress.quizScore >= 70;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#39A900] shadow-xs">
              <FileSpreadsheet className="w-5 h-5 text-[#39A900]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#00324D] dark:text-sky-300">
                  Almacenamiento en Google Drive & Sheets
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                  Google Workspace
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Guarda y sincroniza los datos oficiales de los aprendices en una hoja de cálculo en la nube
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Status Notification Banner */}
          {statusMessage && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                  : statusMessage.type === 'error'
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-300'
                  : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
              ) : statusMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              ) : (
                <Cloud className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 font-medium">{statusMessage.text}</div>
            </div>
          )}

          {/* Authentication State */}
          {!user ? (
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-[#00324D] dark:text-sky-400">
                <Cloud className="w-6 h-6 text-[#39A900]" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="text-sm font-bold text-[#00324D] dark:text-white">
                  Conecta tu cuenta de Google
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Para crear la hoja de cálculo institucional en tu Google Drive y almacenar los registros de
                  aprendices, inicia sesión con tu cuenta de Google.
                </p>
              </div>

              {/* Official Google Sign-In Button */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="inline-flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-300 dark:border-slate-600 shadow-xs hover:shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                  <span>{isLoggingIn ? 'Iniciando sesión...' : 'Iniciar sesión con Google'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                💡 Se abrirá una ventana emergente de Google. Si no aparece o se cierra de inmediato, asegúrate de permitir las ventanas emergentes (pop-ups) en tu navegador.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Connected User Account Bar */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Google User'}
                      className="w-8 h-8 rounded-full border border-emerald-400"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#00324D] text-white flex items-center justify-center font-bold">
                      {(user.displayName || user.email || 'G')[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">
                      {user.displayName || 'Usuario de Google'}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                      {user.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGoogleLogout}
                  className="px-2.5 py-1 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer text-[11px]"
                  title="Desconectar cuenta"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Desconectar</span>
                </button>
              </div>

              {/* Active Spreadsheet Status Card */}
              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#39A900] text-white flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#00324D] dark:text-emerald-300 block">
                        {sheetInfo ? sheetInfo.title : 'SENA Inducción - Registro de Aprendices'}
                      </span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                        {sheetInfo ? '● Hoja vinculada en tu Google Drive' : '○ Pendiente por inicializar en tu Drive'}
                      </span>
                    </div>
                  </div>

                  {sheetInfo && (
                    <a
                      href={sheetInfo.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#39A900] hover:bg-[#329600] text-white font-bold text-xs rounded-lg shadow-xs transition-all cursor-pointer shrink-0"
                    >
                      <span>Abrir en Google Sheets</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {sheetInfo ? (
                  <div className="space-y-2 pt-1">
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Enlace directo a tu hoja de cálculo en Google Drive:
                    </p>
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-lg p-1.5">
                      <input
                        type="text"
                        readOnly
                        value={sheetInfo.webViewLink}
                        className="flex-1 text-xs bg-transparent border-none outline-none font-mono text-slate-700 dark:text-slate-200 px-2 select-all"
                        title="URL directa de la hoja de cálculo"
                      />
                      <button
                        onClick={() => handleCopyUrl(sheetInfo.webViewLink)}
                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/60 dark:hover:bg-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {urlCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{urlCopied ? 'Copiado' : 'Copiar URL'}</span>
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span>Pestañas activas:</span>
                      <strong className="font-semibold text-slate-700 dark:text-slate-300">"Aprendices"</strong>
                      <span>y</span>
                      <strong className="font-semibold text-slate-700 dark:text-slate-300">"Bitácora de Evaluaciones"</strong>
                    </div>

                    <div className="p-2.5 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-300 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                      <span>
                        <strong>Sincronización Automática Activa:</strong> Cada vez que avances en un módulo, actualices tus datos o apruebes la evaluación, la plataforma guardará automáticamente los cambios en tu Google Drive sin requerir que abras este panel.
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Al presionar <strong>"Sincronizar mis datos"</strong> a continuación, la plataforma creará automáticamente la hoja 
                    <em> "{SPREADSHEET_TITLE}"</em> en tu Google Drive personal y te entregará el enlace permanente de acceso.
                  </p>
                )}
              </div>

              {/* Data Preview to be stored */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-[#39A900]" />
                    <span>Datos a sincronizar del aprendiz actual:</span>
                  </div>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    {passed ? '✓ Certificado Aprobado' : '● En Progreso'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Aprendiz:</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-semibold truncate block">
                      {profile.fullName}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Identificación:</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-mono">
                      {profile.docType} {profile.docNumber}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ficha:</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-mono">
                      #{profile.ficha}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Programa:</span>
                    <strong className="text-slate-800 dark:text-slate-200 truncate block">
                      {profile.program}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Avance Módulos:</span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {progress.modulesCompleted.length} de 8 módulos
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Calificación:</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-mono">
                      {progress.quizScore}% ({progress.xp} XP)
                    </strong>
                  </div>
                </div>

                {/* Explicit Sync Action Button with Confirmation */}
                {!showConfirmSync ? (
                  <button
                    onClick={() => setShowConfirmSync(true)}
                    disabled={isSyncing}
                    className="w-full mt-2 py-2.5 px-4 bg-[#39A900] hover:bg-[#329600] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Cloud className="w-4 h-4" />
                    <span>Sincronizar mis datos a la Hoja de Google Drive</span>
                  </button>
                ) : (
                  /* User Confirmation Dialog (MANDATORY per Workspace guidelines) */
                  <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-xl space-y-2 mt-2">
                    <div className="flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200 font-semibold">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>¿Confirmas el registro/actualización de estos datos en tu Google Drive?</span>
                    </div>
                    <p className="text-[11px] text-amber-800 dark:text-amber-300">
                      Se escribirá una fila con la información del aprendiz <strong>{profile.fullName}</strong> en la hoja de cálculo <em>"{SPREADSHEET_TITLE}"</em>.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={handleExecuteSync}
                        disabled={isSyncing}
                        className="px-3.5 py-1.5 bg-[#39A900] hover:bg-[#329600] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        {isSyncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        <span>Confirmar y Guardar en Drive</span>
                      </button>
                      <button
                        onClick={() => setShowConfirmSync(false)}
                        className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Apprentices List stored in Sheet */}
              {sheetInfo && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#00324D] dark:text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-[#39A900]" />
                      <span>Aprendices registrados en la Hoja de Google ({apprenticesList.length})</span>
                    </div>
                    <button
                      onClick={() => sheetInfo && loadRecords(sheetInfo.id)}
                      disabled={isLoadingRecords}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer text-[11px]"
                      title="Refrescar datos"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoadingRecords ? 'animate-spin' : ''}`} />
                      <span>Refrescar</span>
                    </button>
                  </div>

                  {apprenticesList.length === 0 ? (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-xl text-center text-xs text-slate-500">
                      Aún no hay filas registradas. Haz clic en el botón de sincronización para registrar al primer aprendiz.
                    </div>
                  ) : (
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 sticky top-0 text-[11px]">
                          <tr>
                            <th className="p-2 font-bold">Aprendiz</th>
                            <th className="p-2 font-bold">Documento</th>
                            <th className="p-2 font-bold">Ficha</th>
                            <th className="p-2 font-bold">Puntaje</th>
                            <th className="p-2 font-bold">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
                          {apprenticesList.map((appr, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-2 font-semibold text-[#00324D] dark:text-sky-300">
                                {appr.fullName}
                              </td>
                              <td className="p-2 font-mono">{appr.docType} {appr.docNumber}</td>
                              <td className="p-2 font-mono">#{appr.ficha}</td>
                              <td className="p-2 font-mono">{appr.quizScore}</td>
                              <td className="p-2">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                    appr.status.includes('APROBADO')
                                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                  }`}
                                >
                                  {appr.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Integración directa con Google Drive & Google Sheets API v4</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
