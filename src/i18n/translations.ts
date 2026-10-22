export type Language = 'es' | 'en';

export interface Translations {
  // Common / Navbar
  brandTitle: string;
  brandSubtitle: string;
  republicOfColombia: string;
  roleInstructor: string;
  roleAprendiz: string;
  changeRoleOrExit: string;
  instructorDashboard: string;
  learningRoute: string;
  rightsAndDuties: string;
  simulator: string;
  quiz: string;
  plan4Phases: string;
  certificate: string;
  darkModeLight: string;
  darkModeDark: string;
  languageButtonLabel: string;
  toggleLanguageTooltip: string;

  // Video Tutorial
  videoTutorialTitle: string;
  videoTutorialSubtitle: string;
  videoTutorialBadge: string;
  openFloatingWindow: string;
  floatingPiPTitle: string;
  minimizedPiP: string;
  copyLink: string;
  linkCopied: string;
  videoSettings: string;
  videoDrivePlaceholder: string;
  restoreOfficialVideo: string;
  saveAndLoad: string;
  activeControlsNotice: string;
  embeddedVideoFootnote: string;
  fullscreenOrFloating: string;
  floatingButtonLabel: string;

  // Landing Page
  secureAccessBadge: string;
  landingHeadline: string;
  landingDescription: string;
  firstTimeVideoCta: string;
  firstTimeVideoCtaSub: string;

  // Apprentice Card
  cardAprendizTitle: string;
  cardAprendizBadge: string;
  cardAprendizDescription: string;

  // Instructor Card
  cardInstructorTitle: string;
  cardInstructorBadge: string;
  cardInstructorDescription: string;

  // Instructor Form
  instructorAuthTitle: string;
  instructorAuthSubtitle: string;
  instructorKeyLabel: string;
  instructorKeyPlaceholder: string;
  instructorKeyError: string;
  verifyingKey: string;
  unlockInstructorAccess: string;
  instructorHint: string;

  // Apprentice Form
  characterizationTitle: string;
  characterizationSubtitle: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  docTypeLabel: string;
  docNumberLabel: string;
  docNumberPlaceholder: string;
  regionalLabel: string;
  centerLabel: string;
  programLabel: string;
  programPlaceholder: string;
  fichaLabel: string;
  fichaPlaceholder: string;
  modalityLabel: string;
  jornadaLabel: string;
  submittingAprendiz: string;
  startInductionButton: string;
  autoSyncNotice: string;
  fillRequiredError: string;

  // Footer
  footerText: string;

  // Modalities & Shifts
  presencial: string;
  virtual: string;
  distancia: string;
  diurna: string;
  nocturna: string;
  mixta: string;
  madrugada: string;

  // Hero Section & Quick Stats
  inductionTitle: string;
  inductionSubtitle: string;
  overallProgress: string;
  xpPoints: string;
  dayStreak: string;
  modulesCompleted: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    // Common / Navbar
    brandTitle: 'SENA · Inducción Interactiva',
    brandSubtitle: 'Plataforma de Inducción Formativa Integral · Ac. 0009 de 2024',
    republicOfColombia: 'República de Colombia',
    roleInstructor: 'Perfil: Instructor',
    roleAprendiz: 'Perfil: Aprendiz',
    changeRoleOrExit: 'Cambiar Rol / Salir',
    instructorDashboard: 'Panel Instructor',
    learningRoute: 'Ruta Formativa',
    rightsAndDuties: 'Derechos y Deberes',
    simulator: 'Simulador de Casos',
    quiz: 'Evaluación',
    plan4Phases: 'Plan 4 Fases',
    certificate: 'Certificado',
    darkModeLight: 'Cambiar a Modo Claro',
    darkModeDark: 'Cambiar a Modo Oscuro',
    languageButtonLabel: 'ES',
    toggleLanguageTooltip: 'Cambiar idioma a Inglés (EN)',

    // Video Tutorial
    videoTutorialTitle: 'Video Tutorial: Guía de Inducción SENA',
    videoTutorialSubtitle: 'Manual de uso de la plataforma formativa integral (audio y controles incluidos)',
    videoTutorialBadge: 'Oficial',
    openFloatingWindow: 'Ventana Flotante / PiP',
    floatingPiPTitle: 'Guía de Inducción SENA · Video Tutorial Oficial',
    minimizedPiP: 'Ver en Ventana Flotante (PiP)',
    copyLink: 'Copiar Enlace',
    linkCopied: '¡Copiado!',
    videoSettings: 'Configurar Enlace',
    videoDrivePlaceholder: 'Ingresa enlace de Google Drive o video',
    restoreOfficialVideo: 'Restaurar video oficial SENA',
    saveAndLoad: 'Guardar y Cargar',
    activeControlsNotice: 'Controles multimedia activos · Usa la barra para reproducir, pausar, volumen y pantalla completa.',
    embeddedVideoFootnote: 'Aprende cómo caracterizarte, realizar los 8 módulos y certificarte.',
    fullscreenOrFloating: 'Ver en pantalla completa / flotante →',
    floatingButtonLabel: 'Tutorial en Video',

    // Landing Page
    secureAccessBadge: 'Acceso Seguro y Diferenciado por Rol',
    landingHeadline: '¿Cómo deseas ingresar a la plataforma?',
    landingDescription: 'Selecciona tu rol para acceder a tu entorno correspondiente. Los instructores cuentan con acceso protegido para gestión y seguimiento, mientras que los aprendices completan sus datos de caracterización para iniciar su inducción.',
    firstTimeVideoCta: '¿Primera vez? Mira el Video Tutorial de Inducción',
    firstTimeVideoCtaSub: 'Haz clic para reproducir la guía paso a paso en una ventana flotante con controles',

    // Apprentice Card
    cardAprendizTitle: 'Soy Aprendiz SENA',
    cardAprendizBadge: 'Sin Clave Requerida',
    cardAprendizDescription: 'Ingresa tus datos de caracterización para realizar los módulos, simulador de casos y obtener tu certificado oficial.',

    // Instructor Card
    cardInstructorTitle: 'Soy Instructor SENA',
    cardInstructorBadge: 'Requiere Clave',
    cardInstructorDescription: 'Acceso al panel de seguimiento de cohorte, sincronización en Google Drive y generación de enlaces de inducción.',

    // Instructor Form
    instructorAuthTitle: 'Autenticación de Instructor SENA',
    instructorAuthSubtitle: 'Ingresa la clave institucional asignada para desbloquear privilegios de instructor.',
    instructorKeyLabel: 'Clave de Acceso Institucional',
    instructorKeyPlaceholder: 'Ingresa la clave institucional (ej: sena 1234)',
    instructorKeyError: 'Clave de acceso incorrecta. Verifique sus credenciales institucionales.',
    verifyingKey: 'Validando credenciales...',
    unlockInstructorAccess: 'Desbloquear Privilegios de Instructor',
    instructorHint: 'Clave de prueba institucional: sena 1234',

    // Apprentice Form
    characterizationTitle: 'Caracterización del Aprendiz SENA',
    characterizationSubtitle: 'Diligencia tus datos para personalizar tu inducción y generar tu certificado oficial al culminar.',
    fullNameLabel: 'Nombre Completo',
    fullNamePlaceholder: 'Ej: María Camila González Gómez',
    docTypeLabel: 'Tipo de Documento',
    docNumberLabel: 'Número de Documento',
    docNumberPlaceholder: 'Ej: 1020304050',
    regionalLabel: 'Regional SENA',
    centerLabel: 'Centro de Formación',
    programLabel: 'Programa de Formación',
    programPlaceholder: 'Ej: Análisis y Desarrollo de Software',
    fichaLabel: 'Número de Ficha de Caracterización',
    fichaPlaceholder: 'Ej: 2826749',
    modalityLabel: 'Modalidad de Formación',
    jornadaLabel: 'Jornada',
    submittingAprendiz: 'Registrando caracterización...',
    startInductionButton: 'Comenzar Inducción SENA',
    autoSyncNotice: 'Tu avance y calificaciones se sincronizarán automáticamente con la hoja de tu instructor.',
    fillRequiredError: 'Por favor completa todos los campos requeridos.',

    // Footer
    footerText: 'Servicio Nacional de Aprendizaje - SENA · Formación Profesional Integral · República de Colombia',

    // Modalities & Shifts
    presencial: 'Presencial',
    virtual: 'Virtual',
    distancia: 'A Distancia',
    diurna: 'Diurna',
    nocturna: 'Nocturna',
    mixta: 'Mixta / Fines de Semana',
    madrugada: 'Madrugada',

    // Hero Section & Quick Stats
    inductionTitle: 'Inducción Integral SENA 2024',
    inductionSubtitle: 'Reglamento del Aprendiz · Acuerdo 0009 de 2024',
    overallProgress: 'Progreso General',
    xpPoints: 'Puntos de Experiencia',
    dayStreak: 'Días de Racha',
    modulesCompleted: 'Módulos Completados',
  },

  en: {
    // Common / Navbar
    brandTitle: 'SENA · Interactive Induction',
    brandSubtitle: 'Comprehensive Vocational Induction Platform · Agreement 0009 of 2024',
    republicOfColombia: 'Republic of Colombia',
    roleInstructor: 'Role: Instructor',
    roleAprendiz: 'Role: Apprentice',
    changeRoleOrExit: 'Change Role / Exit',
    instructorDashboard: 'Instructor Dashboard',
    learningRoute: 'Learning Route',
    rightsAndDuties: 'Rights & Duties',
    simulator: 'Case Simulator',
    quiz: 'Final Quiz',
    plan4Phases: '4-Phase Plan',
    certificate: 'Certificate',
    darkModeLight: 'Switch to Light Mode',
    darkModeDark: 'Switch to Dark Mode',
    languageButtonLabel: 'EN',
    toggleLanguageTooltip: 'Switch language to Spanish (ES)',

    // Video Tutorial
    videoTutorialTitle: 'Video Tutorial: SENA Induction Guide',
    videoTutorialSubtitle: 'Comprehensive induction manual with audio narration & full playback controls',
    videoTutorialBadge: 'Official',
    openFloatingWindow: 'Floating Window / PiP',
    floatingPiPTitle: 'SENA Induction Guide · Official Video Tutorial',
    minimizedPiP: 'Watch in Floating Window (PiP)',
    copyLink: 'Copy Link',
    linkCopied: 'Copied!',
    videoSettings: 'Configure Source',
    videoDrivePlaceholder: 'Enter Google Drive or video link',
    restoreOfficialVideo: 'Restore official SENA video',
    saveAndLoad: 'Save & Load',
    activeControlsNotice: 'Active media controls · Use bar to play, pause, seek, adjust volume and fullscreen.',
    embeddedVideoFootnote: 'Learn how to characterize, complete the 8 modules, and get certified.',
    fullscreenOrFloating: 'Watch fullscreen / floating →',
    floatingButtonLabel: 'Video Tutorial',

    // Landing Page
    secureAccessBadge: 'Secure Role-Differentiated Access',
    landingHeadline: 'How would you like to enter the platform?',
    landingDescription: 'Select your role to access your designated environment. Instructors have protected access for cohort tracking and configuration, while apprentices complete their profile to begin induction.',
    firstTimeVideoCta: 'First time here? Watch the Induction Video Tutorial',
    firstTimeVideoCtaSub: 'Click to play the step-by-step guide in a floating window with controls',

    // Apprentice Card
    cardAprendizTitle: 'I am a SENA Apprentice',
    cardAprendizBadge: 'No Password Required',
    cardAprendizDescription: 'Enter your profile information to access modules, case simulator, and earn your official certificate.',

    // Instructor Card
    cardInstructorTitle: 'I am a SENA Instructor',
    cardInstructorBadge: 'Password Required',
    cardInstructorDescription: 'Access cohort progress tracking, Google Drive auto-sync, and manage induction links.',

    // Instructor Form
    instructorAuthTitle: 'SENA Instructor Authentication',
    instructorAuthSubtitle: 'Enter the assigned institutional password to unlock instructor privileges.',
    instructorKeyLabel: 'Institutional Access Password',
    instructorKeyPlaceholder: 'Enter institutional password (e.g., sena 1234)',
    instructorKeyError: 'Incorrect access password. Please verify institutional credentials.',
    verifyingKey: 'Validating credentials...',
    unlockInstructorAccess: 'Unlock Instructor Privileges',
    instructorHint: 'Institutional test password: sena 1234',

    // Apprentice Form
    characterizationTitle: 'SENA Apprentice Characterization',
    characterizationSubtitle: 'Fill in your details to customize your induction route and generate your official certificate upon completion.',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'E.g., Maria Camila Gonzalez Gomez',
    docTypeLabel: 'Document Type',
    docNumberLabel: 'Document Number',
    docNumberPlaceholder: 'E.g., 1020304050',
    regionalLabel: 'SENA Regional Branch',
    centerLabel: 'Training Center',
    programLabel: 'Training Program',
    programPlaceholder: 'E.g., Software Analysis and Development',
    fichaLabel: 'Cohort / Cohort ID (Ficha)',
    fichaPlaceholder: 'E.g., 2826749',
    modalityLabel: 'Training Modality',
    jornadaLabel: 'Shift / Schedule',
    submittingAprendiz: 'Registering profile...',
    startInductionButton: 'Start SENA Induction',
    autoSyncNotice: 'Your progress and evaluation scores will automatically sync to your instructor\'s spreadsheet.',
    fillRequiredError: 'Please complete all required fields.',

    // Footer
    footerText: 'National Training Service - SENA · Comprehensive Vocational Training · Republic of Colombia',

    // Modalities & Shifts
    presencial: 'On-site / In-person',
    virtual: 'Virtual / Online',
    distancia: 'Distance Learning',
    diurna: 'Daytime',
    nocturna: 'Evening / Night',
    mixta: 'Mixed / Weekend',
    madrugada: 'Overnight / Dawn',

    // Hero Section & Quick Stats
    inductionTitle: 'SENA Comprehensive Induction 2024',
    inductionSubtitle: 'Apprentice Regulations · Agreement 0009 of 2024',
    overallProgress: 'Overall Progress',
    xpPoints: 'Experience Points',
    dayStreak: 'Day Streak',
    modulesCompleted: 'Completed Modules',
  },
};
