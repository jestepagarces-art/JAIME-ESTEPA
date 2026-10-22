import React, { useState, useEffect } from 'react';
import {
  Video,
  Play,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  Settings,
  HelpCircle,
  Sparkles,
  Link2,
  Check,
  AlertCircle,
  RefreshCw,
  Volume2
} from 'lucide-react';
import { SENA_LOGO_DATA_URI } from '../assets/senaLogoDataUri';
import { useLanguage } from '../context/LanguageContext';

export const OFFICIAL_TUTORIAL_VIDEO = '/assets/aistudio/Guia_Induccion_SENA_LogoOficial.pptx_debbdcd1.mp4';

interface TutorialFloatingVideoProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  onVideoUrlChange?: (newUrl: string) => void;
}

const STORAGE_KEY = 'sena_induction_tutorial_video_url';

/**
 * Extracts and formats Google Drive video URLs into embeddable /preview links,
 * or detects direct video files.
 */
export function parseVideoSource(url: string): { 
  src: string; 
  isDrive: boolean; 
  isDirectVideo: boolean;
} {
  if (!url || !url.trim()) {
    return { src: '', isDrive: false, isDirectVideo: false };
  }
  const cleanUrl = url.trim();

  // Local uploaded asset or direct MP4/WebM video
  if (cleanUrl.startsWith('/assets/') || cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm') || cleanUrl.includes('.mp4?')) {
    return {
      src: cleanUrl,
      isDrive: false,
      isDirectVideo: true,
    };
  }

  // Google Drive: file/d/{id}
  const fileDMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    const id = fileDMatch[1];
    return {
      src: `https://drive.google.com/file/d/${id}/preview`,
      isDrive: true,
      isDirectVideo: false,
    };
  }

  // Google Drive: open?id={id} or id={id}
  const idParamMatch = cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    const id = idParamMatch[1];
    return {
      src: `https://drive.google.com/file/d/${id}/preview`,
      isDrive: true,
      isDirectVideo: false,
    };
  }

  // Google Drive: /d/{id}
  const dMatch = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch && dMatch[1]) {
    const id = dMatch[1];
    return {
      src: `https://drive.google.com/file/d/${id}/preview`,
      isDrive: true,
      isDirectVideo: false,
    };
  }

  if (cleanUrl.includes('drive.google.com') && cleanUrl.includes('/preview')) {
    return { src: cleanUrl, isDrive: true, isDirectVideo: false };
  }

  return { src: cleanUrl, isDrive: false, isDirectVideo: false };
}

export const TutorialFloatingVideo: React.FC<TutorialFloatingVideoProps> = ({
  isOpen,
  onClose,
  videoUrl: propVideoUrl,
  onVideoUrlChange,
}) => {
  const { t } = useLanguage();
  // Initialize with official video or prop or stored URL
  const [currentUrl, setCurrentUrl] = useState<string>(() => {
    return propVideoUrl || localStorage.getItem(STORAGE_KEY) || OFFICIAL_TUTORIAL_VIDEO;
  });

  // Window state: 'modal' (large floating dialog), 'pip' (floating picture-in-picture in bottom-right corner)
  const [windowMode, setWindowMode] = useState<'modal' | 'pip'>('modal');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>(currentUrl);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (propVideoUrl && propVideoUrl !== currentUrl) {
      setCurrentUrl(propVideoUrl);
      setInputUrl(propVideoUrl);
    }
  }, [propVideoUrl]);

  if (!isOpen) return null;

  const { src, isDrive, isDirectVideo } = parseVideoSource(currentUrl);

  const handleSaveUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputUrl.trim() || OFFICIAL_TUTORIAL_VIDEO;
    setCurrentUrl(trimmed);
    localStorage.setItem(STORAGE_KEY, trimmed);
    if (onVideoUrlChange) {
      onVideoUrlChange(trimmed);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettings(false);
    }, 1200);
  };

  const handleRestoreOfficial = () => {
    setCurrentUrl(OFFICIAL_TUTORIAL_VIDEO);
    setInputUrl(OFFICIAL_TUTORIAL_VIDEO);
    localStorage.removeItem(STORAGE_KEY);
    if (onVideoUrlChange) {
      onVideoUrlChange(OFFICIAL_TUTORIAL_VIDEO);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettings(false);
    }, 1200);
  };

  const handleCopyDirectLink = () => {
    if (!currentUrl) return;
    const fullUrl = currentUrl.startsWith('http')
      ? currentUrl
      : `${window.location.origin}${currentUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // ----------------------------------------------------
  // Floating PiP Mode (Docked to bottom-right corner)
  // ----------------------------------------------------
  if (windowMode === 'pip') {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-[#39A900] overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
        {/* Header PiP */}
        <div className="bg-[#00324D] text-white px-3 py-2 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse"></span>
            <span className="text-xs font-bold truncate">Tutorial de Inducción SENA</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setWindowMode('modal')}
              className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded cursor-pointer transition-colors"
              title="Maximizar ventana flotante"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-300 hover:text-rose-400 hover:bg-white/10 rounded cursor-pointer transition-colors"
              title="Cerrar video"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Video Area PiP */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {isDirectVideo ? (
            <video
              src={src}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : isDrive || src ? (
            <iframe
              src={src}
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              title="Tutorial de Inducción SENA"
            />
          ) : (
            <div className="p-4 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
              <Video className="w-6 h-6 text-[#39A900]" />
              <span>Sin video disponible</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Full Floating Modal Mode
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden max-h-[92vh]">
        {/* Floating Window Header with Institutional Colors */}
        <div className="bg-gradient-to-r from-[#00324D] to-[#044366] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
              <img
                src={SENA_LOGO_DATA_URI}
                alt="Logo SENA"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {t.floatingPiPTitle}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#39A900]/30 text-emerald-300 text-[10px] font-bold border border-[#39A900]/50">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  {t.videoTutorialBadge}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                {t.videoTutorialSubtitle}
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5">
            {/* Quick config button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer ${
                showSettings ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`}
              title="Cambiar o configurar fuente del video (Google Drive / Enlace)"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Direct Open in Drive or New tab */}
            {currentUrl && currentUrl.startsWith('http') && (
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Abrir en pestaña nueva"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Minimize to PiP */}
            <button
              onClick={() => setWindowMode('pip')}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Minimizar a ventana flotante en esquina (PiP)"
            >
              <Minimize2 className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer ml-1"
              title="Cerrar reproductor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Settings Panel (for pasting/updating video URL if needed) */}
        {showSettings && (
          <div className="bg-slate-100 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 p-4 sm:p-5 transition-all">
            <form onSubmit={handleSaveUrl} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-[#39A900]" />
                  <span>Fuente del Video Tutorial (Google Drive o enlace de video)</span>
                </label>
                <button
                  type="button"
                  onClick={handleRestoreOfficial}
                  className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  Restaurar video oficial SENA
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Guardado!</span>
                    </>
                  ) : (
                    <span>Guardar y Cargar</span>
                  )}
                </button>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-[11px] text-emerald-800 dark:text-emerald-300">
                <Sparkles className="w-4 h-4 shrink-0 text-[#39A900] mt-0.5" />
                <span>
                  El sistema reproduce el video oficial institucional con controles integrados (reproducir, pausar, barra de avance, volumen y pantalla completa). También admite enlaces compartidos de Google Drive configurados en "Cualquier persona con el enlace".
                </span>
              </div>
            </form>
          </div>
        )}

        {/* Video Player Display Container with Native & Custom Controls */}
        <div className="relative w-full bg-black aspect-video flex-1 flex items-center justify-center overflow-hidden">
          {isDirectVideo ? (
            <video
              src={src}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            >
              Tu navegador no soporta reproducción de video HTML5.
            </video>
          ) : isDrive || src ? (
            <iframe
              src={src}
              className="w-full h-full border-0 select-none"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              title="Reproductor de Video Tutorial SENA"
            />
          ) : (
            <div className="p-8 max-w-md text-center flex flex-col items-center gap-4 text-white">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#39A900] shadow-inner">
                <Video className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  Video no disponible
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Haz clic para restaurar el video oficial de inducción SENA.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRestoreOfficial}
                className="px-5 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Cargar Video Oficial</span>
              </button>
            </div>
          )}
        </div>

        {/* Player Controls Bar & Helpful Tips */}
        <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39A900]"></span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
              {t.activeControlsNotice.split('·')[0]}
            </span>
            <span className="text-[11px] text-slate-400">
              · {t.activeControlsNotice.split('·')[1]}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleCopyDirectLink}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-medium hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-1.5 transition-colors"
              title={t.copyLink}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>{t.linkCopied}</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5" />
                  <span>{t.copyLink}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setWindowMode('pip')}
              className="px-3 py-1.5 rounded-lg bg-[#00324D] hover:bg-[#00253a] text-white text-[11px] font-bold cursor-pointer flex items-center gap-1.5 transition-colors"
              title={t.minimizedPiP}
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>{t.minimizedPiP}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
