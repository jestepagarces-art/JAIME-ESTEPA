import React, { useState } from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  KeyRound, 
  Eye, 
  EyeOff, 
  User, 
  Building, 
  BookOpen, 
  Hash, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  FileCheck2,
  Calendar,
  Layers,
  ChevronRight,
  Play,
  Video,
  Maximize2
} from 'lucide-react';
import senaLogo from '../assets/images/sena_logo.svg';
import { SENA_LOGO_DATA_URI } from '../assets/senaLogoDataUri';
import { ApprenticeProfile, DocumentType } from '../types/induction';
import { SENA_REGIONALES, SENA_CENTROS, POPULAR_PROGRAMS } from '../data/senaData';
import { TutorialFloatingVideo } from './TutorialFloatingVideo';
import { useLanguage, LanguageToggleButton } from '../context/LanguageContext';

interface RoleSelectionLandingProps {
  initialRole?: 'instructor' | 'aprendiz';
  onLoginInstructor: () => void;
  onLoginAprendiz: (profile: ApprenticeProfile) => void;
  currentProfile: ApprenticeProfile;
}

export const RoleSelectionLanding: React.FC<RoleSelectionLandingProps> = ({
  initialRole = 'aprendiz',
  onLoginInstructor,
  onLoginAprendiz,
  currentProfile,
}) => {
  const { t, language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<'instructor' | 'aprendiz'>(initialRole);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // Instructor Password state
  const [instructorKey, setInstructorKey] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [instructorError, setInstructorError] = useState<string | null>(null);
  const [isSubmittingInstructor, setIsSubmittingInstructor] = useState<boolean>(false);

  // Apprentice Characterization state
  const [formData, setFormData] = useState<ApprenticeProfile>(currentProfile);
  const [isSubmittingAprendiz, setIsSubmittingAprendiz] = useState<boolean>(false);
  const [aprendizError, setAprendizError] = useState<string | null>(null);

  // Handle Instructor Password Login
  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInstructorError(null);
    setIsSubmittingInstructor(true);

    const normalized = instructorKey.trim().toLowerCase();

    // Accepted password: "sena 1234" (or "sena1234" for convenience)
    if (normalized === 'sena 1234' || normalized === 'sena1234') {
      setTimeout(() => {
        setIsSubmittingInstructor(false);
        onLoginInstructor();
      }, 400);
    } else {
      setTimeout(() => {
        setIsSubmittingInstructor(false);
        setInstructorError('Clave de acceso incorrecta. Verifique sus credenciales institucionales.');
      }, 300);
    }
  };

  // Handle Apprentice Characterization Submit (No password needed)
  const handleAprendizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAprendizError(null);

    if (!formData.fullName.trim()) {
      setAprendizError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!formData.docNumber.trim()) {
      setAprendizError('Por favor ingresa tu número de documento.');
      return;
    }
    if (!formData.ficha.trim()) {
      setAprendizError('Por favor ingresa el número de tu ficha de caracterización.');
      return;
    }

    setIsSubmittingAprendiz(true);
    setTimeout(() => {
      setIsSubmittingAprendiz(false);
      onLoginAprendiz(formData);
    }, 400);
  };

  const handleRegionalChange = (regional: string) => {
    const centers = SENA_CENTROS[regional] || ['Centro de Formación Integral'];
    setFormData((prev) => ({
      ...prev,
      regional,
      center: centers[0] || 'Centro de Formación',
    }));
  };

  const currentCenters = SENA_CENTROS[formData.regional] || [
    formData.center || 'Centro de Formación SENA',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-emerald-50/30 dark:from-[#080d1a] dark:via-[#090f20] dark:to-[#061510] text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-[#39A900] selection:text-white">
      {/* Top Institutional Header */}
      <header className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
              <img
                src={SENA_LOGO_DATA_URI}
                alt="Logo SENA"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-[#00324D] dark:text-white block">
                SENA · Servicio Nacional de Aprendizaje
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {t.brandSubtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-end">
            {/* Language Switcher Button (ES / EN) */}
            <LanguageToggleButton variant="pill" />

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              title="Abrir Video Tutorial en ventana flotante"
            >
              <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse"></span>
              <Play className="w-3 h-3 fill-current text-[#39A900]" />
              <span>{t.floatingButtonLabel}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
              <span>{t.republicOfColombia}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Landing Content Container */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        {/* Title & Directive */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#39A900]" />
            <span>{t.secureAccessBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#00324D] dark:text-white">
            {t.landingHeadline}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.landingDescription}
          </p>
        </div>

        {/* Embedded Video Tutorial Section on the Landing Page */}
        <div className="max-w-2xl mx-auto w-full mb-8 bg-white dark:bg-slate-900 border-2 border-emerald-500/30 rounded-3xl p-4 sm:p-5 shadow-lg overflow-hidden transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 gap-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#39A900] to-emerald-400 text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#00324D] dark:text-white">
                    {t.videoTutorialTitle}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-700">
                    {t.videoTutorialBadge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.videoTutorialSubtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#00324D] hover:bg-[#002438] text-white transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
              title="Abrir en ventana flotante para seguir viendo mientras te registras"
            >
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.openFloatingWindow}</span>
            </button>
          </div>

          {/* Direct HTML5 Video Player with Complete Controls */}
          <div className="mt-3.5 relative rounded-2xl overflow-hidden bg-black aspect-video shadow-inner">
            <video
              src="/assets/aistudio/Guia_Induccion_SENA_LogoOficial.pptx_debbdcd1.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain bg-black"
            >
              Tu navegador no soporta reproducción de video.
            </video>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#39A900]"></span>
              {t.embeddedVideoFootnote}
            </span>
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="text-[#39A900] hover:underline font-semibold cursor-pointer"
            >
              {t.fullscreenOrFloating}
            </button>
          </div>
        </div>

        {/* Role Selector Tabs / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full mb-8">
          {/* Card Option: Aprendiz */}
          <button
            type="button"
            onClick={() => setSelectedRole('aprendiz')}
            className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-3 relative ${
              selectedRole === 'aprendiz'
                ? 'border-[#39A900] bg-white dark:bg-slate-900 shadow-md ring-2 ring-[#39A900]/20'
                : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 opacity-90'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 p-1.5 flex items-center justify-center font-bold border border-emerald-200/80 dark:border-emerald-800/80 shadow-2xs">
                <img
                  src={SENA_LOGO_DATA_URI}
                  alt="Logo SENA"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800">
                {t.cardAprendizBadge}
              </span>
            </div>

            <div>
              <div className="text-base font-bold text-[#00324D] dark:text-white flex items-center gap-1.5">
                <span>{t.cardAprendizTitle}</span>
                {selectedRole === 'aprendiz' && (
                  <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {t.cardAprendizDescription}
              </p>
            </div>
          </button>

          {/* Card Option: Instructor */}
          <button
            type="button"
            onClick={() => setSelectedRole('instructor')}
            className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-3 relative ${
              selectedRole === 'instructor'
                ? 'border-[#00324D] dark:border-sky-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-[#00324D]/20'
                : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 opacity-90'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 p-1.5 flex items-center justify-center font-bold border border-emerald-200/80 dark:border-emerald-800/80 shadow-2xs">
                <img
                  src={SENA_LOGO_DATA_URI}
                  alt="Logo SENA"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                {t.cardInstructorBadge}
              </span>
            </div>

            <div>
              <div className="text-base font-bold text-[#00324D] dark:text-white flex items-center gap-1.5">
                <span>{t.cardInstructorTitle}</span>
                {selectedRole === 'instructor' && (
                  <CheckCircle2 className="w-4 h-4 text-[#00324D] dark:text-sky-400" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {t.cardInstructorDescription}
              </p>
            </div>
          </button>
        </div>

        {/* Selected Form Container */}
        <div className="max-w-2xl mx-auto w-full">
          {/* ======================================================== */}
          {/* INSTRUCTOR PORTAL FORM (Requires Password: sena 1234) */}
          {/* ======================================================== */}
          {selectedRole === 'instructor' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#00324D] text-white flex items-center justify-center font-bold">
                    <KeyRound className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#00324D] dark:text-white">
                      {t.instructorAuthTitle}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.instructorAuthSubtitle}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleInstructorSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t.instructorKeyLabel}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={instructorKey}
                      onChange={(e) => {
                        setInstructorKey(e.target.value);
                        if (instructorError) setInstructorError(null);
                      }}
                      placeholder={t.instructorKeyPlaceholder}
                      autoFocus
                      required
                      className="w-full pl-4 pr-11 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00324D] dark:focus:ring-sky-500 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      title={showPassword ? 'Ocultar clave' : 'Ver clave'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {instructorError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                    <p>{t.instructorKeyError}</p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingInstructor || !instructorKey.trim()}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#00324D] hover:bg-[#002438] active:scale-[0.99] transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmittingInstructor ? (
                      <span>{t.verifyingKey}</span>
                    ) : (
                      <>
                        <span>{t.unlockInstructorAccess}</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between gap-2">
                <span>{t.instructorHint}</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* APPRENTICE PORTAL FORM (Characterization, NO Password) */}
          {/* ======================================================== */}
          {selectedRole === 'aprendiz' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#00324D] dark:text-white">
                      {t.characterizationTitle}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.characterizationSubtitle}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAprendizSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t.fullNameLabel} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder={t.fullNamePlaceholder}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>
                </div>

                {/* Document Type & Number */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.docTypeLabel} *
                    </label>
                    <select
                      value={formData.docType}
                      onChange={(e) => setFormData({ ...formData, docType: e.target.value as DocumentType })}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                      <option value="CC">Cédula de Ciudadanía (CC)</option>
                      <option value="TI">Tarjeta de Identidad (TI)</option>
                      <option value="CE">Cédula de Extranjería (CE)</option>
                      <option value="PEP">Permiso Especial (PEP / PPT)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.docNumberLabel} *
                    </label>
                    <div className="relative">
                      <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder={t.docNumberPlaceholder}
                        value={formData.docNumber}
                        onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                        className="w-full pl-8 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                  </div>
                </div>

                {/* Regional & Center */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.regionalLabel} *
                    </label>
                    <select
                      value={formData.regional}
                      onChange={(e) => handleRegionalChange(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                      {SENA_REGIONALES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.centerLabel} *
                    </label>
                    <select
                      value={formData.center}
                      onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                      {currentCenters.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Program & Ficha */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.programLabel} *
                    </label>
                    <input
                      type="text"
                      list="programas-list"
                      required
                      placeholder={t.programPlaceholder}
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                    <datalist id="programas-list">
                      {POPULAR_PROGRAMS.map((p) => (
                        <option key={p} value={p} />
                      ))}
                    </datalist>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.fichaLabel} *
                    </label>
                    <div className="relative">
                      <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder={t.fichaPlaceholder}
                        value={formData.ficha}
                        onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                        className="w-full pl-8 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                  </div>
                </div>

                {/* Modality & Jornada */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.modalityLabel} *
                    </label>
                    <select
                      value={formData.modality}
                      onChange={(e) => setFormData({ ...formData, modality: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                      <option value="Presencial">{t.presencial}</option>
                      <option value="Virtual">{t.virtual}</option>
                      <option value="Mixta">{t.mixta}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      {t.jornadaLabel} *
                    </label>
                    <select
                      value={formData.jornada}
                      onChange={(e) => setFormData({ ...formData, jornada: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                      <option value="Diurna">{t.diurna}</option>
                      <option value="Nocturna">{t.nocturna}</option>
                      <option value="Mixta">{t.mixta}</option>
                      <option value="Fines de semana">Fines de semana / Weekend</option>
                    </select>
                  </div>
                </div>

                {aprendizError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{aprendizError}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingAprendiz}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#39A900] hover:bg-[#329600] active:scale-[0.99] transition-all cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmittingAprendiz ? (
                      <span>{t.submittingAprendiz}</span>
                    ) : (
                      <>
                        <span>{t.startInductionButton}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
                <span>{t.autoSyncNotice}</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>{t.footerText}</p>
      </footer>

      {/* Persistent Floating Video Button (Always available on landing page) */}
      {!isVideoModalOpen && (
        <button
          type="button"
          onClick={() => setIsVideoModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#00324D] hover:bg-[#002235] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 border-2 border-emerald-500/40 transition-all cursor-pointer"
          title="Ver video tutorial de inducción"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39A900] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39A900]"></span>
          </span>
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
          </div>
          <span className="text-xs font-bold tracking-tight">{t.floatingButtonLabel}</span>
        </button>
      )}

      {/* Floating Tutorial Video Window with Controls */}
      <TutorialFloatingVideo
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};
