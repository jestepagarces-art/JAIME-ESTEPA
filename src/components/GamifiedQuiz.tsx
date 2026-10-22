import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  HelpCircle,
  FileCheck2,
  ArrowRight,
  Scale
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/senaData';

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
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showCurrentFeedback, setShowCurrentFeedback] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(savedScore !== undefined && savedScore > 0);
  const [finalScore, setFinalScore] = useState<number>(savedScore || 0);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
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

    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((idx) => idx + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      QUIZ_QUESTIONS.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctIndex) {
          correctCount += 1;
        }
      });

      const percentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
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
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
          <span>Evaluación Formativa Integral</span>
          <span aria-hidden="true">·</span>
          <span>8 Preguntas Clave</span>
          <span aria-hidden="true">·</span>
          <span>Aprobación: ≥ 70%</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight">
          Evaluación Gamificada: Reglamento del Aprendiz
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Demuestra tu dominio sobre derechos, deberes, comités y etapa productiva para validar tu inducción y generar tu certificado institucional.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header Metric Strip */}
          <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-1.5 font-semibold">
              <span className="text-slate-400">Pregunta</span>
              <span className="font-mono text-slate-900">{currentIdx + 1}</span>
              <span className="text-slate-400">de</span>
              <span className="font-mono text-slate-900">{QUIZ_QUESTIONS.length}</span>
            </div>

            {/* Streak flame */}
            <div className="flex items-center gap-3">
              {streak > 1 && (
                <div className="flex items-center gap-1 text-amber-600 font-bold animate-pulse">
                  <Flame className="w-4 h-4 fill-amber-500" />
                  <span>Racha x{streak}</span>
                </div>
              )}
              <span className="text-slate-400 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                {currentQuestion.category}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3 py-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, optIdx) => {
              const isOptionChosen = currentSelectedAnswer === optIdx;
              const isOptionCorrect = optIdx === currentQuestion.correctIndex;

              let optionStyle = 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800';
              if (showCurrentFeedback) {
                if (isOptionCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                } else if (isOptionChosen) {
                  optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
                } else {
                  optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={showCurrentFeedback}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                >
                  <span className="w-6 h-6 rounded-md bg-slate-150 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              } space-y-3 animate-fadeIn`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>¡Respuesta Correcta! (+50 XP)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Respuesta Incorrecta</span>
                  </>
                )}
              </div>

              <p className="text-xs leading-relaxed text-slate-800">
                {currentQuestion.explanation}
              </p>

              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 bg-white/70 p-2 rounded border border-black/5">
                <Scale className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Base legal: {currentQuestion.legalArticle}</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002538] rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Evaluation Results Card */
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-6 shadow-xs">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              finalScore >= 70 ? 'bg-emerald-100 text-[#39A900]' : 'bg-rose-100 text-rose-600'
            }`}
          >
            {finalScore >= 70 ? (
              <Award className="w-8 h-8" />
            ) : (
              <HelpCircle className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-[#00324D]">
              {finalScore >= 70 ? '¡Felicitaciones! Has Aprobado la Inducción' : 'No alcanzaste el puntaje mínimo requerido'}
            </h3>
            <p className="text-sm text-slate-600">
              {finalScore >= 70
                ? 'Demostraste un dominio sólido del Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024).'
                : 'El puntaje mínimo para certificar la inducción es 70%. Repasa los módulos e inténtalo nuevamente.'}
            </p>
          </div>

          {/* Score display */}
          <div className="inline-block p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold mb-1">
              Calificación Obtenida
            </span>
            <span className="text-4xl font-black font-mono tabular-nums text-[#00324D]">
              {finalScore}%
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRetake}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir Evaluación</span>
            </button>

            {finalScore >= 70 && (
              <button
                onClick={onViewCertificate}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Generar y Ver Mi Certificado Oficial</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
