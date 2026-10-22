import React, { useState } from 'react';
import { Scale, ShieldCheck, Check, X, RotateCcw, Sparkles } from 'lucide-react';
import { getDerechosDeberes } from '../data/senaData';
import { useLanguage } from '../context/LanguageContext';

interface RightsDutiesClassifierProps {
  onGainXp: (amount: number) => void;
  onFinished: () => void;
}

export const RightsDutiesClassifier: React.FC<RightsDutiesClassifierProps> = ({
  onGainXp,
  onFinished,
}) => {
  const { t, language } = useLanguage();
  const items = getDerechosDeberes(language);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  // Guard if currentIndex exceeds items
  const safeIndex = Math.min(currentIndex, items.length - 1);
  const currentItem = items[safeIndex];

  const handleClassify = (chosenType: 'derecho' | 'deber') => {
    if (showFeedback || completed) return;

    const isCorrect = chosenType === currentItem.type;
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      onGainXp(25);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setLastAnswerCorrect(null);

    if (currentIndex + 1 < items.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      onGainXp(100);
      onFinished();
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(false);
    setLastAnswerCorrect(null);
    setCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>{t.classifierBadge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] dark:text-white tracking-tight">
          {t.classifierTitle}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
          {t.classifierSubtitle}
        </p>
      </div>

      {!completed ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Progress Strip */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
            <span>
              {t.itemCounterLabel} <strong className="font-mono text-slate-800 dark:text-slate-100">{safeIndex + 1}</strong> /{' '}
              <span className="font-mono">{items.length}</span>
            </span>
            <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.scoreLabel} <strong className="font-mono">{score}</strong></span>
            </div>
          </div>

          {/* Statement Box */}
          <div className="py-6 sm:py-8 text-center space-y-3">
            <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              {currentItem.category}
            </span>
            <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white max-w-xl mx-auto leading-relaxed">
              "{currentItem.text}"
            </p>
          </div>

          {/* Decision Buttons */}
          {!showFeedback ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => handleClassify('derecho')}
                className="py-4 px-6 rounded-xl border-2 border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/40 hover:bg-blue-100/60 dark:hover:bg-blue-900/50 text-blue-900 dark:text-blue-200 font-bold text-base transition-all flex items-center justify-center gap-3 cursor-pointer hover:border-blue-500 shadow-xs active:scale-[0.99]"
              >
                <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{t.btnIsRight}</span>
              </button>

              <button
                onClick={() => handleClassify('deber')}
                className="py-4 px-6 rounded-xl border-2 border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/40 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-bold text-base transition-all flex items-center justify-center gap-3 cursor-pointer hover:border-emerald-500 shadow-xs active:scale-[0.99]"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>{t.btnIsDuty}</span>
              </button>
            </div>
          ) : (
            /* Instant Normative Feedback */
            <div className={`p-5 rounded-xl border ${
              lastAnswerCorrect 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100' 
                : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
            } space-y-3 animate-fadeIn`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {lastAnswerCorrect ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.correctAnswerTitle} (+25 XP)</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <span>{t.incorrectAnswerTitle}</span>
                  </>
                )}
              </div>

              <p className="text-xs leading-relaxed">
                {language === 'en'
                  ? `This statement corresponds to a ${currentItem.type === 'derecho' ? 'RIGHT' : 'DUTY'} of the apprentice.`
                  : `Este enunciado corresponde a un ${currentItem.type.toUpperCase()} del aprendiz.`
                }
              </p>

              {currentItem.explanation && (
                <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                  {currentItem.explanation}
                </p>
              )}

              <div className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-800/80 p-2 rounded border border-black/5 dark:border-white/5">
                {t.legalBasisLabel} {currentItem.article}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#00324D] dark:bg-slate-800 hover:bg-[#002538] dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
                >
                  {safeIndex + 1 < items.length 
                    ? t.btnNextItem 
                    : (language === 'en' ? 'View Results →' : 'Ver resultados →')
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Completion Screen */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-5 shadow-xs">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/80 rounded-full flex items-center justify-center mx-auto text-[#39A900] dark:text-emerald-400">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-[#00324D] dark:text-white">
              {t.classifierCompletedTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {language === 'en' 
                ? `You scored ${score} out of ${items.length} correct answers and earned +100 XP!`
                : `Obtuviste ${score} de ${items.length} aciertos y ganaste +100 XP extra.`
              }
            </p>
          </div>

          <div className="max-w-md mx-auto p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300">
            {t.classifierCompletedDesc}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.btnRestartClassifier}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
