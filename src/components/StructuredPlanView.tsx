import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Layers, 
  Users, 
  ShieldCheck, 
  Award,
  ArrowRight
} from 'lucide-react';
import { STRUCTURED_INDUCTION_PLAN } from '../data/senaData';

interface StructuredPlanViewProps {
  onStartInduction: () => void;
  onOpenEvaluation: () => void;
}

export const StructuredPlanView: React.FC<StructuredPlanViewProps> = ({
  onStartInduction,
  onOpenEvaluation,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Metodología Pedagógica FPI</span>
            <span aria-hidden="true">·</span>
            <span>4 Fases Estratégicas</span>
            <span aria-hidden="true">·</span>
            <span>40 Horas Certificables</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight">
            Plan Estructurado de Inducción SENA
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Diseñado conforme al Estatuto de la Formación Profesional Integral y el nuevo Reglamento del Aprendiz 
            (Acuerdo 0009 de 2024). Garantiza la transición armónica del nuevo aprendiz hacia la vida técnica y productiva.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onStartInduction}
              className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Ir a la Ruta de Aprendizaje</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenEvaluation}
              className="px-4 py-2 text-xs font-semibold text-[#00324D] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <span>Ver Evaluación Final</span>
            </button>
          </div>
        </div>

        {/* Campus illustration image */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs aspect-[4/3] bg-slate-100">
            <img
              src="/src/assets/images/sena_campus_learning_1792526742077.jpg"
              alt="Ambiente de formación tecnológica y aprendizaje SENA"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00324D]/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="text-[11px] font-mono text-emerald-300">Infraestructura y Ambientes</span>
              <p className="text-xs font-semibold">Tecnología de punta y acompañamiento integral en cada Centro.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Phases Accordion / Timeline */}
      <div className="space-y-4">
        {STRUCTURED_INDUCTION_PLAN.map((plan, idx) => (
          <div
            key={idx}
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4 hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#39A900] font-black text-sm flex items-center justify-center font-mono">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-extrabold text-[#00324D]">
                  {plan.phase}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Horas de Formación Integral</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Objetivo Formativo
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {plan.goal}
              </p>
            </div>

            {/* Activities grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Actividades Pedagógicas Clave
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {plan.activities.map((act, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-150 text-xs text-slate-800 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                    <span className="leading-snug">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverable result */}
            <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-950">
              <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Evidencia / Entregable:</strong> {plan.deliverable}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
