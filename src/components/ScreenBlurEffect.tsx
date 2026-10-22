import React, { useEffect, useState } from 'react';
import { Moon, Sparkles, Droplets, Eye } from 'lucide-react';

interface ScreenBlurEffectProps {
  isDarkMode: boolean;
  isTransitioning: boolean;
  onReplayTransition: () => void;
}

export const ScreenBlurEffect: React.FC<ScreenBlurEffectProps> = ({
  isDarkMode,
  isTransitioning,
  onReplayTransition,
}) => {
  const [blurMode, setBlurMode] = useState<'normal' | 'deep'>('normal');

  // If dark mode is off and not transitioning, don't render ambient
  return (
    <>
      {/* 1. Full Screen Blur Transition Ripple (Active during mode change) */}
      {isTransitioning && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden animate-screen-blur-flash"
          style={{
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            backgroundColor: isDarkMode ? 'rgba(9, 13, 22, 0.45)' : 'rgba(255, 255, 255, 0.35)',
          }}
        >
          {/* Futuristic Blur HUD Pill */}
          <div className="relative px-6 py-3.5 rounded-2xl bg-slate-900/90 text-white border border-emerald-500/40 shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-bounce">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#39A900] to-emerald-400 flex items-center justify-center text-white shadow-md">
              <Moon className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-wide flex items-center gap-1.5 text-emerald-400">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>MODO OSCURO APLICADO</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                Efecto blur en pantalla activado · Interfaz de alto contraste
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Ambient Blurred Radiant Glow Orbs (Persistent when dark mode is on) */}
      {isDarkMode && (
        <div 
          className={`dark-blur-ambient transition-opacity duration-700 ${
            blurMode === 'deep' ? 'opacity-100' : 'opacity-80'
          }`}
          aria-hidden="true"
        >
          <div className="dark-blur-orb-1" />
          <div className="dark-blur-orb-2" />
          <div className="dark-blur-orb-3" />
        </div>
      )}

      {/* 3. Small discrete Blur Control Pill in Bottom Left (when in dark mode) */}
      {isDarkMode && (
        <div className="fixed bottom-6 left-6 z-30 hidden md:flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-300 text-[11px] shadow-lg">
          <button
            onClick={onReplayTransition}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer"
            title="Volver a aplicar la animación de blur en pantalla"
          >
            <Droplets className="w-3 h-3" />
            <span>Efecto Blur Activo</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setBlurMode(prev => prev === 'normal' ? 'deep' : 'normal')}
            className="px-2 py-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1"
            title="Alternar intensidad del blur de fondo"
          >
            <Eye className="w-3 h-3 text-sky-400" />
            <span>{blurMode === 'deep' ? 'Blur Profundo' : 'Blur Sutil'}</span>
          </button>
        </div>
      )}
    </>
  );
};
