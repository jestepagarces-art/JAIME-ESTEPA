import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  FileSpreadsheet, 
  Cloud, 
  RefreshCw, 
  Search, 
  Filter, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  GraduationCap, 
  BookOpen, 
  Settings, 
  Eye, 
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { SheetApprenticeRecord, fetchApprenticesFromSheet, CACHED_SHEET_ID_KEY } from '../services/googleSheetsService';
import { subscribeToSyncState, AutoSyncState } from '../services/autoSyncService';
import { SAMPLE_COHORT_APPRENTICES } from '../data/sampleCohort';
import { ApprenticeProfile, InductionProgress } from '../types/induction';
import { googleSignIn } from '../services/googleAuth';

interface InstructorDashboardProps {
  onOpenDriveModal: () => void;
  onSwitchToStudentView: () => void;
  currentApprenticeProfile: ApprenticeProfile;
  currentApprenticeProgress: InductionProgress;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  onOpenDriveModal,
  onSwitchToStudentView,
  currentApprenticeProfile,
  currentApprenticeProgress,
}) => {
  const [syncState, setSyncState] = useState<AutoSyncState>({
    status: 'idle',
    lastSyncTime: null,
    spreadsheetInfo: null,
    lastError: null,
    lastMilestone: null,
    isAuthenticated: false,
  });

  const [apprentices, setApprentices] = useState<SheetApprenticeRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sena_instructor_cohort_cache');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return SAMPLE_COHORT_APPRENTICES;
  });

  const [isLoadingSheet, setIsLoadingSheet] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFicha, setSelectedFicha] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [selectedApprenticeModal, setSelectedApprenticeModal] = useState<SheetApprenticeRecord | null>(null);

  // Subscribe to auto-sync service state
  useEffect(() => {
    const unsub = subscribeToSyncState((state) => {
      setSyncState(state);
    });
    return () => unsub();
  }, []);

  // Compute clean shareable URL for apprentices
  const apprenticeUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    return `${origin}${pathname}?role=aprendiz`;
  }, []);

  // Sync local apprentice into the cohort view if not already present
  useEffect(() => {
    if (!currentApprenticeProfile.docNumber) return;

    setApprentices((prev) => {
      const existsIndex = prev.findIndex((a) => a.docNumber === currentApprenticeProfile.docNumber);
      const passed = currentApprenticeProgress.quizCompleted || currentApprenticeProgress.quizScore >= 70;
      const statusStr = passed
        ? 'Certificado Emitido'
        : currentApprenticeProgress.modulesCompleted.length > 0
        ? 'En Progreso'
        : 'Iniciado';

      const currentRecord: SheetApprenticeRecord = {
        id: existsIndex >= 0 ? prev[existsIndex].id : `REC-LOCAL`,
        registeredAt: prev[existsIndex]?.registeredAt || new Date().toISOString().replace('T', ' ').slice(0, 19),
        fullName: currentApprenticeProfile.fullName,
        docType: currentApprenticeProfile.docType,
        docNumber: currentApprenticeProfile.docNumber,
        regional: currentApprenticeProfile.regional,
        center: currentApprenticeProfile.center,
        program: currentApprenticeProfile.program,
        ficha: currentApprenticeProfile.ficha,
        modality: currentApprenticeProfile.modality,
        jornada: currentApprenticeProfile.jornada,
        modulesCompleted: `${currentApprenticeProgress.modulesCompleted.length} de 8 (${Math.round(
          (currentApprenticeProgress.modulesCompleted.length / 8) * 100
        )}%)`,
        quizScore: currentApprenticeProgress.quizScore > 0 ? `${currentApprenticeProgress.quizScore}%` : 'Pendiente',
        status: statusStr,
        certificateCode: passed ? currentApprenticeProgress.certificateCode : 'Pendiente',
        certificateDate: passed ? currentApprenticeProgress.certificateDate : '',
        updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      };

      let updatedList: SheetApprenticeRecord[];
      if (existsIndex >= 0) {
        updatedList = [...prev];
        updatedList[existsIndex] = currentRecord;
      } else {
        updatedList = [currentRecord, ...prev];
      }

      try {
        localStorage.setItem('sena_instructor_cohort_cache', JSON.stringify(updatedList));
      } catch {
        // ignore
      }
      return updatedList;
    });
  }, [currentApprenticeProfile, currentApprenticeProgress]);

  // Load from Google Sheets when spreadsheet ID is available
  const handleRefreshFromSheet = async () => {
    const sheetId = syncState.spreadsheetInfo?.id || localStorage.getItem(CACHED_SHEET_ID_KEY);
    if (!sheetId) {
      onOpenDriveModal();
      return;
    }

    setIsLoadingSheet(true);
    try {
      const records = await fetchApprenticesFromSheet(sheetId);
      if (records && records.length > 0) {
        setApprentices(records);
        localStorage.setItem('sena_instructor_cohort_cache', JSON.stringify(records));
      }
    } catch (err: any) {
      console.warn('No se pudieron leer registros directamente de Sheets:', err);
    } finally {
      setIsLoadingSheet(false);
    }
  };

  const handleCopyLink = () => {
    if (!apprenticeUrl) return;
    navigator.clipboard.writeText(apprenticeUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const handleConnectDrive = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.warn('Error al iniciar sesión con Google:', err);
    }
  };

  // Unique fichas for filtering
  const availableFichas = useMemo(() => {
    const set = new Set<string>();
    apprentices.forEach((a) => {
      if (a.ficha) set.add(a.ficha);
    });
    return Array.from(set);
  }, [apprentices]);

  // Filtered apprentices
  const filteredApprentices = useMemo(() => {
    return apprentices.filter((a) => {
      const matchesSearch =
        searchTerm === '' ||
        a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.docNumber.includes(searchTerm) ||
        a.program.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFicha = selectedFicha === 'all' || a.ficha === selectedFicha;

      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'certified' && a.status.toLowerCase().includes('certificado')) ||
        (selectedStatus === 'progress' && a.status.toLowerCase().includes('progreso')) ||
        (selectedStatus === 'started' && a.status.toLowerCase().includes('iniciado'));

      return matchesSearch && matchesFicha && matchesStatus;
    });
  }, [apprentices, searchTerm, selectedFicha, selectedStatus]);

  // Cohort Analytics KPIs
  const stats = useMemo(() => {
    const total = apprentices.length;
    const certified = apprentices.filter((a) => a.status.toLowerCase().includes('certificado')).length;
    const inProgress = apprentices.filter((a) => a.status.toLowerCase().includes('progreso')).length;

    let scoreSum = 0;
    let scoreCount = 0;
    apprentices.forEach((a) => {
      const num = parseInt(a.quizScore.replace('%', ''), 10);
      if (!isNaN(num)) {
        scoreSum += num;
        scoreCount += 1;
      }
    });

    const avgScore = scoreCount > 0 ? Math.round(scoreSum / scoreCount) : 0;
    const certificationRate = total > 0 ? Math.round((certified / total) * 100) : 0;

    return { total, certified, inProgress, avgScore, certificationRate };
  }, [apprentices]);

  // Export current table view as CSV
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Fecha Registro',
      'Nombre Completo',
      'Tipo Doc',
      'Numero Doc',
      'Regional',
      'Centro',
      'Programa',
      'Ficha',
      'Modalidad',
      'Jornada',
      'Modulos Completados',
      'Puntaje Evaluacion',
      'Estado',
      'Codigo Certificado',
      'Fecha Certificado',
    ];

    const rows = filteredApprentices.map((a) => [
      `"${a.id}"`,
      `"${a.registeredAt}"`,
      `"${a.fullName}"`,
      `"${a.docType}"`,
      `"${a.docNumber}"`,
      `"${a.regional}"`,
      `"${a.center}"`,
      `"${a.program}"`,
      `"${a.ficha}"`,
      `"${a.modality}"`,
      `"${a.jornada}"`,
      `"${a.modulesCompleted}"`,
      `"${a.quizScore && a.quizScore !== 'Pendiente' ? a.quizScore : '0%'}"`,
      `"${a.status}"`,
      `"${a.certificateCode}"`,
      `"${a.certificateDate}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Seguimiento_Aprendices_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Instructor Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#00324D] via-[#004163] to-[#002236] text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#39A900]" />
              <span>Perfil de Instructor SENA · Privilegios de Coordinación</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Panel de Seguimiento y Gestión de Aprendices
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Supervisa en tiempo real el progreso de inducción de tus aprendices, genera y comparte el enlace directo para la cohorte y sincroniza automáticamente las calificaciones y certificados con tu hoja de cálculo en Google Drive.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onSwitchToStudentView}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-xs backdrop-blur-sm"
              title="Ver el prototipo exactamente como lo ven los aprendices"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Ver Vista Aprendiz</span>
            </button>

            {syncState.spreadsheetInfo?.webViewLink ? (
              <a
                href={syncState.spreadsheetInfo.webViewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Abrir Hoja en Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={onOpenDriveModal}
                className="px-4 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Cloud className="w-4 h-4" />
                <span>Configurar Google Drive</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Primary Tool: Share Apprentice Link Card */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 dark:border-emerald-900/40 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-[#39A900] flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#00324D] dark:text-emerald-400">
                Enlace de Inducción para Aprendices
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Comparte este enlace con tus aprendices para que inicien su inducción sin acceso a controles ni botones de Google Drive.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#39A900] text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Modo Aprendiz Aislado
          </span>
        </div>

        {/* Input with Copy and Open Button */}
        <div className="flex flex-col md:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              readOnly
              value={apprenticeUrl}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 select-all focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyLink}
              className={`px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                linkCopied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#39A900] hover:bg-[#329600] text-white'
              }`}
            >
              {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{linkCopied ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
            </button>

            <a
              href={apprenticeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Probar enlace en nueva pestaña"
            >
              <span>Probar Enlace</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800 dark:text-slate-200">¿Cómo funciona la sincronización automática?</strong> Cuando los aprendices completan el registro de su ficha, avanzan en los 8 módulos, superan los casos o aprueban la evaluación con 70%+, sus datos se transmiten silenciosamente a la hoja de cálculo de Google Drive de este instructor sin que ellos tengan que iniciar sesión en Google ni tocar ninguna configuración.
          </p>
        </div>
      </div>

      {/* Google Drive Status & Control Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Connection status card */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Cloud className="w-4 h-4 text-blue-500" />
              <span>Conexión Google Drive</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                syncState.isAuthenticated
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {syncState.isAuthenticated ? 'Conectado' : 'No Vinculado'}
            </span>
          </div>

          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {syncState.spreadsheetInfo?.title || 'SENA Inducción - Registro de Aprendices'}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5 truncate">
              ID: {syncState.spreadsheetInfo?.id || localStorage.getItem(CACHED_SHEET_ID_KEY) || 'Pendiente de vincular'}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            {!syncState.isAuthenticated ? (
              <button
                onClick={handleConnectDrive}
                className="w-full py-2 px-3 rounded-lg bg-[#00324D] hover:bg-[#002538] text-white text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>Conectar Cuenta de Google</span>
              </button>
            ) : (
              <button
                onClick={onOpenDriveModal}
                className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Gestionar Configuración</span>
              </button>
            )}
          </div>
        </div>

        {/* Sync status and Refresh */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <RefreshCw className="w-4 h-4 text-[#39A900]" />
              <span>Sincronización en Vivo</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                syncState.status === 'syncing'
                  ? 'bg-blue-100 text-blue-800 animate-pulse'
                  : syncState.status === 'synced'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {syncState.status === 'syncing'
                ? 'Sincronizando...'
                : syncState.status === 'synced'
                ? 'Al Día'
                : 'En Espera'}
            </span>
          </div>

          <div>
            <div className="text-xs text-slate-500">Última actualización de datos:</div>
            <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {syncState.lastSyncTime || 'Sincronización activa'}
            </div>
            {syncState.lastMilestone && (
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                Hito: {syncState.lastMilestone}
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={handleRefreshFromSheet}
              disabled={isLoadingSheet}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheet ? 'animate-spin' : ''}`} />
              <span>{isLoadingSheet ? 'Consultando Sheets...' : 'Recargar Datos de Google Sheets'}</span>
            </button>
          </div>
        </div>

        {/* Quick Sheet Direct Access */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Hoja Oficial Google Sheets</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pestañas: <strong>Aprendices</strong> y <strong>Bitácora de Evaluaciones</strong> con fórmulas y formato institucional SENA.
            </p>
          </div>

          {syncState.spreadsheetInfo?.webViewLink ? (
            <a
              href={syncState.spreadsheetInfo.webViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Abrir Hoja de Cálculo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={onOpenDriveModal}
              className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Cloud className="w-4 h-4" />
              <span>Crear / Vincular Hoja en Drive</span>
            </button>
          )}
        </div>
      </div>

      {/* Cohort KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Aprendices Totales</span>
            <Users className="w-4 h-4 text-[#00324D] dark:text-sky-400" />
          </div>
          <div className="text-2xl font-extrabold text-[#00324D] dark:text-white tabular-nums">
            {stats.total}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Cohorte activa</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Certificados</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {stats.certified}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {stats.certificationRate}% de aprobación
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">En Progreso</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
            {stats.inProgress}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Cursando módulos</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Promedio Evaluación</span>
            <GraduationCap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#00324D] dark:text-white tabular-nums">
            {stats.avgScore}%
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Min. 70% requerido</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-1 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Fichas Activas</span>
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">
            {availableFichas.length || 1}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Grupos formativos</div>
        </div>
      </div>

      {/* Apprentices Table and Search/Filter Strip */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden space-y-4 p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-[#00324D] dark:text-white">
              Listado de Aprendices y Estado de Inducción
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {filteredApprentices.length} de {apprentices.length} aprendices mostrados en la cohorte.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
              title="Descargar tabla en formato CSV para Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>

            {syncState.spreadsheetInfo?.webViewLink && (
              <a
                href={syncState.spreadsheetInfo.webViewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-[#39A900] dark:text-emerald-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Ver en Sheets</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}
          </div>
        </div>

        {/* Filter inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, documento o programa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            />
          </div>

          <div>
            <select
              value={selectedFicha}
              onChange={(e) => setSelectedFicha(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900] cursor-pointer"
            >
              <option value="all">Todas las Fichas ({availableFichas.length})</option>
              {availableFichas.map((f) => (
                <option key={f} value={f}>
                  Ficha #{f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900] cursor-pointer"
            >
              <option value="all">Todos los Estados</option>
              <option value="certified">Certificado Emitido</option>
              <option value="progress">En Progreso</option>
              <option value="started">Iniciado</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Ficha & Programa</th>
                <th className="py-3 px-4">Avance Módulos</th>
                <th className="py-3 px-4">Evaluación</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Código Certificado</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApprentices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No se encontraron aprendices con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredApprentices.map((apprentice) => {
                  const isCertified = apprentice.status.toLowerCase().includes('certificado');
                  const isInProgress = apprentice.status.toLowerCase().includes('progreso');

                  return (
                    <tr
                      key={apprentice.id + apprentice.docNumber}
                      className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {apprentice.fullName}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {apprentice.center} · {apprentice.regional}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-slate-400 text-[10px] mr-1">{apprentice.docType}</span>
                        {apprentice.docNumber}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#00324D] dark:text-sky-300 font-mono font-semibold text-[11px]">
                          #{apprentice.ficha}
                        </span>
                        <div className="text-[11px] text-slate-500 truncate max-w-[220px]">
                          {apprentice.program}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {apprentice.modulesCompleted}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold">
                        {apprentice.quizScore !== 'Pendiente' ? (
                          <span
                            className={
                              parseInt(apprentice.quizScore, 10) >= 70
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-amber-600 dark:text-amber-400'
                            }
                          >
                            {apprentice.quizScore}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Pendiente</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            isCertified
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : isInProgress
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {isCertified && <CheckCircle2 className="w-3 h-3 text-[#39A900]" />}
                          {apprentice.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                        {apprentice.certificateCode !== 'Pendiente' ? (
                          <span className="font-bold text-[#00324D] dark:text-sky-300">
                            {apprentice.certificateCode}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">No generado</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedApprenticeModal(apprentice)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Detalles
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Apprentice Details */}
      {selectedApprenticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#39A900]" />
                <h3 className="text-base font-bold text-[#00324D] dark:text-white">
                  Ficha del Aprendiz
                </h3>
              </div>
              <button
                onClick={() => setSelectedApprenticeModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Nombre Completo</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {selectedApprenticeModal.fullName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Documento de Identidad</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    {selectedApprenticeModal.docType} {selectedApprenticeModal.docNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Ficha de Caracterización</span>
                  <span className="font-mono font-bold text-[#00324D] dark:text-sky-300">
                    #{selectedApprenticeModal.ficha}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Programa de Formación</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {selectedApprenticeModal.program}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Regional y Centro</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {selectedApprenticeModal.regional} · {selectedApprenticeModal.center}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Modalidad y Jornada</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {selectedApprenticeModal.modality} · {selectedApprenticeModal.jornada}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Módulos Aprobados:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedApprenticeModal.modulesCompleted}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Calificación Evaluación:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedApprenticeModal.quizScore}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Código de Certificado:</span>
                  <span className="font-mono font-bold text-[#00324D] dark:text-sky-300">
                    {selectedApprenticeModal.certificateCode}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedApprenticeModal(null)}
                className="px-4 py-2 bg-[#00324D] hover:bg-[#002538] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
