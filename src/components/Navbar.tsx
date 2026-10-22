import React from 'react';
import { 
  Award, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Moon, 
  Sun, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  ArrowLeftRight,
  LogOut 
} from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';
import senaLogo from '../assets/images/sena_logo.svg';
import { SENA_LOGO_DATA_URI } from '../assets/senaLogoDataUri';
import { AutoSyncStatusBadge } from './AutoSyncStatusBadge';
import { useLanguage, LanguageToggleButton } from '../context/LanguageContext';

export type UserRole = 'instructor' | 'aprendiz';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  xp: number;
  streak: number;
  profile: ApprenticeProfile;
  onOpenProfile: () => void;
  certificateEarned: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenGoogleDrive: () => void;
  userRole: UserRole;
  onToggleRole: () => void;
  onReturnToLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  xp,
  profile,
  onOpenProfile,
  certificateEarned,
  isDarkMode,
  onToggleDarkMode,
  onOpenGoogleDrive,
  userRole,
  onToggleRole,
  onReturnToLanding,
}) => {
  const isInstructor = userRole === 'instructor';
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 px-4 sm:px-6 py-3">
        {/* Zone 1: Brand & Current Role Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <img
              src={SENA_LOGO_DATA_URI}
              alt="Logo Oficial SENA"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => setActiveTab(isInstructor ? 'instructor_dashboard' : 'modules')}
              className="text-left group cursor-pointer"
            >
              <span className="text-sm sm:text-base font-bold tracking-tight text-[#00324D] dark:text-white group-hover:text-[#39A900] transition-colors whitespace-nowrap block">
                {t.brandTitle}
              </span>
            </button>
            <div className="flex items-center gap-2 mt-0.5">
              {isInstructor ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-700/60">
                  <ShieldCheck className="w-3 h-3 text-[#39A900]" />
                  <span>{t.roleInstructor}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-[10px] font-bold border border-blue-300 dark:border-blue-700/60">
                  <GraduationCap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span>{t.roleAprendiz}</span>
                </span>
              )}

              {/* Return to Landing / Change Role */}
              {onReturnToLanding && (
                <button
                  onClick={onReturnToLanding}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 underline decoration-dotted cursor-pointer transition-colors"
                  title="Volver a la pantalla de selección de rol"
                >
                  <LogOut className="w-2.5 h-2.5 text-slate-400" />
                  <span>{t.changeRoleOrExit}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 flex-wrap">
          {/* Instructor Exclusive Tab */}
          {isInstructor && (
            <button
              onClick={() => setActiveTab('instructor_dashboard')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                activeTab === 'instructor_dashboard'
                  ? 'text-[#39A900] font-bold border-b-2 border-[#39A900]'
                  : 'hover:text-[#00324D] dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-[#39A900]" />
              <span>{t.instructorDashboard}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('modules')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'modules'
                ? 'text-[#39A900] font-bold border-b-2 border-[#39A900]'
                : 'hover:text-[#00324D] dark:hover:text-white'
            }`}
          >
            {t.learningRoute}
          </button>
          <button
            onClick={() => setActiveTab('rights_duties')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'rights_duties'
                ? 'text-[#39A900] font-bold border-b-2 border-[#39A900]'
                : 'hover:text-[#00324D] dark:hover:text-white'
            }`}
          >
            {t.rightsAndDuties}
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'simulator'
                ? 'text-[#39A900] font-bold border-b-2 border-[#39A900]'
                : 'hover:text-[#00324D] dark:hover:text-white'
            }`}
          >
            {t.simulator}
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'quiz'
                ? 'text-[#39A900] font-bold border-b-2 border-[#39A900]'
                : 'hover:text-[#00324D] dark:hover:text-white'
            }`}
          >
            {t.quiz}
          </button>
          <button
            onClick={() => setActiveTab('plan')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'plan'
                ? 'text-[#39A900] font-bold border-b-2 border-[#39A900]'
                : 'hover:text-[#00324D] dark:hover:text-white'
            }`}
          >
            {t.plan4Phases}
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeTab === 'certificate'
                ? 'text-[#39A900] font-bold border-b-2 border-[#39A900]'
                : 'hover:text-[#00324D] dark:hover:text-white'
            }`}
          >
            {certificateEarned && <CheckCircle2 className="w-4 h-4 text-[#39A900]" />}
            <span>{t.certificate}</span>
          </button>
        </nav>

        {/* Zone 3: Actions Area */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* XP Display */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono tabular-nums">{xp}</span> XP
          </div>

          {/* User Profile Trigger Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Ver y editar perfil institucional"
          >
            <User className="w-3.5 h-3.5 text-[#00324D] dark:text-sky-400" />
            <span className="hidden md:inline truncate max-w-[110px] font-semibold">{profile.fullName.split(' ')[0]}</span>
            <span className="text-slate-400 font-mono text-[11px]">#{profile.ficha}</span>
          </button>

          {/* Auto-Sync Google Drive & Sheets Live Status ONLY for Instructor */}
          {isInstructor && (
            <AutoSyncStatusBadge onOpenModal={onOpenGoogleDrive} />
          )}

          {/* Primary CTA button for Apprentice: Evaluation or Certificate */}
          {!isInstructor && (
            <button
              onClick={() => setActiveTab(certificateEarned ? 'certificate' : 'quiz')}
              className={`px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                certificateEarned
                  ? 'bg-[#00324D] hover:bg-[#002538]'
                  : 'bg-[#39A900] hover:bg-[#329600]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{certificateEarned ? t.certificate : t.quiz}</span>
            </button>
          )}

          {/* Language Toggle Button (ES / EN) */}
          <LanguageToggleButton variant="pill" />

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-center shadow-2xs group"
            title={isDarkMode ? t.darkModeLight : t.darkModeDark}
            aria-label={isDarkMode ? t.darkModeLight : t.darkModeDark}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-[#00324D] group-hover:-rotate-12 transition-transform" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav bar strip */}
      <div className="flex lg:hidden overflow-x-auto border-t border-slate-200 dark:border-slate-800 px-4 py-2 gap-2 text-xs bg-slate-50 dark:bg-slate-950 no-scrollbar">
        {isInstructor && (
          <button
            onClick={() => setActiveTab('instructor_dashboard')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md font-semibold flex items-center gap-1 ${
              activeTab === 'instructor_dashboard'
                ? 'bg-[#00324D] text-white'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.instructorDashboard}</span>
          </button>
        )}
        <button
          onClick={() => setActiveTab('modules')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'modules' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.learningRoute}
        </button>
        <button
          onClick={() => setActiveTab('rights_duties')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'rights_duties' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.rightsAndDuties}
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'simulator' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.simulator}
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'quiz' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.quiz}
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'plan' ? 'bg-[#39A900] text-white font-medium' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.plan4Phases}
        </button>
        <button
          onClick={() => setActiveTab('certificate')}
          className={`whitespace-nowrap px-2.5 py-1 rounded-md ${
            activeTab === 'certificate' ? 'bg-[#00324D] text-white font-medium' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.certificate}
        </button>
      </div>
    </header>
  );
};
