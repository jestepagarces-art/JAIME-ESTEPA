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
  footerRights: string;
  fpiBadge: string;
  lectivaProductiva: string;

  // Modalities & Shifts
  presencial: string;
  virtual: string;
  distancia: string;
  diurna: string;
  nocturna: string;
  mixta: string;
  madrugada: string;

  // Hero Section
  heroSenaTag: string;
  heroAgreementsTag: string;
  heroInductionHoursTag: string;
  heroTitle: string;
  heroSubtitle: string;
  apprenticeLabel: string;
  cohortLabel: string;
  modalityLabelShort: string;
  overallProgress: string;
  xpPoints: string;
  dayStreak: string;
  modulesCompleted: string;
  btnStartRoute: string;
  btnEvaluation: string;
  btnSimulator: string;
  certifiedStatus: string;
  pendingStatus: string;

  // Badges & Mastery Strip
  badgesTitle: string;
  badgesUnlockedText: string;
  badgeUnlockedLabel: string;

  // Instructor Preview Banner
  previewBannerText: string;
  previewBannerReturnBtn: string;

  // Unearned Certificate Card
  certificateLockedTitle: string;
  certificateLockedDescription: string;
  btnGoToQuiz: string;

  // Rights & Duties Comparison Section
  comparativeTitleTag: string;
  comparativeCatalogTitle: string;
  fundamentalRightsTitle: string;
  essentialDutiesTitle: string;

  // Floating Mentor Button
  askSofiaTitle: string;
  askSofiaSubtitle: string;
  askSofiaTooltip: string;

  // Learning Modules View
  modulesViewTitle: string;
  modulesViewSubtitle: string;
  searchModulesPlaceholder: string;
  catAll: string;
  catIdentity: string;
  catRights: string;
  catDuties: string;
  catProhibitions: string;
  catOffenses: string;
  catPracticum: string;
  readTimeMins: string;
  moduleCompletedBadge: string;
  modulePendingBadge: string;
  btnReadModule: string;
  btnMarkCompleted: string;
  btnModuleCompletedDone: string;
  btnClassifierShortcut: string;
  btnSimulatorShortcut: string;
  modalExecutiveSummary: string;
  modalArticlesKeyPoints: string;
  modalDidYouKnow: string;
  modalPracticalTip: string;
  modalClose: string;

  // Rights & Duties Classifier View
  classifierBadge: string;
  classifierTitle: string;
  classifierSubtitle: string;
  itemCounterLabel: string;
  scoreLabel: string;
  accuracyLabel: string;
  btnIsRight: string;
  btnIsDuty: string;
  btnNextItem: string;
  btnRestartClassifier: string;
  correctAnswerTitle: string;
  incorrectAnswerTitle: string;
  legalBasisLabel: string;
  classifierCompletedTitle: string;
  classifierCompletedDesc: string;

  // Case Simulator View
  simulatorBadge: string;
  simulatorTitle: string;
  simulatorSubtitle: string;
  dilemmaSituationTitle: string;
  characterLabel: string;
  roleLabel: string;
  questionWhatDecision: string;
  decisionOutcomeTitle: string;
  legalAnalysisTitle: string;
  btnResetChoice: string;
  btnCaseSolved: string;

  // Gamified Quiz View
  quizBadge: string;
  quizTitle: string;
  quizSubtitle: string;
  quizQuestionCounter: string;
  activeStreakLabel: string;
  quizPassingNotice: string;
  btnNextQuestion: string;
  quizSuccessTitle: string;
  quizFailTitle: string;
  quizFinalScoreLabel: string;
  quizMinRequiredLabel: string;
  btnViewCertificate: string;
  btnRetryQuiz: string;

  // 4-Phase Structured Plan View
  planViewBadge: string;
  planViewTitle: string;
  planViewSubtitle: string;
  planGoalLabel: string;
  planActivitiesLabel: string;
  planDeliverableLabel: string;
  planLegalBasisLabel: string;
  btnStartPlanInduction: string;

  // Certificate View
  certSenaHeader: string;
  certSubheader: string;
  certConfersTo: string;
  certDocumentLabel: string;
  certFichaLabel: string;
  certCenterLabel: string;
  certProgramLabel: string;
  certBodyText: string;
  certIntensityLabel: string;
  certIntensityValue: string;
  certScoreLabel: string;
  certIssueDateLabel: string;
  certVerificationCodeLabel: string;
  btnPrintCertificate: string;
  btnCopyVerificationCode: string;
  btnCodeCopied: string;
  btnEditApprenticeProfile: string;

  // Instructor Dashboard View
  dashTitle: string;
  dashSubtitle: string;
  dashTotalLearners: string;
  dashCertifiedLearners: string;
  dashAverageScore: string;
  dashDriveSyncStatus: string;
  dashBtnSyncDrive: string;
  dashBtnLearnerView: string;
  dashBtnExportCsv: string;
  dashColLearner: string;
  dashColDoc: string;
  dashColFicha: string;
  dashColProgress: string;
  dashColScore: string;
  dashColStatus: string;
  dashColCertificate: string;
  dashPassedStatus: string;
  dashInTrainingStatus: string;

  // Modals
  profileModalTitle: string;
  profileModalSubtitle: string;
  btnSaveProfile: string;
  sofiaModalTitle: string;
  sofiaModalSubtitle: string;
  sofiaInputPlaceholder: string;
  sofiaSendBtn: string;
  sofiaQuickPromptsTitle: string;
  driveModalTitle: string;
  driveModalSubtitle: string;
  driveAutoSyncActive: string;
  btnManualSyncNow: string;
  driveSyncedSuccess: string;
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
    footerRights: 'Reglamento del Aprendiz SENA · Acuerdo 0009 de 2024 & Acuerdo 002 de 2026 · República de Colombia',
    fpiBadge: 'Formación Profesional Integral',
    lectivaProductiva: 'Etapa Lectiva y Productiva',

    // Modalities & Shifts
    presencial: 'Presencial',
    virtual: 'Virtual',
    distancia: 'A Distancia',
    diurna: 'Diurna',
    nocturna: 'Nocturna',
    mixta: 'Mixta / Fines de Semana',
    madrugada: 'Madrugada',

    // Hero Section
    heroSenaTag: 'Servicio Nacional de Aprendizaje',
    heroAgreementsTag: 'Acuerdo 0009 de 2024 & Acuerdo 002 de 2026',
    heroInductionHoursTag: 'Inducción Institucional 40 Horas',
    heroTitle: 'Ruta de Inducción y Reglamento del Aprendiz',
    heroSubtitle: 'Apropia tus derechos, deberes, prohibiciones y alternativas de etapa productiva en el SENA. Aprende con simulaciones de casos reales, desafía tus conocimientos de forma gamificada y obtén tu certificación institucional oficial.',
    apprenticeLabel: 'Aprendiz',
    cohortLabel: 'Ficha',
    modalityLabelShort: 'Modalidad',
    overallProgress: 'Progreso General',
    xpPoints: 'Puntos de Experiencia',
    dayStreak: 'Días de Racha',
    modulesCompleted: 'Módulos Completados',
    btnStartRoute: 'Iniciar Ruta Formativa',
    btnEvaluation: 'Evaluación Gamificada',
    btnSimulator: 'Simulador de Casos',
    certifiedStatus: 'Certificado Desbloqueado',
    pendingStatus: 'En Progreso',

    // Badges & Mastery Strip
    badgesTitle: 'Insignias de Logro y Progresión',
    badgesUnlockedText: 'insignias desbloqueadas',
    badgeUnlockedLabel: '✓ Desbloqueada',

    // Instructor Preview Banner
    previewBannerText: 'Vista previa del Aprendiz: Estás explorando el contenido formativo tal como lo visualizan tus aprendices.',
    previewBannerReturnBtn: 'Volver al Panel del Instructor',

    // Unearned Certificate Card
    certificateLockedTitle: 'Certificado aún no desbloqueado',
    certificateLockedDescription: 'Para obtener tu constancia institucional de 40 Horas de Inducción SENA, debes rendir y aprobar la evaluación formativa gamificada con un puntaje mínimo del 70%.',
    btnGoToQuiz: 'Ir a la Evaluación Gamificada',

    // Rights & Duties Comparison Section
    comparativeTitleTag: 'Normatividad Comparativa Oficial',
    comparativeCatalogTitle: 'Catálogo de Derechos y Deberes (Acuerdo 0009 de 2024 & Ac. 002/2026)',
    fundamentalRightsTitle: 'Derechos Fundamentales del Aprendiz (Capítulo II · Artículo 7)',
    essentialDutiesTitle: 'Deberes y Prohibiciones Esenciales (Capítulos IV y V)',

    // Floating Mentor Button
    askSofiaTitle: 'Consultar a SofIA',
    askSofiaSubtitle: 'Dudas de Reglamento',
    askSofiaTooltip: 'Consultorio Normativo SENA con SofIA',

    // Learning Modules View
    modulesViewTitle: 'Ruta Formativa de Inducción SENA',
    modulesViewSubtitle: '8 Módulos basados en el Acuerdo 0009 de 2024 y Acuerdo 002 de 2026. Estudia cada capítulo para desbloquear tu certificación.',
    searchModulesPlaceholder: 'Buscar artículos, derechos, deberes, capítulos...',
    catAll: 'Todos los Capítulos',
    catIdentity: 'Identidad y Principios',
    catRights: 'Derechos',
    catDuties: 'Deberes',
    catProhibitions: 'Prohibiciones',
    catOffenses: 'Faltas y Sanciones',
    catPracticum: 'Etapa Productiva',
    readTimeMins: 'minutos de lectura',
    moduleCompletedBadge: 'Completado',
    modulePendingBadge: 'Por Iniciar',
    btnReadModule: 'Leer y Estudiar Módulo',
    btnMarkCompleted: 'Marcar como Completado (+50 XP)',
    btnModuleCompletedDone: 'Módulo Completado ✓',
    btnClassifierShortcut: 'Ir al Clasificador de Derechos',
    btnSimulatorShortcut: 'Ir al Simulador de Casos',
    modalExecutiveSummary: 'Resumen Ejecutivo del Capítulo',
    modalArticlesKeyPoints: 'Artículos y Puntos Clave del Reglamento',
    modalDidYouKnow: '¿Sabías que?',
    modalPracticalTip: 'Tip Práctico del Instructor SENA',
    modalClose: 'Cerrar Lectura',

    // Rights & Duties Classifier View
    classifierBadge: 'Gamificación Normativa · +25 XP por acierto',
    classifierTitle: 'Clasificador Rápido: ¿Derecho o Deber?',
    classifierSubtitle: 'Pon a prueba tu conocimiento clasificando si el enunciado corresponde a un Derecho garantizado o a un Deber obligatorio del aprendiz según el Acuerdo 0009 de 2024.',
    itemCounterLabel: 'Elemento',
    scoreLabel: 'Aciertos:',
    accuracyLabel: 'Efectividad:',
    btnIsRight: 'Es un Derecho del Aprendiz',
    btnIsDuty: 'Es un Deber u Obligación',
    btnNextItem: 'Siguiente Elemento →',
    btnRestartClassifier: 'Reiniciar Desafío',
    correctAnswerTitle: '¡Correcto!',
    incorrectAnswerTitle: '¡Incorrecto!',
    legalBasisLabel: 'Fundamento Normativo:',
    classifierCompletedTitle: '¡Felicitaciones! Has completado el clasificador normativo',
    classifierCompletedDesc: 'Dominaste la distinción entre derechos fundamentales y deberes formativos del Reglamento del Aprendiz SENA.',

    // Case Simulator View
    simulatorBadge: 'Simulador de Casos y Comités · Dilemas Reales · Debido Proceso',
    simulatorTitle: 'Simulador: Toma de Decisiones y Comité de Evaluación',
    simulatorSubtitle: 'Enfréntate a situaciones reales que ocurren en los centros de formación: plagio, inasistencias por salud, normas SST y convivencia. Elige con base en el Reglamento.',
    dilemmaSituationTitle: 'Situación Planteada:',
    characterLabel: 'Personaje:',
    roleLabel: 'Rol:',
    questionWhatDecision: '¿Qué decisión deberías tomar según el Reglamento?',
    decisionOutcomeTitle: 'Resultado de tu decisión:',
    legalAnalysisTitle: 'Análisis Jurídico y Normativo:',
    btnResetChoice: 'Explorar otra opción',
    btnCaseSolved: 'Caso Resuelto Correctamente ✓',

    // Gamified Quiz View
    quizBadge: 'Evaluación Formativa Institucional 40 Horas · Mínimo Aprobatorio 70%',
    quizTitle: 'Evaluación Gamificada del Reglamento SENA',
    quizSubtitle: 'Demuestra tu apropiación del Acuerdo 0009 de 2024 y Acuerdo 002 de 2026 para obtener tu constancia institucional de inducción.',
    quizQuestionCounter: 'Pregunta',
    activeStreakLabel: 'Racha Activa:',
    quizPassingNotice: 'Para certificarte debes alcanzar un porcentaje mínimo del 70%. Tienes intentos ilimitados con retroalimentación inmediata.',
    btnNextQuestion: 'Siguiente Pregunta →',
    quizSuccessTitle: '¡Felicitaciones! Has Aprobado la Evaluación',
    quizFailTitle: 'Evaluación Finalizada · Aún no alcanzas el 70%',
    quizFinalScoreLabel: 'Puntaje Obtenido:',
    quizMinRequiredLabel: 'Requisito mínimo aprobatorio: 70%',
    btnViewCertificate: 'Ver Mi Certificado Oficial →',
    btnRetryQuiz: 'Reintentar Evaluación',

    // 4-Phase Structured Plan View
    planViewBadge: 'Estructura Curricular Oficial · Acuerdo 0009 de 2024',
    planViewTitle: 'Plan Estructurado de Inducción (4 Fases · 40 Horas)',
    planViewSubtitle: 'Ruta pedagógica paso a paso diseñada para asegurar la apropiación integral del entorno formativo, normativo y productivo.',
    planGoalLabel: 'Propósito Formativo:',
    planActivitiesLabel: 'Actividades Clave Desarrolladas:',
    planDeliverableLabel: 'Entregable / Evidencia:',
    planLegalBasisLabel: 'Fundamento Legal:',
    btnStartPlanInduction: 'Comenzar Ruta de Módulos',

    // Certificate View
    certSenaHeader: 'SERVICIO NACIONAL DE APRENDIZAJE - SENA',
    certSubheader: 'DIRECCIÓN DE FORMACIÓN PROFESIONAL · REPÚBLICA DE COLOMBIA',
    certConfersTo: 'HACE CONSTAR QUE:',
    certDocumentLabel: 'Documento:',
    certFichaLabel: 'Ficha:',
    certCenterLabel: 'Centro:',
    certProgramLabel: 'Programa:',
    certBodyText: 'Ha culminado y aprobado con éxito la Inducción Institucional Integral al Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024 y actualización Acuerdo 002 de 2026), cumpliendo con los estándares de formación integral, apropiación normativa y valores ciudadanos.',
    certIntensityLabel: 'Intensidad Horaria:',
    certIntensityValue: '40 Horas Formativas',
    certScoreLabel: 'Puntaje Obtenido:',
    certIssueDateLabel: 'Fecha de Expedición:',
    certVerificationCodeLabel: 'Código de Verificación QR:',
    btnPrintCertificate: 'Imprimir / Guardar en PDF',
    btnCopyVerificationCode: 'Copiar Código de Verificación',
    btnCodeCopied: '¡Código Copiado!',
    btnEditApprenticeProfile: 'Editar Datos del Perfil',

    // Instructor Dashboard View
    dashTitle: 'Panel de Gestión y Seguimiento del Instructor',
    dashSubtitle: 'Monitoreo en tiempo real de aprendices, control de avance por fichas y sincronización automática en Google Drive.',
    dashTotalLearners: 'Total Aprendices Registrados',
    dashCertifiedLearners: 'Certificados Aprobados',
    dashAverageScore: 'Promedio General',
    dashDriveSyncStatus: 'Sincronización Drive / Sheets',
    dashBtnSyncDrive: 'Sincronizar con Google Drive',
    dashBtnLearnerView: 'Ver Modo Aprendiz',
    dashBtnExportCsv: 'Exportar Reporte Excel / CSV',
    dashColLearner: 'Aprendiz',
    dashColDoc: 'Documento',
    dashColFicha: 'Ficha',
    dashColProgress: 'Progreso',
    dashColScore: 'Puntaje Obtenido',
    dashColStatus: 'Estado',
    dashColCertificate: 'Certificado',
    dashPassedStatus: 'Aprobado (100%)',
    dashInTrainingStatus: 'En Formación',

    // Modals
    profileModalTitle: 'Perfil del Aprendiz SENA',
    profileModalSubtitle: 'Actualiza tus datos personales y de caracterización institucional.',
    btnSaveProfile: 'Guardar Perfil Actualizado',
    sofiaModalTitle: 'SofIA · Asesora Normativa SENA',
    sofiaModalSubtitle: 'Consultorio interactivo sobre el Reglamento del Aprendiz (Ac. 0009 de 2024)',
    sofiaInputPlaceholder: 'Escribe tu consulta sobre derechos, deberes, comités, inasistencias...',
    sofiaSendBtn: 'Consultar',
    sofiaQuickPromptsTitle: 'Consultas Frecuentes:',
    driveModalTitle: 'Sincronización con Google Drive & Google Sheets',
    driveModalSubtitle: 'Respaldo y reporte automático de aprendices en la hoja de cálculo del instructor',
    driveAutoSyncActive: 'Sincronización en tiempo real activa',
    btnManualSyncNow: 'Forzar Sincronización Inmediata',
    driveSyncedSuccess: '¡Datos sincronizados exitosamente con Google Sheets!',
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
    footerRights: 'SENA Apprentice Regulations · Agreement 0009 of 2024 & Agreement 002 of 2026 · Republic of Colombia',
    fpiBadge: 'Comprehensive Vocational Training',
    lectivaProductiva: 'Academic and Productive Stages',

    // Modalities & Shifts
    presencial: 'On-site / In-person',
    virtual: 'Virtual / Online',
    distancia: 'Distance Learning',
    diurna: 'Daytime',
    nocturna: 'Evening / Night',
    mixta: 'Mixed / Weekend',
    madrugada: 'Overnight / Dawn',

    // Hero Section
    heroSenaTag: 'National Training Service',
    heroAgreementsTag: 'Agreement 0009 of 2024 & Agreement 002 of 2026',
    heroInductionHoursTag: '40-Hour Institutional Induction',
    heroTitle: 'Induction Route & Apprentice Regulations',
    heroSubtitle: 'Internalize your rights, duties, prohibitions, and productive stage alternatives at SENA. Learn through real-world case simulations, challenge your knowledge gamified, and earn your official institutional certificate.',
    apprenticeLabel: 'Apprentice',
    cohortLabel: 'Cohort ID',
    modalityLabelShort: 'Modality',
    overallProgress: 'Overall Progress',
    xpPoints: 'Experience Points',
    dayStreak: 'Day Streak',
    modulesCompleted: 'Completed Modules',
    btnStartRoute: 'Start Learning Route',
    btnEvaluation: 'Gamified Quiz',
    btnSimulator: 'Case Simulator',
    certifiedStatus: 'Certificate Unlocked',
    pendingStatus: 'In Progress',

    // Badges & Mastery Strip
    badgesTitle: 'Achievement and Progression Badges',
    badgesUnlockedText: 'badges unlocked',
    badgeUnlockedLabel: '✓ Unlocked',

    // Instructor Preview Banner
    previewBannerText: 'Apprentice Preview Mode: You are exploring the induction content exactly as your apprentices see it.',
    previewBannerReturnBtn: 'Back to Instructor Dashboard',

    // Unearned Certificate Card
    certificateLockedTitle: 'Certificate Not Yet Unlocked',
    certificateLockedDescription: 'To earn your institutional 40-Hour SENA Induction Certificate, you must take and pass the gamified evaluation with a minimum score of 70%.',
    btnGoToQuiz: 'Go to Gamified Quiz',

    // Rights & Duties Comparison Section
    comparativeTitleTag: 'Official Comparative Framework',
    comparativeCatalogTitle: 'Catalog of Rights and Duties (Agreement 0009 of 2024 & Agr. 002/2026)',
    fundamentalRightsTitle: 'Apprentice Fundamental Rights (Chapter II · Article 7)',
    essentialDutiesTitle: 'Essential Duties and Prohibitions (Chapters IV & V)',

    // Floating Mentor Button
    askSofiaTitle: 'Consult SofIA',
    askSofiaSubtitle: 'Regulation Guidance',
    askSofiaTooltip: 'SENA Regulatory Assistant SofIA',

    // Learning Modules View
    modulesViewTitle: 'SENA Induction Learning Route',
    modulesViewSubtitle: '8 Modules based on Agreement 0009 of 2024 and Agreement 002 of 2026. Study each chapter to unlock your certification.',
    searchModulesPlaceholder: 'Search articles, rights, duties, chapters...',
    catAll: 'All Chapters',
    catIdentity: 'Identity & Principles',
    catRights: 'Rights',
    catDuties: 'Duties',
    catProhibitions: 'Prohibitions',
    catOffenses: 'Offenses & Sanctions',
    catPracticum: 'Productive Stage',
    readTimeMins: 'mins read',
    moduleCompletedBadge: 'Completed',
    modulePendingBadge: 'Not Started',
    btnReadModule: 'Read & Study Module',
    btnMarkCompleted: 'Mark as Completed (+50 XP)',
    btnModuleCompletedDone: 'Module Completed ✓',
    btnClassifierShortcut: 'Go to Rights Classifier',
    btnSimulatorShortcut: 'Go to Case Simulator',
    modalExecutiveSummary: 'Executive Chapter Summary',
    modalArticlesKeyPoints: 'Regulations Articles & Key Highlights',
    modalDidYouKnow: 'Did you know?',
    modalPracticalTip: 'SENA Instructor Practical Tip',
    modalClose: 'Close Reading',

    // Rights & Duties Classifier View
    classifierBadge: 'Regulatory Gamification · +25 XP per correct answer',
    classifierTitle: 'Quick Classifier: Right or Duty?',
    classifierSubtitle: 'Test your understanding by classifying whether each statement represents a guaranteed Right or a mandatory Duty under Agreement 0009 of 2024.',
    itemCounterLabel: 'Item',
    scoreLabel: 'Correct:',
    accuracyLabel: 'Accuracy:',
    btnIsRight: 'It is an Apprentice Right',
    btnIsDuty: 'It is a Mandatory Duty',
    btnNextItem: 'Next Item →',
    btnRestartClassifier: 'Restart Challenge',
    correctAnswerTitle: 'Correct!',
    incorrectAnswerTitle: 'Incorrect!',
    legalBasisLabel: 'Legal Basis:',
    classifierCompletedTitle: 'Congratulations! You completed the regulatory classifier',
    classifierCompletedDesc: 'You mastered distinguishing between fundamental rights and vocational duties of the SENA Apprentice Regulations.',

    // Case Simulator View
    simulatorBadge: 'Case & Committee Simulator · Real Dilemmas · Due Process',
    simulatorTitle: 'Simulator: Decision Making & Evaluation Committee',
    simulatorSubtitle: 'Face real situations happening in training centers: plagiarism, medical absences, OSH standards, and campus coexistence. Decide based on regulations.',
    dilemmaSituationTitle: 'Case Scenario:',
    characterLabel: 'Character:',
    roleLabel: 'Role:',
    questionWhatDecision: 'What decision should you make according to the Regulations?',
    decisionOutcomeTitle: 'Decision Outcome:',
    legalAnalysisTitle: 'Legal & Normative Analysis:',
    btnResetChoice: 'Explore another choice',
    btnCaseSolved: 'Case Solved Correctly ✓',

    // Gamified Quiz View
    quizBadge: '40-Hour Institutional Induction Quiz · Minimum Passing Score 70%',
    quizTitle: 'SENA Regulations Gamified Quiz',
    quizSubtitle: 'Demonstrate your mastery of Agreement 0009 of 2024 and Agreement 002 of 2026 to obtain your official induction certificate.',
    quizQuestionCounter: 'Question',
    activeStreakLabel: 'Active Streak:',
    quizPassingNotice: 'You need at least 70% to earn your certificate. Unlimited attempts with immediate explanation feedback.',
    btnNextQuestion: 'Next Question →',
    quizSuccessTitle: 'Congratulations! You Passed the Evaluation',
    quizFailTitle: 'Evaluation Completed · Score below 70%',
    quizFinalScoreLabel: 'Score Achieved:',
    quizMinRequiredLabel: 'Minimum required score: 70%',
    btnViewCertificate: 'View My Official Certificate →',
    btnRetryQuiz: 'Retry Evaluation',

    // 4-Phase Structured Plan View
    planViewBadge: 'Official Curricular Structure · Agreement 0009 of 2024',
    planViewTitle: 'Structured Induction Plan (4 Phases · 40 Hours)',
    planViewSubtitle: 'Step-by-step pedagogical roadmap designed to ensure comprehensive assimilation of training, regulatory, and practical stages.',
    planGoalLabel: 'Learning Purpose:',
    planActivitiesLabel: 'Key Developed Activities:',
    planDeliverableLabel: 'Deliverable / Evidence:',
    planLegalBasisLabel: 'Legal Basis:',
    btnStartPlanInduction: 'Start Modules Route',

    // Certificate View
    certSenaHeader: 'NATIONAL TRAINING SERVICE - SENA',
    certSubheader: 'VOCATIONAL TRAINING DIRECTORATE · REPUBLIC OF COLOMBIA',
    certConfersTo: 'HEREBY CERTIFIES THAT:',
    certDocumentLabel: 'Document ID:',
    certFichaLabel: 'Cohort ID (Ficha):',
    certCenterLabel: 'Training Center:',
    certProgramLabel: 'Program:',
    certBodyText: 'Has successfully completed and approved the Comprehensive Institutional Induction to the SENA Apprentice Regulations (Agreement 0009 of 2024 and update Agreement 002 of 2026), meeting all standards of vocational training, regulatory mastery, and citizenship values.',
    certIntensityLabel: 'Duration / Workload:',
    certIntensityValue: '40 Vocational Hours',
    certScoreLabel: 'Score Achieved:',
    certIssueDateLabel: 'Issue Date:',
    certVerificationCodeLabel: 'QR Verification Code:',
    btnPrintCertificate: 'Print / Save as PDF',
    btnCopyVerificationCode: 'Copy Verification Code',
    btnCodeCopied: 'Code Copied!',
    btnEditApprenticeProfile: 'Edit Profile Information',

    // Instructor Dashboard View
    dashTitle: 'Instructor Management & Follow-up Dashboard',
    dashSubtitle: 'Real-time learner monitoring, cohort progress oversight, and automatic Google Drive synchronization.',
    dashTotalLearners: 'Total Registered Apprentices',
    dashCertifiedLearners: 'Approved Certificates',
    dashAverageScore: 'Cohort Average Score',
    dashDriveSyncStatus: 'Drive / Sheets Auto-Sync',
    dashBtnSyncDrive: 'Sync with Google Drive',
    dashBtnLearnerView: 'View as Apprentice',
    dashBtnExportCsv: 'Export Excel / CSV Report',
    dashColLearner: 'Apprentice',
    dashColDoc: 'Document',
    dashColFicha: 'Ficha',
    dashColProgress: 'Progress',
    dashColScore: 'Score Achieved',
    dashColStatus: 'Status',
    dashColCertificate: 'Certificate',
    dashPassedStatus: 'Passed (100%)',
    dashInTrainingStatus: 'In Training',

    // Modals
    profileModalTitle: 'SENA Apprentice Profile',
    profileModalSubtitle: 'Update your personal details and institutional characterization.',
    btnSaveProfile: 'Save Updated Profile',
    sofiaModalTitle: 'SofIA · SENA Regulatory Assistant',
    sofiaModalSubtitle: 'Interactive advisory on the Apprentice Regulations (Agr. 0009 of 2024)',
    sofiaInputPlaceholder: 'Ask a question about rights, duties, committees, absences...',
    sofiaSendBtn: 'Ask SofIA',
    sofiaQuickPromptsTitle: 'Frequent Inquiries:',
    driveModalTitle: 'Google Drive & Google Sheets Sync',
    driveModalSubtitle: 'Automatic cloud backup and spreadsheet reporting for instructors',
    driveAutoSyncActive: 'Real-time synchronization active',
    btnManualSyncNow: 'Force Immediate Sync',
    driveSyncedSuccess: 'Data successfully synchronized with Google Sheets!',
  },
};
