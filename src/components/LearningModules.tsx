import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  Scale, 
  AlertTriangle, 
  Briefcase, 
  Users, 
  Lightbulb, 
  Clock,
  Sparkles,
  X
} from 'lucide-react';
import { ModuleItem } from '../types/induction';
import { useLanguage } from '../context/LanguageContext';

interface LearningModulesProps {
  modules: ModuleItem[];
  completedModules: string[];
  onCompleteModule: (moduleId: string) => void;
  onOpenClassifier: () => void;
  onOpenSimulator: () => void;
}

export const LearningModules: React.FC<LearningModulesProps> = ({
  modules,
  completedModules,
  onCompleteModule,
  onOpenClassifier,
  onOpenSimulator,
}) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModule, setActiveModule] = useState<ModuleItem | null>(null);

  const filteredModules = modules.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.legalBasis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getModuleIcon = (category: string) => {
    switch (category) {
      case 'identidad':
        return <Users className="w-5 h-5 text-emerald-600" />;
      case 'derechos':
        return <Scale className="w-5 h-5 text-blue-600" />;
      case 'deberes':
        return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'prohibiciones':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'faltas_sanciones':
        return <Scale className="w-5 h-5 text-rose-600" />;
      case 'etapa_productiva':
        return <Briefcase className="w-5 h-5 text-teal-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-slate-600" />;
    }
  };

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'derechos', label: t.catRights },
    { id: 'deberes', label: t.catDuties },
    { id: 'prohibiciones', label: t.catProhibitions },
    { id: 'faltas_sanciones', label: t.catOffenses },
    { id: 'etapa_productiva', label: t.catPracticum },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>{language === 'en' ? 'Official Learning Route' : 'Ruta Formativa Oficial'}</span>
            <span aria-hidden="true">·</span>
            <span>{modules.length} {language === 'en' ? 'Key Modules' : 'Módulos Temáticos'}</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'en' ? 'Current Regulations' : 'Normativa Vigente'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] dark:text-white tracking-tight">
            {t.modulesViewTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
            {t.modulesViewSubtitle}
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenClassifier}
            className="px-3.5 py-2 text-xs font-semibold text-[#00324D] dark:text-sky-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <Scale className="w-3.5 h-3.5 text-[#39A900]" />
            <span>{t.btnClassifierShortcut}</span>
          </button>
          <button
            onClick={onOpenSimulator}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#00324D] dark:bg-slate-700 hover:bg-[#002538] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.btnSimulatorShortcut}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2 bg-slate-100 dark:bg-slate-800/60 rounded-xl">
        {/* Segmented controls (Interactive button tabs) */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-slate-900 text-[#00324D] dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchModulesPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#39A900] text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModules.map((item) => {
          const isCompleted = completedModules.includes(item.id);
          return (
            <div
              key={item.id}
              className={`relative bg-white dark:bg-slate-900 border rounded-xl p-5 transition-all hover:shadow-sm flex flex-col justify-between ${
                isCompleted 
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/20 dark:bg-emerald-950/20' 
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                {/* Clean unboxed metadata with dot separators */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    {getModuleIcon(item.category)}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {language === 'en' ? `Chapter ${item.chapterNumber}` : `Capítulo ${item.chapterNumber}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono">{item.readTimeMin} {language === 'en' ? 'min' : 'min'}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#00324D] dark:text-white leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {item.shortDesc}
                </p>

                {/* Legal basis quote */}
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-800/60 p-2 rounded-md border border-slate-150 dark:border-slate-700/60 mb-4">
                  {item.legalBasis}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModule(item)}
                  className="text-xs font-semibold text-[#00324D] dark:text-sky-300 hover:text-[#39A900] dark:hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{t.btnReadModule}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#39A900] dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.moduleCompletedBadge}</span>
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      onCompleteModule(item.id);
                    }}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-[#39A900] rounded-md transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>+50 XP</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Reader Modal */}
      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs z-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <span>{language === 'en' ? `Chapter ${activeModule.chapterNumber}` : `Capítulo ${activeModule.chapterNumber}`}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#39A900] dark:text-emerald-400 font-bold">{activeModule.legalBasis}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#00324D] dark:text-white">
                  {activeModule.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModule(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Summary overview */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-[#00324D] dark:text-sky-300 uppercase tracking-wider block mb-1">
                  {t.modalExecutiveSummary}
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeModule.summary}
                </p>
              </div>

              {/* Articles breakdown */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t.modalArticlesKeyPoints}
                </h4>
                {activeModule.articles.map((art, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#39A900] bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {art.number}
                      </span>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">{art.title}</h5>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{art.description}</p>
                    <ul className="space-y-1 pt-1.5">
                      {art.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-[#39A900] font-bold">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Did you know callout */}
              {activeModule.didYouKnow && (
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-amber-900 dark:text-amber-300">{t.modalDidYouKnow}</span>
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">{activeModule.didYouKnow}</p>
                  </div>
                </div>
              )}

              {/* Practical Tip */}
              {activeModule.practicalTip && (
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300">{t.modalPracticalTip}</span>
                    <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed">{activeModule.practicalTip}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {completedModules.includes(activeModule.id) 
                  ? t.btnModuleCompletedDone 
                  : (language === 'en' ? 'Completing awards +50 XP' : 'Al completar sumas +50 XP a tu perfil')
                }
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModule(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer"
                >
                  {t.modalClose}
                </button>
                {!completedModules.includes(activeModule.id) && (
                  <button
                    onClick={() => {
                      onCompleteModule(activeModule.id);
                      setActiveModule(null);
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.btnMarkCompleted}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
