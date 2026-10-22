import React, { useState } from 'react';
import { X, Send, Bot, Sparkles, Scale, BookOpen, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  sender: 'user' | 'sofia';
  text: string;
  articleCitation?: string;
}

interface SenaMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_QUESTIONS_ES = [
  '¿Cuántos días tengo para justificar una falta de asistencia?',
  '¿Cuáles son las modalidades para hacer la etapa productiva?',
  '¿Qué pasa en el Comité de Evaluación y Seguimiento?',
  '¿Cuáles son las causales de cancelación de matrícula?',
  '¿Qué derechos tengo si considero injusta una calificación?',
];

const PRESET_QUESTIONS_EN = [
  'How many days do I have to justify an absence?',
  'What are the official options for the productive stage?',
  'What happens during an Evaluation Committee hearing?',
  'What causes can cancel enrollment at SENA?',
  'What are my rights if I disagree with a grade?',
];

export const SenaMentorModal: React.FC<SenaMentorModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const presetQuestions = language === 'en' ? PRESET_QUESTIONS_EN : PRESET_QUESTIONS_ES;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'sofia',
      text: language === 'en'
        ? 'Hello Apprentice! I am SofIA, your advisor on the SENA Apprentice Regulations (Agreement 0009 of 2024). What questions do you have about rights, duties, committees, or your practical stage?'
        : '¡Hola, Aprendiz! Soy SofIA, tu orientadora en el Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024). ¿Qué duda tienes sobre tus derechos, deberes, comités o etapa productiva?',
      articleCitation: language === 'en' ? 'SENA Apprentice Regulations · Formative Advisory' : 'Reglamento del Aprendiz SENA · Asesoría Formativa',
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  // Local knowledge-base fallback engine
  const getOfflineNormativeResponse = (query: string): { text: string; citation: string } => {
    const q = query.toLowerCase();

    if (q.includes('falta') && (q.includes('asistencia') || q.includes('inasistencia') || q.includes('días') || q.includes('justificar'))) {
      return {
        text: 'Conforme al Acuerdo 0009 de 2024 (Cap. IV Deberes y Cap. VI Deserción), tienes un plazo legal máximo de tres (3) días hábiles siguientes al hecho para radicar formalmente tu justificación ante coordinación con soporte de EPS o IPS. Si acumulas 3 días continuos sin justificar, se iniciará el proceso formal por presunta deserción.',
        citation: 'Acuerdo 0009 de 2024, Cap. IV & Cap. VI (Deserción)',
      };
    }

    if (q.includes('etapa productiva') || q.includes('modalidad') || q.includes('contrato') || q.includes('pasantía')) {
      return {
        text: 'El Capítulo VII del Acuerdo 0009 de 2024 establece las 5 alternativas oficiales para la Etapa Productiva: 1) Contrato de Aprendizaje (con apoyo económico mensual y EPS/ARL), 2) Vínculo laboral o contractual en funciones afines, 3) Proyecto Productivo / I+D en SENNOVA o Fondo Emprender, 4) Pasantía en entidad pública o empresa concertada, y 5) Monitorías en el SENA. Es obligatorio presentar bitácoras quincenales para ser certificado.',
        citation: 'Acuerdo 0009 de 2024, Capítulo VII (Etapa Productiva)',
      };
    }

    if (q.includes('comité') || q.includes('descargo') || q.includes('debido proceso') || q.includes('defensa') || q.includes('artículo 48') || q.includes('articulo 48')) {
      return {
        text: 'En el Comité de Evaluación y Seguimiento tienes plena garantía constitucional del Debido Proceso (reforzado por el Acuerdo 002 de 2026 en su Artículo 48). Debes ser notificado con formulación clara de cargos, dispones de cinco (5) días hábiles para presentar descargos escritos y aportar pruebas, y tienes derecho a ser acompañado por tu Vocero de Ficha. Contra la resolución sancionatoria procede el Recurso de Reposición dentro de los 5 días siguientes.',
        citation: 'Acuerdo 002 de 2026, Art. 48 & Acuerdo 0009 de 2024, Cap. XI',
      };
    }

    if (q.includes('cancelación') || q.includes('expulsión') || q.includes('matrícula') || q.includes('inhabilidad')) {
      return {
        text: 'La cancelación de matrícula es la sanción disciplinaria máxima impuesta por el Subdirector de Centro ante faltas gravísimas (plagio comprobado, fraude, suplantación en plataformas virtuales, porte de armas, estupefacientes o deserción no justificada). Implica la pérdida definitiva del carácter de aprendiz y acarrea una inhabilidad para ingresar al SENA de entre seis (6) meses y dos (2) años.',
        citation: 'Acuerdo 0009 de 2024, Capítulo X (Sanciones Disciplinarias)',
      };
    }

    if (q.includes('calificación') || q.includes('revisión') || q.includes('evaluación') || q.includes('injusta')) {
      return {
        text: 'El Artículo 7 Numeral 15 del Acuerdo 0009 de 2024 estipula que debes conocer tus evaluaciones dentro de los 8 días hábiles siguientes a la entrega de la evidencia. Si estás en desacuerdo con el juicio (Aprobado / No Aprobado), el Numeral 17 te faculta a solicitar formalmente una Segunda Revisión Técnica ante la Coordinación Académica para que un instructor par revise la evidencia con la rúbrica oficial.',
        citation: 'Acuerdo 0009 de 2024, Artículo 7 Numerales 15 y 17',
      };
    }

    if (q.includes('plagio') || q.includes('copiar') || q.includes('fraude') || q.includes('ia') || q.includes('inteligencia artificial')) {
      return {
        text: 'El plagio, copia o uso deshonesto de tecnologías o inteligencia artificial sin elaboración propia para suplantar evidencias está tipificado en los Capítulos V y VIII del Acuerdo 0009 de 2024 como falta grave o gravísima. Puede conllevar llamado de atención escrito con plan de mejoramiento, condicionamiento de matrícula o cancelación definitiva con inhabilidad.',
        citation: 'Acuerdo 0009 de 2024, Capítulo V Prohibiciones & Cap. VIII Faltas',
      };
    }

    if (q.includes('bienestar') || q.includes('apoyo') || q.includes('sostenimiento') || q.includes('monitoría')) {
      return {
        text: 'Como aprendiz matriculado en formación titulada tienes derecho a postularte a los apoyos de sostenimiento (FIC, Regular o Monitorías) cuando se abran convocatorias en tu centro, siempre que cumplas los criterios de vulnerabilidad socioeconómica y excelente rendimiento académico.',
        citation: 'Acuerdo 0009 de 2024, Artículo 7 Numeral 9',
      };
    }

    return {
      text: `Conforme al Reglamento del Aprendiz SENA vigente (Acuerdo 0009 de 2024 y modificación del Acuerdo 002 de 2026), toda situación formativa se rige por los principios de dignidad, debido proceso, enfoque diferencial y responsabilidad compartida. Ante cualquier dificultad, el primer paso es el diálogo concertado con tu Instructor Líder de Ficha o el enlace de Bienestar al Aprendiz.`,
      citation: 'Acuerdo 0009 de 2024 & Acuerdo 002 de 2026',
    };
  };

  const handleSend = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const trimmed = userText.trim();
    setInputQuery('');
    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `Eres SofIA, la tutora virtual y asesora pedagógica de inducción del SENA en Colombia. Tu misión es explicar el Reglamento del Aprendiz SENA actualmente vigente (Acuerdo 0009 de 2024 adoptado por el Consejo Directivo Nacional y su modificación en debido proceso mediante el Acuerdo 002 de 2026, el cual derogó en su totalidad el antiguo Acuerdo 07 de 2012) de forma clara, motivadora, institucional y respetuosa. Siempre menciona la base normativa (22 derechos del Art. 7, 32 deberes, comités de evaluación, debido proceso y términos de 5 días hábiles según Acuerdo 002/2026, faltas leves/graves/gravísimas, o las 5 alternativas de etapa productiva). Sé concisa (máximo 3 párrafos cortos).`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: trimmed,
          config: {
            systemInstruction,
            temperature: 0.3,
          },
        });

        const reply = response.text || '';
        if (reply) {
          setMessages((prev) => [
            ...prev,
            {
              sender: 'sofia',
              text: reply,
              articleCitation: 'Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024)',
            },
          ]);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback cleanly to local knowledge base
    }

    // Local fallback reply
    const fallback = getOfflineNormativeResponse(trimmed);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'sofia',
          text: fallback.text,
          articleCitation: fallback.citation,
        },
      ]);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full h-[600px] max-h-[90vh] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-[#00324D] dark:bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#39A900] flex items-center justify-center text-white font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">{t.sofiaModalTitle}</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  {language === 'en' ? 'Agr. 0009/2024' : 'Acuerdo 0009/2024'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {t.sofiaModalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'sofia' && (
                <div className="w-7 h-7 rounded-lg bg-[#39A900] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  S
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#00324D] dark:bg-slate-800 text-white rounded-tr-xs'
                    : 'bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-xs shadow-2xs'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                {m.articleCitation && (
                  <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] font-mono text-[#39A900] dark:text-emerald-400 flex items-center gap-1">
                    <Scale className="w-3 h-3" />
                    <span>{m.articleCitation}</span>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic p-2">
              <Sparkles className="w-3.5 h-3.5 text-[#39A900] animate-spin" />
              <span>{language === 'en' ? 'SofIA is consulting the Apprentice Regulations...' : 'SofIA está consultando el Reglamento del Aprendiz...'}</span>
            </div>
          )}
        </div>

        {/* Preset quick pills */}
        <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 shrink-0">{t.sofiaQuickPromptsTitle}</span>
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md whitespace-nowrap cursor-pointer transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat input */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(inputQuery);
            }}
            placeholder={t.sofiaInputPlaceholder}
            className="flex-1 px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] text-slate-900 dark:text-white placeholder-slate-400"
          />
          <button
            onClick={() => handleSend(inputQuery)}
            disabled={!inputQuery.trim() || loading}
            className="px-3.5 py-2 bg-[#39A900] hover:bg-[#329600] disabled:opacity-50 text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.sofiaSendBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
