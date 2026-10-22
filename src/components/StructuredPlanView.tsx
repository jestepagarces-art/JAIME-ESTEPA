import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  ArrowRight
} from 'lucide-react';
import { getStructuredInductionPlan } from '../data/senaData';
import { useLanguage } from '../context/LanguageContext';

interface StructuredPlanViewProps {
  onStartInduction: () => void;
  onOpenEvaluation: () => void;
}

export const StructuredPlanView: React.FC<StructuredPlanViewProps> = ({
  onStartInduction,
  onOpenEvaluation,
}) => {
  const { t, language } = useLanguage();
  const planPhases = getStructuredInductionPlan(language);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>{t.planViewBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] dark:text-white tracking-tight">
            {t.planViewTitle}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.planViewSubtitle}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onStartInduction}
              className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{t.btnStartPlanInduction}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenEvaluation}
              className="px-4 py-2 text-xs font-semibold text-[#00324D] dark:text-sky-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <span>{t.btnEvaluation}</span>
            </button>
          </div>
        </div>

        {/* Campus illustration image */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs aspect-[4/3] bg-slate-100">
            <img
              src="/src/assets/images/sena_campus_learning_1792526742077.jpg"
              alt="Ambiente de formación tecnológica y aprendizaje SENA"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00324D]/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[11px] font-mono text-emerald-300">
                {language === 'en' ? 'Infrastructure & Environments' : 'Infraestructura y Ambientes'}
              </span>
              <p className="text-xs font-semibold">
                {language === 'en' 
                  ? 'Advanced technology and comprehensive guidance in every SENA Center.'
                  : 'Tecnología de punta y acompañamiento integral en cada Centro.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Phases Accordion / Timeline */}
      <div className="space-y-4">
        {planPhases.map((plan, idx) => (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-[#39A900] dark:text-emerald-400 font-black text-sm flex items-center justify-center font-mono">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-extrabold text-[#00324D] dark:text-white">
                  {plan.phase}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{plan.hours}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {t.planGoalLabel}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {plan.goal}
              </p>
            </div>

            {/* Activities grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {t.planActivitiesLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {plan.activities.map((act, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverable result */}
            <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5 text-xs text-emerald-950 dark:text-emerald-200">
              <FileCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>{t.planDeliverableLabel}</strong> {plan.deliverable}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
