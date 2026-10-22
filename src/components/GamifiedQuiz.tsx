import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Flame, 
  HelpCircle,
  FileCheck2,
  ArrowRight,
  Scale
} from 'lucide-react';
import { getQuizQuestions } from '../data/senaData';
import { useLanguage } from '../context/LanguageContext';

interface GamifiedQuizProps {
  onGainXp: (amount: number) => void;
  onEvaluationCompleted: (scorePercentage: number) => void;
  onViewCertificate: () => void;
  savedScore?: number;
}

export const GamifiedQuiz: React.FC<GamifiedQuizProps> = ({
  onGainXp,
  onEvaluationCompleted,
  onViewCertificate,
  savedScore,
}) => {
  const { t, language } = useLanguage();
  const questions = getQuizQuestions(language);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showCurrentFeedback, setShowCurrentFeedback] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(savedScore !== undefined && savedScore > 0);
  const [finalScore, setFinalScore] = useState<number>(savedScore || 0);

  const safeIdx = Math.min(currentIdx, questions.length - 1);
  const currentQuestion = questions[safeIdx];
  const currentSelectedAnswer = selectedAnswers[currentQuestion.id];
  const isCorrect = currentSelectedAnswer === currentQuestion.correctIndex;

  const handleSelectOption = (index: number) => {
    if (showCurrentFeedback || quizFinished) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: index,
    }));

    const correct = index === currentQuestion.correctIndex;
    if (correct) {
      setStreak((s) => s + 1);
      const earnedXp = 50 + streak * 10;
      onGainXp(earnedXp);
    } else {
      setStreak(0);
    }

    setShowCurrentFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowCurrentFeedback(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((idx) => idx + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctIndex) {
          correctCount += 1;
        }
      });

      const percentage = Math.round((correctCount / questions.length) * 100);
      setFinalScore(percentage);
      setQuizFinished(true);

      onEvaluationCompleted(percentage);

      // Trigger confetti if passed
      if (percentage >= 70) {
        onGainXp(200);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#39A900', '#00324D', '#F59E0B'],
          });
        } catch {
          // ignore in environments without canvas
        }
      }
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setStreak(0);
    setShowCurrentFeedback(false);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>{t.quizBadge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] dark:text-white tracking-tight">
          {t.quizTitle}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
          {t.quizSubtitle}
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header Metric Strip */}
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="text-slate-400">{t.quizQuestionCounter}</span>
              <span className="font-mono text-slate-900 dark:text-white">{safeIdx + 1}</span>
              <span className="text-slate-400">/</span>
              <span className="font-mono text-slate-900 dark:text-white">{questions.length}</span>
            </div>

            {/* Streak flame */}
            <div className="flex items-center gap-3">
              {streak > 1 && (
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold animate-pulse">
                  <Flame className="w-4 h-4 fill-amber-500" />
                  <span>{t.activeStreakLabel} x{streak}</span>
                </div>
              )}
              <span className="text-slate-400 font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                {currentQuestion.category}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3 py-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, optIdx) => {
              const isOptionChosen = currentSelectedAnswer === optIdx;
              const isOptionCorrect = optIdx === currentQuestion.correctIndex;

              let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200';
              if (showCurrentFeedback) {
                if (isOptionCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-semibold ring-1 ring-emerald-500';
                } else if (isOptionChosen) {
                  optionStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-1 ring-rose-400';
                } else {
                  optionStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={showCurrentFeedback}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                >
                  <span className="w-6 h-6 rounded-md bg-slate-150 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Normative Feedback Box when answered */}
          {showCurrentFeedback && (
            <div
              className={`p-5 rounded-xl border ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                  : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
              } space-y-3 animate-fadeIn`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>{language === 'en' ? 'Correct Answer! (+50 XP)' : '¡Respuesta Correcta! (+50 XP)'}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <span>{language === 'en' ? 'Incorrect Answer' : 'Respuesta Incorrecta'}</span>
                  </>
                )}
              </div>

              <p className="text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                {currentQuestion.explanation}
              </p>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-800/80 p-2 rounded border border-black/5 dark:border-white/5">
                <Scale className="w-3.5 h-3.5 text-[#39A900] dark:text-emerald-400" />
                <span>{t.legalBasisLabel} {currentQuestion.legalArticle}</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#00324D] dark:bg-slate-800 hover:bg-[#002538] dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <span>
                    {safeIdx + 1 < questions.length 
                      ? t.btnNextQuestion 
                      : (language === 'en' ? 'Finish Evaluation' : 'Finalizar Evaluación')
                    }
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Evaluation Results Card */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-xs">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              finalScore >= 70 ? 'bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400'
            }`}
          >
            {finalScore >= 70 ? (
              <Award className="w-8 h-8" />
            ) : (
              <HelpCircle className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-[#00324D] dark:text-white">
              {finalScore >= 70 ? t.quizSuccessTitle : t.quizFailTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {finalScore >= 70
                ? (language === 'en' 
                    ? 'You demonstrated solid mastery of the SENA Apprentice Regulations (Agreement 0009 of 2024).' 
                    : 'Demostraste un dominio sólido del Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024).'
                  )
                : (language === 'en'
                    ? 'The minimum score to certify induction is 70%. Review the modules and try again.'
                    : 'El puntaje mínimo para certificar la inducción es 70%. Repasa los módulos e inténtalo nuevamente.'
                  )
              }
            </p>
          </div>

          {/* Score display */}
          <div className="inline-block p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold mb-1">
              {t.quizFinalScoreLabel}
            </span>
            <span className="text-4xl font-black font-mono tabular-nums text-[#00324D] dark:text-white">
              {finalScore}%
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRetake}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.btnRetryQuiz}</span>
            </button>

            {finalScore >= 70 && (
              <button
                onClick={onViewCertificate}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>{t.btnViewCertificate}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
