import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_PROFILE, 
  INDUCTION_MODULES, 
  INDUCTION_BADGES,
  DERECHOS_DEBERES_ITEMS,
  getInductionModules,
  getInductionBadges,
  getDerechosDeberes
} from './data/senaData';
import { ApprenticeProfile, InductionProgress } from './types/induction';
import { Navbar, UserRole } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LearningModules } from './components/LearningModules';
import { RightsDutiesClassifier } from './components/RightsDutiesClassifier';
import { CaseSimulator } from './components/CaseSimulator';
import { GamifiedQuiz } from './components/GamifiedQuiz';
import { CertificateView } from './components/CertificateView';
import { StructuredPlanView } from './components/StructuredPlanView';
import { ProfileModal } from './components/ProfileModal';
import { SenaMentorModal } from './components/SenaMentorModal';
import { GoogleDriveSyncModal } from './components/GoogleDriveSyncModal';
import { ScreenBlurEffect } from './components/ScreenBlurEffect';
import { InstructorDashboard } from './components/InstructorDashboard';
import { RoleSelectionLanding } from './components/RoleSelectionLanding';
import { initAutoSync, triggerAutoSync } from './services/autoSyncService';
import { 
  Award, 
  ShieldCheck, 
  Scale, 
  ChevronRight,
  Users,
  Eye
} from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function MainApp() {
  const { language, t } = useLanguage();
  const currentModules = getInductionModules(language);
  const currentBadges = getInductionBadges(language);
  const currentDerechosDeberes = getDerechosDeberes(language);
  // Determine if there's a URL role hint (e.g. ?role=aprendiz or ?role=instructor)
  const urlRoleHint: 'instructor' | 'aprendiz' = (() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const roleParam = (params.get('role') || params.get('rol') || '').toLowerCase();
        if (roleParam === 'instructor') return 'instructor';
        if (roleParam === 'aprendiz') return 'aprendiz';
      }
    } catch {
      // ignore
    }
    return 'aprendiz';
  })();

  // Authenticated Role: null triggers the Landing Page
  const [authenticatedRole, setAuthenticatedRole] = useState<UserRole | null>(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedSession = sessionStorage.getItem('sena_session_role');
        if (savedSession === 'instructor' || savedSession === 'aprendiz') {
          return savedSession as UserRole;
        }
      }
    } catch {
      // ignore
    }
    return null; // Show Landing Page by default
  });

  // Dark mode state with persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sena_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);

  // Sync dark mode class and data attribute on root <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      try {
        localStorage.setItem('sena_dark_mode', 'true');
      } catch {
        // ignore
      }
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      try {
        localStorage.setItem('sena_dark_mode', 'false');
      } catch {
        // ignore
      }
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (nextMode) {
      setIsBlurTransitioning(true);
      setTimeout(() => {
        setIsBlurTransitioning(false);
      }, 1100);
    }
  };

  const handleReplayBlur = () => {
    setIsBlurTransitioning(true);
    setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 1100);
  };

  // Load persistent profile
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_apprentice_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Load persistent progress
  const [progress, setProgress] = useState<InductionProgress>(() => {
    try {
      const saved = localStorage.getItem('sena_induction_progress');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      modulesCompleted: ['mod-1'],
      quizCompleted: false,
      quizScore: 0,
      quizAnswers: {},
      casesCompleted: ['case-1'],
      classifierCompleted: false,
      xp: 225,
      streak: 3,
      unlockedBadges: ['badge-1'],
      certificateCode: `SENA-IND-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      certificateDate: new Date().toISOString(),
    };
  });

  // Initialize active tab
  const [activeTab, setActiveTab] = useState<string>(() => {
    return authenticatedRole === 'instructor' ? 'instructor_dashboard' : 'modules';
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState<boolean>(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState<boolean>(false);

  // Initialize background Google Drive & Sheets auto-sync
  useEffect(() => {
    initAutoSync();
  }, []);

  // Sync profile & progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('sena_induction_progress', JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Login handler: Instructor (after verifying key "sena 1234")
  const handleLoginInstructor = () => {
    setAuthenticatedRole('instructor');
    setActiveTab('instructor_dashboard');
    try {
      sessionStorage.setItem('sena_session_role', 'instructor');
      localStorage.setItem('sena_user_role', 'instructor');
    } catch {
      // ignore
    }
  };

  // Login handler: Aprendiz (after characterization submit)
  const handleLoginAprendiz = (newProfile: ApprenticeProfile) => {
    setProfile(newProfile);
    setAuthenticatedRole('aprendiz');
    setActiveTab('modules');
    try {
      sessionStorage.setItem('sena_session_role', 'aprendiz');
      localStorage.setItem('sena_user_role', 'aprendiz');
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(newProfile));
    } catch {
      // ignore
    }
    triggerAutoSync(newProfile, progress, 'Ingreso y Caracterización de Aprendiz');
  };

  // Logout / Return to Landing
  const handleReturnToLanding = () => {
    setAuthenticatedRole(null);
    try {
      sessionStorage.removeItem('sena_session_role');
    } catch {
      // ignore
    }
  };

  // Role toggle when already authenticated
  const handleToggleRole = () => {
    const nextRole: UserRole = authenticatedRole === 'instructor' ? 'aprendiz' : 'instructor';
    setAuthenticatedRole(nextRole);
    try {
      sessionStorage.setItem('sena_session_role', nextRole);
      localStorage.setItem('sena_user_role', nextRole);
    } catch {
      // ignore
    }
    if (nextRole === 'instructor') {
      setActiveTab('instructor_dashboard');
    } else {
      setActiveTab('modules');
    }
  };

  const handleSaveProfile = (newProfile: ApprenticeProfile) => {
    setProfile(newProfile);
    triggerAutoSync(newProfile, progress, 'Actualización de Perfil');
  };

  // Gain XP and unlock badges
  const handleGainXp = (amount: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const newlyUnlocked = [...prev.unlockedBadges];

      currentBadges.forEach((b) => {
        if (newXp >= b.requiredXp && !newlyUnlocked.includes(b.id)) {
          newlyUnlocked.push(b.id);
        }
      });

      return {
        ...prev,
        xp: newXp,
        unlockedBadges: newlyUnlocked,
      };
    });
  };

  const handleCompleteModule = (moduleId: string) => {
    if (!progress.modulesCompleted.includes(moduleId)) {
      const nextModules = [...progress.modulesCompleted, moduleId];
      const nextXp = progress.xp + 50;
      const nextProgress: InductionProgress = {
        ...progress,
        modulesCompleted: nextModules,
        xp: nextXp,
      };
      setProgress(nextProgress);
      handleGainXp(50);
      triggerAutoSync(profile, nextProgress, `Módulo completado (${nextModules.length}/8)`);
    }
  };

  const handleCaseCompleted = (caseId: string) => {
    if (!progress.casesCompleted.includes(caseId)) {
      const nextCases = [...progress.casesCompleted, caseId];
      const nextXp = progress.xp + 75;
      const nextProgress: InductionProgress = {
        ...progress,
        casesCompleted: nextCases,
        xp: nextXp,
      };
      setProgress(nextProgress);
      handleGainXp(75);
      triggerAutoSync(profile, nextProgress, 'Caso práctico resuelto');
    }
  };

  const handleEvaluationCompleted = (scorePercentage: number) => {
    const passed = scorePercentage >= 70;
    const badges = [...progress.unlockedBadges];
    if (passed && !badges.includes('badge-5')) {
      badges.push('badge-5');
    }

    const nextProgress: InductionProgress = {
      ...progress,
      quizCompleted: passed,
      quizScore: scorePercentage,
      unlockedBadges: badges,
      certificateDate: new Date().toISOString(),
    };

    setProgress(nextProgress);
    triggerAutoSync(
      profile,
      nextProgress,
      passed ? 'Certificado Aprobado (100%)' : `Evaluación Final (${scorePercentage}%)`
    );
  };

  const certificateEarned = progress.quizCompleted || progress.quizScore >= 70;
  const isInstructor = authenticatedRole === 'instructor';

  // =========================================================================
  // If not yet authenticated, render the Landing Page Role Gatekeeper
  // =========================================================================
  if (!authenticatedRole) {
    return (
      <RoleSelectionLanding
        initialRole={urlRoleHint}
        onLoginInstructor={handleLoginInstructor}
        onLoginAprendiz={handleLoginAprendiz}
        currentProfile={profile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-[#39A900] selection:text-white relative transition-colors duration-300">
      {/* Dynamic Screen Blur Overlay and Ambient Glow Effect */}
      <ScreenBlurEffect
        isDarkMode={isDarkMode}
        isTransitioning={isBlurTransitioning}
        onReplayTransition={handleReplayBlur}
      />

      {/* Top Navbar with explicit Role Distinction & Logout/Switch */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        xp={progress.xp}
        streak={progress.streak}
        profile={profile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        certificateEarned={certificateEarned}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenGoogleDrive={() => setIsDriveModalOpen(true)}
        userRole={authenticatedRole}
        onToggleRole={handleToggleRole}
        onReturnToLanding={handleReturnToLanding}
      />

      {/* Preview indicator banner when Instructor is exploring student modules */}
      {isInstructor && activeTab !== 'instructor_dashboard' && (
        <div className="bg-emerald-950/90 text-emerald-100 border-b border-emerald-800 px-4 py-2 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>{language === 'en' ? 'Apprentice Preview:' : 'Vista previa del Aprendiz:'}</strong> {t.previewBannerText}
            </span>
          </div>
          <button
            onClick={() => setActiveTab('instructor_dashboard')}
            className="px-3 py-1 bg-[#39A900] hover:bg-[#329600] text-white font-semibold rounded-lg shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.previewBannerReturnBtn}</span>
          </button>
        </div>
      )}

      {/* Hero Banner (Shown on student learning views or preview) */}
      {(activeTab === 'modules' || activeTab === 'plan') && (
        <HeroSection
          profile={profile}
          totalModules={currentModules.length}
          completedModulesCount={progress.modulesCompleted.length}
          xp={progress.xp}
          certificateEarned={certificateEarned}
          onStartLearning={() => setActiveTab('modules')}
          onOpenEvaluation={() => setActiveTab('quiz')}
          onOpenSimulator={() => setActiveTab('simulator')}
        />
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Dedicated Instructor Tracking & Management Dashboard */}
        {isInstructor && activeTab === 'instructor_dashboard' && (
          <InstructorDashboard
            onOpenDriveModal={() => setIsDriveModalOpen(true)}
            onSwitchToStudentView={() => setActiveTab('modules')}
            currentApprenticeProfile={profile}
            currentApprenticeProgress={progress}
          />
        )}

        {/* Apprentice Learning Modules */}
        {activeTab === 'modules' && (
          <div className="space-y-10">
            <LearningModules
              modules={currentModules}
              completedModules={progress.modulesCompleted}
              onCompleteModule={handleCompleteModule}
              onOpenClassifier={() => setActiveTab('rights_duties')}
              onOpenSimulator={() => setActiveTab('simulator')}
            />

            {/* Badges and Mastery Strip */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-[#00324D] dark:text-white">
                    {t.badgesTitle}
                  </h3>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {progress.unlockedBadges.length} / {currentBadges.length} {t.badgesUnlockedText}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {currentBadges.map((badge) => {
                  const isUnlocked = progress.unlockedBadges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-xl border text-center space-y-1.5 transition-all ${
                        isUnlocked
                          ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/40 text-slate-900 dark:text-white'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto ${
                          isUnlocked ? 'bg-[#39A900] text-white shadow-2xs' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                        }`}
                      >
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold truncate">{badge.name}</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                        {badge.description}
                      </p>
                      <div className="text-[10px] font-mono font-semibold text-slate-400 pt-1">
                        {isUnlocked ? t.badgeUnlockedLabel : `${badge.requiredXp} XP`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Rights and Duties */}
        {activeTab === 'rights_duties' && (
          <div className="space-y-10">
            <RightsDutiesClassifier
              onGainXp={handleGainXp}
              onFinished={() => {
                setProgress((prev) => ({ ...prev, classifierCompleted: true }));
              }}
            />

            {/* Comprehensive Rights and Duties Reference Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-[#39A900] uppercase">
                  {t.comparativeTitleTag}
                </span>
                <h3 className="text-lg font-bold text-[#00324D] dark:text-white mt-0.5">
                  {t.comparativeCatalogTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rights Column */}
                <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/60 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-300">
                    <Scale className="w-4 h-4 text-blue-600" />
                    <span>{t.fundamentalRightsTitle}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {currentDerechosDeberes.filter((i) => i.type === 'derecho').map((item) => (
                      <li key={item.id} className="flex items-start gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-lg border border-blue-100 dark:border-blue-900/40">
                        <span className="font-bold text-blue-600 dark:text-blue-400">✓</span>
                        <div className="space-y-0.5">
                          <p>{item.text}</p>
                          <span className="text-[10px] font-mono text-slate-400 block">{item.article}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duties Column */}
                <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/60 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t.essentialDutiesTitle}</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {currentDerechosDeberes.filter((i) => i.type === 'deber').map((item) => (
                      <li key={item.id} className="flex items-start gap-2 bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">●</span>
                        <div className="space-y-0.5">
                          <p>{item.text}</p>
                          <span className="text-[10px] font-mono text-slate-400 block">{item.article}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Case Simulator */}
        {activeTab === 'simulator' && (
          <CaseSimulator
            onGainXp={handleGainXp}
            onCaseCompleted={handleCaseCompleted}
            completedCases={progress.casesCompleted}
          />
        )}

        {/* Gamified Quiz */}
        {activeTab === 'quiz' && (
          <GamifiedQuiz
            onGainXp={handleGainXp}
            onEvaluationCompleted={handleEvaluationCompleted}
            onViewCertificate={() => setActiveTab('certificate')}
            savedScore={progress.quizScore}
          />
        )}

        {/* Structured 4-phase Plan */}
        {activeTab === 'plan' && (
          <StructuredPlanView
            onStartInduction={() => setActiveTab('modules')}
            onOpenEvaluation={() => setActiveTab('quiz')}
          />
        )}

        {/* Certificate View */}
        {activeTab === 'certificate' && (
          certificateEarned ? (
            <CertificateView
              profile={profile}
              score={progress.quizScore || 88}
              verificationCode={progress.certificateCode}
              issueDate={progress.certificateDate}
              onEditProfile={() => setIsProfileModalOpen(true)}
              onOpenGoogleDrive={isInstructor ? () => setIsDriveModalOpen(true) : undefined}
            />
          ) : (
            <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-5 shadow-xs">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/80 rounded-full flex items-center justify-center mx-auto text-amber-600 dark:text-amber-400">
                <Award className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#00324D] dark:text-white">
                  {t.certificateLockedTitle}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.certificateLockedDescription}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329600] rounded-lg shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>{t.btnGoToQuiz}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )
        )}
      </main>

      {/* Floating Regulatory Assistant Trigger (SofIA) */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsMentorModalOpen(true)}
          className="px-4 py-3 bg-[#00324D] dark:bg-slate-900 hover:bg-[#002538] dark:hover:bg-slate-800 text-white rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 transition-all flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 group backdrop-blur-md"
          title={t.askSofiaTooltip}
        >
          <div className="w-7 h-7 rounded-lg bg-[#39A900] flex items-center justify-center text-white font-black text-xs">
            S
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-bold block leading-none">{t.askSofiaTitle}</span>
            <span className="text-[10px] text-slate-300 dark:text-slate-400 leading-none">{t.askSofiaSubtitle}</span>
          </div>
        </button>
      </div>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      <SenaMentorModal
        isOpen={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
      />

      {/* Drive modal ONLY triggered for instructors */}
      {isInstructor && (
        <GoogleDriveSyncModal
          isOpen={isDriveModalOpen}
          onClose={() => setIsDriveModalOpen(false)}
          profile={profile}
          progress={progress}
        />
      )}

      {/* Institutional Footer */}
      <footer className="mt-auto bg-white dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs py-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center shrink-0">
              <img
                src="/src/assets/images/sena_logo.svg"
                alt="Logo SENA"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">Servicio Nacional de Aprendizaje - SENA</span>
              <span className="text-slate-400 block text-[11px]">
                {t.footerRights}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>{t.fpiBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{t.lectivaProductiva}</span>
            <span aria-hidden="true">·</span>
            <span>{t.republicOfColombia}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

