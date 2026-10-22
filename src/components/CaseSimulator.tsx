import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  Sparkles, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { SIMULATION_CASES } from '../data/senaData';
import { CaseChoice } from '../types/induction';

interface CaseSimulatorProps {
  onGainXp: (amount: number) => void;
  onCaseCompleted: (caseId: string) => void;
  completedCases: string[];
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({
  onGainXp,
  onCaseCompleted,
  completedCases,
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<CaseChoice | null>(null);

  const activeCase = SIMULATION_CASES[selectedCaseIndex];
  const isCaseCompleted = completedCases.includes(activeCase.id);

  const handleSelectChoice = (choice: CaseChoice) => {
    setSelectedChoice(choice);
    if (choice.isCorrect && !isCaseCompleted) {
      onGainXp(75);
      onCaseCompleted(activeCase.id);
    }
  };

  const handleResetChoice = () => {
    setSelectedChoice(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <span>Simulador de Casos y Comités</span>
          <span aria-hidden="true">·</span>
          <span>Dilemas Reales del Aprendiz</span>
          <span aria-hidden="true">·</span>
          <span>Debido Proceso</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight">
          Simulador: Toma de Decisiones y Comité de Evaluación
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Enfréntate a situaciones reales que ocurren en los centros de formación: plagio, inasistencias por salud, normas SST en talleres y convivencia digital. Elige con base en el Reglamento.
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {SIMULATION_CASES.map((sc, idx) => {
          const isDone = completedCases.includes(sc.id);
          const isSelected = idx === selectedCaseIndex;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedCaseIndex(idx);
                setSelectedChoice(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#00324D] text-white border-[#00324D] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Caso {idx + 1}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Case Workspace */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Scenario Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-mono font-semibold text-[#39A900] uppercase tracking-wide">
              {activeCase.category}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {activeCase.title}
            </h3>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Personaje: <strong className="text-slate-800">{activeCase.character}</strong> ({activeCase.role})
          </div>
        </div>

        {/* Narrative Situation */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed">
          <p className="font-medium text-[#00324D] mb-1">Contexto de la situación:</p>
          <p>{activeCase.situation}</p>
        </div>

        {/* Choice List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            ¿Qué decisión debe tomar el aprendiz según el Reglamento?
          </span>

          <div className="grid grid-cols-1 gap-3">
            {activeCase.choices.map((choice) => {
              const isCurrentSelected = selectedChoice?.id === choice.id;
              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice)}
                  disabled={selectedChoice !== null}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all cursor-pointer flex items-start gap-3 ${
                    isCurrentSelected
                      ? choice.isCorrect
                        ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 ring-1 ring-emerald-500'
                        : 'border-rose-500 bg-rose-50/60 text-rose-950 ring-1 ring-rose-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 text-slate-800'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {isCurrentSelected ? (
                      choice.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )
                    ) : (
                      <span className="text-slate-400 font-mono">●</span>
                    )}
                  </div>
                  <span className="leading-snug">{choice.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Normative Feedback Box */}
        {selectedChoice && (
          <div
            className={`p-5 rounded-xl border ${
              selectedChoice.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            } space-y-3 animate-fadeIn`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedChoice.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Decisión Correcta y Ajustada a la Norma (+75 XP)</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                    <span>Consecuencia Disciplinaria o Académica</span>
                  </>
                )}
              </div>
              <button
                onClick={handleResetChoice}
                className="text-xs font-medium underline cursor-pointer flex items-center gap-1 opacity-80 hover:opacity-100"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Intentar otra opción</span>
              </button>
            </div>

            {/* Outcome narrative */}
            <p className="text-xs leading-relaxed font-medium">
              {selectedChoice.outcome}
            </p>

            {/* Normative analysis & article */}
            <div className="pt-2 border-t border-black/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00324D]">
                <Scale className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Análisis normativo institucional:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedChoice.normativeAnalysis}
              </p>
              <div className="text-[11px] font-mono text-slate-600 bg-white/70 p-2 rounded border border-black/5">
                Cita legal: {selectedChoice.articleCitation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
