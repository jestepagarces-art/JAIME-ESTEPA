import React from 'react';
import { BookOpen, Award, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';

interface HeroSectionProps {
  profile: ApprenticeProfile;
  totalModules: number;
  completedModulesCount: number;
  xp: number;
  certificateEarned: boolean;
  onStartLearning: () => void;
  onOpenEvaluation: () => void;
  onOpenSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  totalModules,
  completedModulesCount,
  xp,
  certificateEarned,
  onStartLearning,
  onOpenEvaluation,
  onOpenSimulator,
}) => {
  const progressPercent = Math.round((completedModulesCount / totalModules) * 100);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Text & Strategic Information */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="text-[#39A900] dark:text-emerald-400 font-bold">Servicio Nacional de Aprendizaje</span>
              <span aria-hidden="true">·</span>
              <span>Acuerdo 0009 de 2024 & Acuerdo 002 de 2026</span>
              <span aria-hidden="true">·</span>
              <span>Inducción Institucional 40 Horas</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00324D] dark:text-white tracking-tight text-balance leading-tight">
                Ruta de Inducción y Reglamento del Aprendiz
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Apropia tus derechos, deberes, prohibiciones y alternativas de etapa productiva en el SENA. 
                Aprende con simulaciones de casos reales, desafía tus conocimientos de forma gamificada y obtén tu 
                certificación institucional oficial.
              </p>
            </div>

            {/* Apprentice Status Card (single-elevation, calm) */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 rounded-xl space-y-3 backdrop-blur-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Aprendiz:</span>{' '}
                  <strong className="text-slate-900 dark:text-white font-bold">{profile.fullName}</strong>
                </div>
                <div className="text-slate-500 dark:text-slate-400 font-mono">
                  Ficha: <span className="text-slate-800 dark:text-slate-200 font-semibold">{profile.ficha}</span> · {profile.program.split('(')[0]}
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>Progreso de la Ruta Normativa</span>
                  <span className="font-mono font-semibold tabular-nums text-[#00324D] dark:text-sky-300">
                    {completedModulesCount} de {totalModules} módulos ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#39A900] to-[#2e8301] transition-all duration-500 rounded-full"
                    style={{ width: `${Math.max(progressPercent, 4)}%` }}
                  />
                </div>
              </div>

              {/* Status footer line */}
              <div className="flex items-center justify-between pt-1 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Puntos acumulados: <strong className="text-slate-800 dark:text-slate-100 font-mono font-semibold">{xp} XP</strong></span>
                </div>
                {certificateEarned ? (
                  <span className="text-[#39A900] dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Inducción Aprobada
                  </span>
                ) : (
                  <span>Evaluación requerida: ≥ 70%</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onStartLearning}
                className="px-5 py-2.5 text-sm font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Ruta Formativa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSimulator}
                className="px-4 py-2.5 text-sm font-semibold text-[#00324D] dark:text-sky-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
                <span>Simulador de Casos</span>
              </button>

              <button
                onClick={onOpenEvaluation}
                className="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Rendir Evaluación</span>
              </button>
            </div>
          </div>

          {/* Right Column: High Fidelity Authentic Photographic Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/3] bg-slate-100">
              <img
                src="/src/assets/images/hero_sena_induction_1792526741494.jpg"
                alt="Aprendices SENA en ambiente de formación tecnológica colaborativa en Colombia"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00324D]/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                  Centro de Formación Integral
                </span>
                <p className="text-sm font-medium leading-snug">
                  Formación profesional integral con enfoque ético, humanístico y tecnológico para el futuro de Colombia.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
