export type DocumentType = 'CC' | 'TI' | 'CE' | 'PPT';

export interface ApprenticeProfile {
  fullName: string;
  docType: DocumentType;
  docNumber: string;
  regional: string;
  center: string;
  program: string;
  ficha: string;
  modality: 'Presencial' | 'Virtual' | 'Mixta';
  jornada: 'Diurna' | 'Nocturna' | 'Mixta' | 'Fines de semana';
  startDate: string;
}

export interface ModuleItem {
  id: string;
  chapterNumber: number;
  title: string;
  shortDesc: string;
  category: 'identidad' | 'derechos' | 'deberes' | 'prohibiciones' | 'etapa_productiva' | 'faltas_sanciones' | 'tramites';
  legalBasis: string;
  readTimeMin: number;
  summary: string;
  articles: {
    number: string;
    title: string;
    description: string;
    highlights: string[];
  }[];
  didYouKnow: string;
  practicalTip: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  legalArticle: string;
  points: number;
}

export interface CaseChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  outcome: string;
  normativeAnalysis: string;
  articleCitation: string;
}

export interface SimulationCase {
  id: string;
  title: string;
  category: string;
  situation: string;
  character: string;
  role: string;
  choices: CaseChoice[];
}

export interface InductionBadge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  requiredXp: number;
  condition: string;
}

export interface InductionProgress {
  modulesCompleted: string[];
  quizCompleted: boolean;
  quizScore: number;
  quizAnswers: Record<string, number>;
  casesCompleted: string[];
  classifierCompleted: boolean;
  xp: number;
  streak: number;
  unlockedBadges: string[];
  certificateCode: string;
  certificateDate: string;
}
