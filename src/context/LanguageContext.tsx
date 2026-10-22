import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, Translations } from '../i18n/translations';
import { Globe } from 'lucide-react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'sena_app_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (saved === 'es' || saved === 'en') {
          return saved as Language;
        }
      }
    } catch {
      // ignore
    }
    return 'es';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/**
 * Modern, accessible button component to toggle between Spanish and English.
 */
interface LanguageToggleButtonProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'badge';
}

export const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({
  className = '',
  variant = 'pill',
}) => {
  const { language, toggleLanguage, t } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-center shadow-2xs group ${className}`}
        title={t.toggleLanguageTooltip}
        aria-label={t.toggleLanguageTooltip}
      >
        <Globe className="w-4 h-4 text-[#39A900] group-hover:rotate-180 transition-transform duration-500" />
        <span className="ml-1 text-[11px] font-black uppercase tracking-wider">
          {language === 'es' ? 'EN' : 'ES'}
        </span>
      </button>
    );
  }

  // Default 'pill' variant
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${className}`}
      title={t.toggleLanguageTooltip}
      aria-label={t.toggleLanguageTooltip}
    >
      <Globe className="w-3.5 h-3.5 text-[#39A900] group-hover:rotate-45 transition-transform" />
      <span className="flex items-center gap-1">
        <span className={language === 'es' ? 'text-[#39A900] font-black' : 'text-slate-400 font-medium'}>
          ES
        </span>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className={language === 'en' ? 'text-sky-500 font-black' : 'text-slate-400 font-medium'}>
          EN
        </span>
      </span>
      <span className="sr-only">{t.toggleLanguageTooltip}</span>
    </button>
  );
};
