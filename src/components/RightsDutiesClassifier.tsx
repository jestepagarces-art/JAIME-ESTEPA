import React, { useState } from 'react';
import { Scale, ShieldCheck, Check, X, RotateCcw, Sparkles } from 'lucide-react';
import { DERECHOS_DEBERES_ITEMS } from '../data/senaData';

interface RightsDutiesClassifierProps {
  onGainXp: (amount: number) => void;
  onFinished: () => void;
}

export const RightsDutiesClassifier: React.FC<RightsDutiesClassifierProps> = ({
  onGainXp,
  onFinished,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentItem = DERECHOS_DEBERES_ITEMS[currentIndex];

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

    if (currentIndex + 1 < DERECHOS_DEBERES_ITEMS.length) {
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
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
          <span>Dinámica Gamificada</span>
          <span aria-hidden="true">·</span>
          <span>Capítulos II y III</span>
          <span aria-hidden="true">·</span>
          <span>Acuerdo 0009 de 2024</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight">
          Desafío: ¿Derecho o Deber del Aprendiz?
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Pon a prueba tu agilidad distinguiendo las garantías que te otorga el SENA frente a los compromisos que adquieres como aprendiz.
        </p>
      </div>

      {!completed ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Progress Strip */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
            <span>
              Enunciado <strong className="font-mono text-slate-800">{currentIndex + 1}</strong> de{' '}
              <span className="font-mono">{DERECHOS_DEBERES_ITEMS.length}</span>
            </span>
            <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aciertos: <strong className="font-mono">{score}</strong></span>
            </div>
          </div>

          {/* Statement Box */}
          <div className="py-6 sm:py-8 text-center space-y-3">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              {currentItem.category}
            </span>
            <p className="text-lg sm:text-xl font-bold text-slate-900 max-w-xl mx-auto leading-relaxed">
              "{currentItem.text}"
            </p>
          </div>

          {/* Decision Buttons */}
          {!showFeedback ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => handleClassify('derecho')}
                className="py-4 px-6 rounded-xl border-2 border-blue-500/40 bg-blue-50/50 hover:bg-blue-100/60 text-blue-900 font-bold text-base transition-all flex items-center justify-center gap-3 cursor-pointer hover:border-blue-500 shadow-xs active:scale-[0.99]"
              >
                <Scale className="w-5 h-5 text-blue-600" />
                <span>Es un DERECHO</span>
              </button>

              <button
                onClick={() => handleClassify('deber')}
                className="py-4 px-6 rounded-xl border-2 border-emerald-500/40 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-900 font-bold text-base transition-all flex items-center justify-center gap-3 cursor-pointer hover:border-emerald-500 shadow-xs active:scale-[0.99]"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Es un DEBER</span>
              </button>
            </div>
          ) : (
            /* Instant Normative Feedback */
            <div className={`p-5 rounded-xl border ${
              lastAnswerCorrect 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                : 'bg-rose-50 border-rose-300 text-rose-950'
            } space-y-3 animate-fadeIn`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {lastAnswerCorrect ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>¡Correcto! (+25 XP)</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-rose-600" />
                    <span>Respuesta incorrecta</span>
                  </>
                )}
              </div>

              <p className="text-xs leading-relaxed">
                Este enunciado corresponde a un{' '}
                <strong className="uppercase font-bold">{currentItem.type}</strong> del aprendiz.
              </p>

              <div className="text-[11px] font-mono text-slate-700 bg-white/70 p-2 rounded border border-black/5">
                Fundamento normativo: {currentItem.article} del Reglamento del Aprendiz SENA.
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#00324D] hover:bg-[#002538] rounded-lg cursor-pointer transition-colors"
                >
                  {currentIndex + 1 < DERECHOS_DEBERES_ITEMS.length ? 'Siguiente enunciado' : 'Ver resultados'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Completion Screen */
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-5 shadow-xs">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#39A900]">
            <Sparkles className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-[#00324D]">
              ¡Desafío de Clasificación Completado!
            </h3>
            <p className="text-sm text-slate-600">
              Obtuviste <strong className="text-slate-900 font-mono">{score}</strong> de{' '}
              <strong className="font-mono">{DERECHOS_DEBERES_ITEMS.length}</strong> aciertos y ganaste +100 XP extra.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
            Ahora tienes claridad sobre las garantías institucionales y las responsabilidades éticas en tu centro de formación.
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repetir reto</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
