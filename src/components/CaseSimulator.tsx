import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  RotateCcw
} from 'lucide-react';
import { getSimulationCases } from '../data/senaData';
import { CaseChoice } from '../types/induction';
import { useLanguage } from '../context/LanguageContext';

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
  const { t, language } = useLanguage();
  const cases = getSimulationCases(language);

  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<CaseChoice | null>(null);

  const safeIndex = Math.min(selectedCaseIndex, cases.length - 1);
  const activeCase = cases[safeIndex];
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
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          <span>{t.simulatorBadge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] dark:text-white tracking-tight">
          {t.simulatorTitle}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
          {t.simulatorSubtitle}
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {cases.map((sc, idx) => {
          const isDone = completedCases.includes(sc.id);
          const isSelected = idx === safeIndex;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedCaseIndex(idx);
                setSelectedChoice(null);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#00324D] dark:bg-slate-700 text-white border-[#00324D] dark:border-slate-600 shadow-xs'
                  : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{language === 'en' ? `Case ${idx + 1}` : `Caso ${idx + 1}`}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Case Workspace */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Scenario Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-semibold text-[#39A900] dark:text-emerald-400 uppercase tracking-wide">
              {activeCase.category}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {activeCase.title}
            </h3>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {t.characterLabel} <strong className="text-slate-800 dark:text-slate-100">{activeCase.character}</strong> ({activeCase.role})
          </div>
        </div>

        {/* Narrative Situation */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
          <p className="font-medium text-[#00324D] dark:text-sky-300 mb-1">{t.dilemmaSituationTitle}</p>
          <p>{activeCase.situation}</p>
        </div>

        {/* Choice List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            {t.questionWhatDecision}
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
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
                        : 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {isCurrentSelected ? (
                      choice.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
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
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
            } space-y-3 animate-fadeIn`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedChoice.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      {language === 'en' 
                        ? 'Correct Decision Aligned with Regulations (+75 XP)' 
                        : 'Decisión Correcta y Ajustada a la Norma (+75 XP)'
                      }
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <span>
                      {language === 'en' 
                        ? 'Disciplinary or Academic Consequence' 
                        : 'Consecuencia Disciplinaria o Académica'
                      }
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={handleResetChoice}
                className="text-xs font-medium underline cursor-pointer flex items-center gap-1 opacity-80 hover:opacity-100 text-slate-800 dark:text-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.btnResetChoice}</span>
              </button>
            </div>

            {/* Outcome narrative */}
            <p className="text-xs leading-relaxed font-medium">
              {selectedChoice.outcome}
            </p>

            {/* Normative analysis & article */}
            <div className="pt-2 border-t border-black/10 dark:border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#00324D] dark:text-sky-300">
                <Scale className="w-3.5 h-3.5 text-[#39A900] dark:text-emerald-400" />
                <span>{t.legalAnalysisTitle}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedChoice.normativeAnalysis}
              </p>
              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-800/80 p-2 rounded border border-black/5 dark:border-white/5">
                {t.legalBasisLabel} {selectedChoice.articleCitation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
