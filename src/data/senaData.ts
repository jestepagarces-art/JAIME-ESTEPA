import { ApprenticeProfile, ModuleItem, QuizQuestion, SimulationCase, InductionBadge } from '../types/induction';

export const DEFAULT_PROFILE: ApprenticeProfile = {
  fullName: 'Camila Andrea Rodríguez Parra',
  docType: 'CC',
  docNumber: '1020834921',
  regional: 'Regional Distrito Capital',
  center: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
  program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  ficha: '2874910',
  modality: 'Presencial',
  jornada: 'Diurna',
  startDate: '2026-02-01',
};

export const SENA_REGIONALES = [
  'Regional Distrito Capital',
  'Regional Antioquia',
  'Regional Valle del Cauca',
  'Regional Santander',
  'Regional Atlántico',
  'Regional Cundinamarca',
  'Regional Caldas',
  'Regional Boyacá',
  'Regional Bolívar',
  'Regional Nariño',
  'Regional Tolima',
  'Regional Huila',
  'Regional Risaralda',
  'Regional Meta',
  'Regional Cauca',
  'Regional Cesar',
  'Regional Córdoba',
  'Regional Norte de Santander',
  'Regional Quindío',
  'Regional Magdalena',
];

export const SENA_CENTROS: Record<string, string[]> = {
  'Regional Distrito Capital': [
    'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    'Centro de Tecnologías para la Construcción y la Madera',
    'Centro de Formación en Actividad Física y Cultura',
    'Centro de Servicios Financieros',
    'Centro Nacional de Hotelería, Turismo y Alimentos',
  ],
  'Regional Antioquia': [
    'Centro de Tecnología de la Manufactura Avanzada',
    'Centro de Servicios de Salud',
    'Centro de Formación en Diseño, Confección y Moda',
    'Centro de los Recursos Naturales Renovables La Salada',
  ],
  'Regional Valle del Cauca': [
    'Centro de Electricidad y Automatización Industrial (CEAI)',
    'Centro de la Construcción',
    'Centro de Gestión Tecnológica de Servicios',
    'Centro Agropecuario de Buga',
  ],
  'Regional Santander': [
    'Centro Industrial del Diseño y la Manufactura (CIDE)',
    'Centro de Servicios Empresariales y Turísticos',
    'Centro Agroturístico San Gil',
  ],
  'Regional Atlántico': [
    'Centro Nacional Colombo Alemán',
    'Centro de Comercio y Servicios',
    'Centro para el Desarrollo Agroecológico y Agroindustrial (CEDAGRO)',
  ],
};

export const POPULAR_PROGRAMS = [
  'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  'Tecnólogo en Gestión del Talento Humano',
  'Tecnólogo en Contabilización de Operaciones Comerciales y Financieras',
  'Tecnólogo en Mantenimiento Electromecánico Industrial',
  'Tecnólogo en Gestión Integrada de la Calidad, Medio Ambiente y SST',
  'Técnico en Sistemas e Instalación de Redes',
  'Técnico en Cocina y Servicios Gastronómicos',
  'Tecnólogo en Animación Digital y 3D',
  'Técnico en Asistencia Administrativa',
  'Tecnólogo en Gestión Logística y Cadena de Suministro',
];

// ==========================================
// 8 MÓDULOS ALINEADOS AL ACUERDO 0009 DE 2024
// (Y ACTUALIZACIÓN ACUERDO 002 DE 2026)
// ==========================================
export const INDUCTION_MODULES: ModuleItem[] = [
  {
    id: 'mod-1',
    chapterNumber: 1,
    title: 'Principios, Objeto y Enfoque Diferencial',
    shortDesc: 'Fundamentos del Acuerdo 0009 de 2024: dignidad humana, inclusión, territorialidad y sostenibilidad.',
    category: 'identidad',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulo I (Artículos 1 al 6)',
    readTimeMin: 6,
    summary: 'El nuevo Reglamento del Aprendiz SENA adopta un marco fundamentado en los derechos humanos, la dignidad de la persona, la inclusión social, el enfoque diferencial y territorial, y el desarrollo ambiental sostenible en toda Colombia.',
    articles: [
      {
        number: 'Art. 1-3',
        title: 'Objeto, Alcance y Definiciones Clave',
        description: 'Aplica a todas las personas matriculadas en programas de formación titulada o complementaria, en modalidades presencial, virtual o a distancia.',
        highlights: [
          'La Formación Profesional Integral (FPI) articula el Saber, el Saber Hacer y el Saber Ser.',
          'Derogatoria total de los antiguos Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.',
          'Principio de Gratuidad absoluta en todos los programas de formación que ofrece el SENA.',
        ],
      },
      {
        number: 'Art. 4-6',
        title: 'Principios Orientadores y Enfoque Diferencial',
        description: 'Garantía de equidad, reconocimiento de la diversidad cultural, étnica, de género y protección ambiental.',
        highlights: [
          'Dignidad Humana e Inclusión: libre desarrollo de la personalidad sin discriminación alguna.',
          'Enfoque Diferencial: adaptaciones curriculares y apoyos especiales para comunidades de especial protección.',
          'Desarrollo Sostenible: compromiso del aprendiz con la protección ecológica y el cuidado del entorno.',
        ],
      },
    ],
    didYouKnow: 'El Acuerdo 0009 de 2024 fue expedido tras un amplio proceso nacional de consulta pública con aprendices e instructores de todas las regiones de Colombia.',
    practicalTip: 'Desde el primer día, haz valer tu derecho a una inducción integral de 40 horas antes de dar inicio a las actividades curriculares específicas.',
  },
  {
    id: 'mod-2',
    chapterNumber: 2,
    title: 'Derechos del Aprendiz SENA',
    shortDesc: 'Catálogo de los 22 derechos oficiales: calidad, tecnología, EPP, bienestar, libre expresión y protección.',
    category: 'derechos',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulo II (Artículo 7)',
    readTimeMin: 8,
    summary: 'El Artículo 7 consagra 22 derechos esenciales para garantizar un proceso formativo digno, equitativo, seguro y con acceso oportuno a todos los recursos del SENA.',
    articles: [
      {
        number: 'Art. 7 Num. 1-6',
        title: 'Calidad, Ambientes y Recursos de Formación',
        description: 'Garantías para una formación técnica y tecnológica con estándares pedagógicos de excelencia.',
        highlights: [
          'Recibir una inducción institucional y técnica completa al ingresar al programa.',
          'Acceder a ambientes de aprendizaje equipados, insumos y tecnologías de la información.',
          'Recibir el carné institucional (físico o digital) vigente que lo acredita como aprendiz oficial.',
          'Dotación de Elementos de Protección Personal (EPP) y bioseguridad en talleres y laboratorios.',
        ],
      },
      {
        number: 'Art. 7 Num. 7-14',
        title: 'Bienestar, Inclusión y Libertad de Expresión',
        description: 'Servicios de apoyo biopsicosocial, libre desarrollo y protección integral.',
        highlights: [
          'Disfrutar de los programas de Bienestar al Aprendiz (salud preventiva, deporte, arte, cultura y consejería).',
          'Postularse a apoyos de sostenimiento (FIC, Regular o Monitorías) bajo criterios de equidad socioeconómica.',
          'Expresar libremente sus ideas y convicciones respetando la dignidad y los derechos de la comunidad.',
          'Recibir atención y acompañamiento institucional inmediato ante cualquier situación de acoso o discriminación.',
        ],
      },
      {
        number: 'Art. 7 Num. 15-22',
        title: 'Evaluación Justa, Segunda Revisión y Certificación',
        description: 'Transparencia pedagógica y garantías de debido proceso académico.',
        highlights: [
          'Conocer oportunamente las evaluaciones y retroalimentaciones dentro de los 8 días hábiles siguientes.',
          'Derecho a solicitar formalmente una segunda revisión o evaluación si no está conforme con el juicio emitido.',
          'Elegir y ser elegido democráticamente como Vocero de Ficha o Representante de Centro.',
          'Obtener la certificación oficial al aprobar la totalidad de resultados de aprendizaje lectivos y productivos.',
        ],
      },
    ],
    didYouKnow: 'En el Acuerdo 0009 de 2024, el derecho a la protección frente a cualquier forma de acoso laboral, sexual o matoneo fue elevado a garantía fundamental explícita con ruta de atención inmediata.',
    practicalTip: 'Si tienes dudas con un juicio de evaluación, radica tu solicitud respetuosa de segunda revisión ante la coordinación dentro de los 3 días siguientes a la publicación del juicio.',
  },
  {
    id: 'mod-3',
    chapterNumber: 3,
    title: 'Reconocimientos e Incentivos al Aprendiz',
    shortDesc: 'Estímulos por excelencia: menciones de honor, monitorías, becas y representación en eventos.',
    category: 'derechos',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulo III (Artículo 8)',
    readTimeMin: 5,
    summary: 'El SENA premia y exalta el mérito académico, la innovación, el liderazgo comunitario y la disciplina de sus aprendices mediante reconocimientos formativos institucionales.',
    articles: [
      {
        number: 'Art. 8 Lit. a-d',
        title: 'Incentivos Académicos y Menciones de Honor',
        description: 'Reconocimientos oficiales al desempeño sobresaliente durante las etapas formativas.',
        highlights: [
          'Exaltación pública y mención de honor al mejor aprendiz de la cohorte al finalizar la formación.',
          'Postulación prioritaria para desempeñarse como Monitor Académico con apoyo económico en su centro.',
          'Participación en semilleros de investigación aplicada de SENNOVA e iniciativas de innovación.',
        ],
      },
      {
        number: 'Art. 8 Lit. e-h',
        title: 'Movilidad Nacional, Pasantías y Representación',
        description: 'Oportunidades de proyección profesional más allá del aula de clase.',
        highlights: [
          'Representar al SENA en eventos nacionales e internacionales como competencias WorldSkills.',
          'Prioridad en convocatorias de pasantías e intercambios interinstitucionales concertados.',
          'Inclusión en el cuadro de honor institucional y recomendación preferente para contratos de aprendizaje.',
        ],
      },
    ],
    didYouKnow: 'Los monitores del SENA no solo reciben estímulo económico mensual, sino que además adquieren experiencia certificable en docencia técnica y soporte tecnológico.',
    practicalTip: 'Mantén tus evidencias al día en la plataforma LMS Zajuna; el promedio y cumplimiento son decisivos para acceder a las monitorías.',
  },
  {
    id: 'mod-4',
    chapterNumber: 4,
    title: 'Deberes y Prohibiciones del Aprendiz',
    shortDesc: '32 deberes esenciales y prohibiciones expresas sobre honestidad, asistencia y convivencia.',
    category: 'deberes',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulos IV y V',
    readTimeMin: 9,
    summary: 'El compromiso formativo exige honestidad académica, no plagio, porte visible del carné, asistencia puntual y respeto absoluto por la infraestructura física, virtual y humana de la comunidad SENA.',
    articles: [
      {
        number: 'Cap. IV Deberes',
        title: 'Deberes Académicos y de Convivencia (32 Deberes)',
        description: 'Obligaciones ineludibles que asume el aprendiz al firmar el acta de matrícula.',
        highlights: [
          'Suscribir y cumplir rigurosamente el acta de compromiso institucional al iniciar el programa.',
          'Asistir con puntualidad a todas las sesiones y actividades curriculares programadas.',
          'Radicar las justificaciones de inasistencia dentro de los tres (3) días hábiles siguientes al hecho con soportes válidos (médicos EPS/IPS o fuerza mayor).',
          'Portar visiblemente el carné institucional y los EPP adecuados según la especialidad técnica.',
          'Garantizar la autoría original en todas las evidencias y respetar los derechos de propiedad intelectual.',
        ],
      },
      {
        number: 'Cap. V Prohibiciones',
        title: 'Prohibiciones Expresas del Aprendiz',
        description: 'Comportamientos que vulneran la convivencia, la ética o la seguridad en el SENA.',
        highlights: [
          'Plagiar, comprar, vender, copiar o cometer fraude en talleres, proyectos o evidencias formativas.',
          'Suplantar la identidad de compañeros o ceder credenciales de acceso a plataformas institucionales (Zajuna LMS, Sofiaplus).',
          'Portar, consumir o comercializar bebidas alcohólicas, sustancias psicoactivas o armas en sedes del SENA o empresas de práctica.',
          'Cometer actos de intimidación, acoso laboral o sexual, matoneo físico, cibernético o verbal contra cualquier miembro de la comunidad.',
          'Dañar, sabotear o hurtar bienes, equipos, software o instalaciones institucionales.',
        ],
      },
    ],
    didYouKnow: 'El uso de inteligencia artificial para generar tareas sin citarla ni agregar elaboración propia se tipifica en el nuevo reglamento como falta grave o gravísima de fraude y deshonestidad académica.',
    practicalTip: 'Si te enfermas, no basta con avisarle a un compañero: debes radicar formalmente tu incapacidad médica dentro de los 3 días hábiles siguientes.',
  },
  {
    id: 'mod-5',
    chapterNumber: 5,
    title: 'Gestión Académica, Novedades y Deserción',
    shortDesc: 'Procedimientos oficiales para traslados, aplazamientos, reingresos y causales objetivas de deserción.',
    category: 'tramites',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulo VI',
    readTimeMin: 7,
    summary: 'Aprende cómo gestionar legalmente las vicisitudes de tu vida académica (traslados, aplazamientos y reingresos) y comprende las causales objetivas que configuran la deserción del programa.',
    articles: [
      {
        number: 'Novedades',
        title: 'Trámites de Formación y Permanencia',
        description: 'Solicitudes formales que el aprendiz puede radicar ante el centro de formación.',
        highlights: [
          'Aplazamiento: suspensión temporal justificada del programa hasta por 6 meses (prorrogable otros 6 meses en casos de fuerza mayor comprobada).',
          'Traslado: solicitud de cambio de jornada, sede o centro de formación según disponibilidad de cupo.',
          'Reingreso: solicitud escrita de reincorporación radicada con anticipación antes del vencimiento del aplazamiento.',
          'Retiro Voluntario: manifestación expresa de retirarse del programa, lo que genera una inhabilidad temporal para nueva matrícula de 6 meses.',
        ],
      },
      {
        number: 'Deserción',
        title: 'Configuración Objetiva de la Deserción',
        description: 'Causales legales por las cuales se cancela la matrícula de manera definitiva.',
        highlights: [
          'Inasistencia injustificada durante tres (3) días hábiles continuos en formación presencial o desatención de actividades formativas programadas.',
          'Inactividad injustificada en plataformas virtuales durante veinte (20) días calendario continuos.',
          'No presentarse a la Etapa Productiva dentro de los plazos reglamentarios concertados al terminar la lectiva.',
          'Notificación previa: el instructor o coordinador enviará comunicación para que en 3 días hábiles presente descargos antes de emitir la resolución de deserción.',
        ],
      },
    ],
    didYouKnow: 'Si una deserción se declara formalmente, el aprendiz queda sancionado con inhabilidad de seis (6) meses para inscribirse en cualquier programa de formación titulada del SENA.',
    practicalTip: 'Si tienes problemas personales o de salud que te impidan estudiar, solicita un Aplazamiento a tiempo antes de acumular faltas que deriven en deserción.',
  },
  {
    id: 'mod-6',
    chapterNumber: 6,
    title: 'Alternativas de Etapa Productiva',
    shortDesc: 'Las 5 modalidades oficiales: contrato de aprendizaje, vínculo laboral, proyecto, pasantía y monitoría.',
    category: 'etapa_productiva',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulo VII',
    readTimeMin: 8,
    summary: 'La Etapa Productiva permite consolidar tus competencias en el mundo real del trabajo. Conoce las 5 alternativas avaladas y los requisitos obligatorios de bitácoras y seguimiento para certificarte.',
    articles: [
      {
        number: '5 Modalidades',
        title: 'Alternativas Oficiales Avaladas por el SENA',
        description: 'Opciones legales que el aprendiz puede elegir para realizar su práctica laboral.',
        highlights: [
          '1. Contrato de Aprendizaje: vínculo formativo con empresa patrocinadora, apoyo de sostenimiento económico mensual y afiliación obligatoria a EPS y ARL.',
          '2. Vínculo Laboral o Contractual: acreditación de contrato de trabajo vigente en funciones directamente relacionadas con el programa de formación.',
          '3. Proyecto Productivo (SENNOVA / Fondo Emprender): desarrollo de una empresa o investigación aplicada que aporte soluciones técnicas comprobables.',
          '4. Pasantía: concertación de práctica técnica en instituciones públicas, ONG, entidades territoriales o microempresas.',
          '5. Monitorías Académicas: apoyo técnico y pedagógico calificado dentro de las instalaciones del SENA en áreas afines.',
        ],
      },
      {
        number: 'Requisitos',
        title: 'Seguimiento y Registro de Bitácoras Quincenales',
        description: 'Para ser certificado, el aprendiz debe cumplir rigurosamente el proceso documental.',
        highlights: [
          'Presentar quincenalmente las bitácoras de actividades firmadas por el coformador o jefe inmediato.',
          'Atender las concertaciones y visitas de seguimiento presenciales o virtuales del instructor asignado.',
          'Obtener el Juicio de Evaluación "Aprobado" en la totalidad de resultados de la etapa productiva.',
        ],
      },
    ],
    didYouKnow: 'El apoyo de sostenimiento en el contrato de aprendizaje durante la etapa productiva equivale mínimo al 75% o 100% del SMMLV según la tasa de desempleo nacional.',
    practicalTip: 'Registra tu hoja de vida con anticipación en el Sistema de Gestión Virtual de Aprendices (SGVA) durante el último trimestre de tu etapa lectiva.',
  },
  {
    id: 'mod-7',
    chapterNumber: 7,
    title: 'Régimen de Faltas, Medidas y Sanciones',
    shortDesc: 'Clasificación de faltas (leves, graves, gravísimas), planes de mejoramiento y sanciones disciplinarias.',
    category: 'faltas_sanciones',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulos VIII, IX y X',
    readTimeMin: 8,
    summary: 'Comprende cómo se clasifican las faltas académicas y disciplinarias, las medidas formativas pedagógicas y las sanciones aplicables por el Subdirector de Centro ante faltas graves o gravísimas.',
    articles: [
      {
        number: 'Cap. VIII-IX',
        title: 'Clasificación de Faltas y Medidas Formativas',
        description: 'Las medidas formativas tienen carácter pedagógico y buscan encauzar la conducta del aprendiz.',
        highlights: [
          'Faltas Académicas: bajo rendimiento, incumplimiento reiterado de evidencias, desinterés en el aprendizaje.',
          'Faltas Disciplinarias: afectación de la convivencia, violencia, suplantación, desacato de normas de seguridad.',
          'Criterios de graduación: se clasifican en Leves, Graves o Gravísimas según el dolo, la culpa y el perjuicio causado.',
          'Medidas Formativas: Llamado de atención verbal reflexivo, llamado de atención escrito con plan de mejoramiento académico.',
        ],
      },
      {
        number: 'Cap. X',
        title: 'Sanciones Disciplinarias Institucionales',
        description: 'Medidas sancionatorias impuestas por el Subdirector de Centro tras concepto del Comité.',
        highlights: [
          'Condicionamiento de Matrícula: llamado de atención formal que suspende beneficios institucionales por un lapso determinado.',
          'Cancelación de Matrícula: sanción máxima ante faltas gravísimas que extingue el carácter de aprendiz.',
          'Inhabilidad: la cancelación de matrícula genera inhabilidad para ingresar al SENA de entre seis (6) meses y dos (2) años.',
        ],
      },
    ],
    didYouKnow: 'El porte de armas, el consumo de drogas dentro de la sede y el plagio comprobado son tipificados automáticamente como faltas gravísimas en el Acuerdo 0009 de 2024.',
    practicalTip: 'El plan de mejoramiento no es un castigo: es un compromiso pedagógico concertado con tu instructor para nivelar evidencias atrasadas antes de que pase a comité.',
  },
  {
    id: 'mod-8',
    chapterNumber: 8,
    title: 'Debido Proceso y Comité de Evaluación',
    shortDesc: 'Garantías constitucionales, derecho a la defensa y términos procesales (Acuerdo 002 de 2026, Art. 48).',
    category: 'faltas_sanciones',
    legalBasis: 'Acuerdo 0009 de 2024 (Cap. XI) & Acuerdo 002 de 2026 (Art. 48)',
    readTimeMin: 7,
    summary: 'Todo aprendiz sometido a un procedimiento sancionatorio cuenta con la protección estricta del Debido Proceso. Conoce cómo opera el Comité de Evaluación y Seguimiento, tus términos de descargos y recursos.',
    articles: [
      {
        number: 'Acuerdo 002/2026 Art. 48',
        title: 'Garantías Procesales y Citación al Comité',
        description: 'El procedimiento debe respetar escrupulosamente los derechos fundamentales de defensa.',
        highlights: [
          'Citación formal por escrito o correo institucional con formulación clara de los cargos imputados.',
          'Término de cinco (5) días hábiles para presentar descargos escritos y aportar o solicitar pruebas pertinentes.',
          'Sesión del Comité de Evaluación y Seguimiento con presencia del aprendiz y su Vocero de Ficha.',
          'El Comité emite una recomendación motivada, pero la sanción únicamente la puede ordenar el Subdirector de Centro.',
        ],
      },
      {
        number: 'Recurso de Reposición',
        title: 'Derecho de Impugnación y Reposición',
        description: 'El aprendiz no está indefenso y puede controvertir las resoluciones sancionatorias.',
        highlights: [
          'Contra el acto sancionatorio emitido por la Subdirección procede el Recurso de Reposición.',
          'Debe interponerse dentro de los cinco (5) días hábiles siguientes a la notificación formal de la resolución.',
          'El Subdirector de Centro tiene la obligación legal de resolver de fondo el recurso ratificando, modificando o revocando la sanción.',
        ],
      },
    ],
    didYouKnow: 'Gracias a la actualización del Acuerdo 002 de 2026, se blindaron los términos de notificación electrónica y se reforzó el acompañamiento del Vocero de Ficha como veedor del aprendiz.',
    practicalTip: 'Si eres citado a Comité, acude siempre acompañado de tu Vocero de Ficha y lleva copias impresas o digitales de todas tus evidencias y soportes de justificación.',
  },
];

// ==========================================
// CATÁLOGO DE DERECHOS Y DEBERES (COMPARATIVA)
// ==========================================
export const DERECHOS_DEBERES_ITEMS = [
  {
    id: 'item-1',
    type: 'derecho' as const,
    category: 'Inducción y Permanencia',
    text: 'Recibir inducción integral de 40 horas al iniciar el programa formativo.',
    article: 'Acuerdo 0009 de 2024, Art. 7 Num. 1',
    explanation: 'El aprendiz tiene derecho garantizado a conocer la institución, el reglamento, sus deberes y el modelo pedagógico antes de iniciar la etapa técnica.',
  },
  {
    id: 'item-2',
    type: 'deber' as const,
    category: 'Compromiso Institucional',
    text: 'Suscribir el acta de compromiso institucional al momento de la matrícula.',
    article: 'Acuerdo 0009 de 2024, Cap. IV Deberes',
    explanation: 'Es la manifestación legal de voluntad mediante la cual el aprendiz asume las responsabilidades del proceso formativo y el reglamento vigente.',
  },
  {
    id: 'item-3',
    type: 'derecho' as const,
    category: 'Evaluación y Calidad',
    text: 'Conocer las evaluaciones y retroalimentaciones dentro de los 8 días hábiles siguientes a la entrega de la evidencia.',
    article: 'Acuerdo 0009 de 2024, Art. 7 Num. 15',
    explanation: 'Garantiza la transparencia evaluativa y permite corregir oportunidades de mejora a tiempo.',
  },
  {
    id: 'item-4',
    type: 'deber' as const,
    category: 'Asistencia y Justificaciones',
    text: 'Radicar justificaciones de inasistencia dentro de los 3 días hábiles siguientes al hecho con soporte médico o legal.',
    article: 'Acuerdo 0009 de 2024, Cap. IV & Cap. VI',
    explanation: 'El plazo perentorio legal es de 3 días hábiles; superado este lapso sin radicación, se inicia el proceso por presunta deserción.',
  },
  {
    id: 'item-5',
    type: 'derecho' as const,
    category: 'Garantías Pedagógicas',
    text: 'Solicitar una segunda revisión o evaluación técnica si está en desacuerdo con la calificación obtenida.',
    article: 'Acuerdo 0009 de 2024, Art. 7 Num. 17',
    explanation: 'Protege al aprendiz contra evaluaciones arbitrarias, permitiendo que otro instructor o comité pedagógico revise la evidencia.',
  },
  {
    id: 'item-6',
    type: 'deber' as const,
    category: 'Seguridad y Salud (SST)',
    text: 'Portar visiblemente el carné institucional y los Elementos de Protección Personal (EPP) exigidos en ambientes de aprendizaje.',
    article: 'Acuerdo 0009 de 2024, Cap. IV Deberes',
    explanation: 'Norma de seguridad industrial, salud ocupacional y control de acceso en todas las sedes del SENA.',
  },
  {
    id: 'item-7',
    type: 'derecho' as const,
    category: 'Protección y Convivencia',
    text: 'Recibir atención prioritaria y protección inmediata ante cualquier vulneración de derechos, acoso sexual o discriminación.',
    article: 'Acuerdo 0009 de 2024, Art. 7 Num. 13',
    explanation: 'Mandato estricto con enfoque diferencial y de género para salvaguardar la integridad de todo aprendiz.',
  },
  {
    id: 'item-8',
    type: 'deber' as const,
    category: 'Integridad y Propiedad Intelectual',
    text: 'Garantizar la autoría original de evidencias y no cometer plagio ni utilizar IA para suplantar la elaboración propia.',
    article: 'Acuerdo 0009 de 2024, Cap. V Prohibiciones',
    explanation: 'El fraude y la copia constituyen faltas graves o gravísimas que pueden acarrear la cancelación de la matrícula.',
  },
  {
    id: 'item-9',
    type: 'derecho' as const,
    category: 'Bienestar al Aprendiz',
    text: 'Postularse a los apoyos de sostenimiento (FIC, regular y monitorías) cumpliendo requisitos socioeconómicos.',
    article: 'Acuerdo 0009 de 2024, Art. 7 Num. 9',
    explanation: 'Beneficio de la política de Bienestar al Aprendiz para apoyar la permanencia de aprendices en situación de vulnerabilidad.',
  },
  {
    id: 'item-10',
    type: 'deber' as const,
    category: 'Etapa Productiva',
    text: 'Presentar quincenalmente las bitácoras firmadas durante el desarrollo de la etapa productiva.',
    article: 'Acuerdo 0009 de 2024, Cap. VII Etapa Productiva',
    explanation: 'Es requisito legal indispensable para que el instructor de seguimiento avale y apruebe la práctica laboral.',
  },
  {
    id: 'item-11',
    type: 'derecho' as const,
    category: 'Debido Proceso',
    text: 'Garantía del Debido Proceso y contar con el acompañamiento del Vocero de Ficha en el Comité de Evaluación.',
    article: 'Acuerdo 002 de 2026, Art. 48 & Acuerdo 009 de 2024',
    explanation: 'Derecho a conocer cargos, presentar descargos en 5 días hábiles, controvertir pruebas y apelar sanciones.',
  },
  {
    id: 'item-12',
    type: 'deber' as const,
    category: 'Prohibiciones Críticas',
    text: 'No ingresar a las sedes bajo efectos de alcohol, sustancias psicoactivas ni portar armas u objetos peligrosos.',
    article: 'Acuerdo 0009 de 2024, Cap. V Prohibiciones',
    explanation: 'Prohibición estricta cuya violación constituye falta gravísima y causal de expulsión e inhabilidad institucional.',
  },
];

// ==========================================
// SIMULADOR DE CASOS REALES (ACUERDO 0009/2024)
// ==========================================
export const SIMULATION_CASES: SimulationCase[] = [
  {
    id: 'case-1',
    title: 'Inasistencia por Urgencia Médica y el Plazo de los 3 Días',
    category: 'Trámites de Formación',
    situation: 'Carlos es aprendiz de ADSO. El día lunes sufrió una apendicitis y fue intervenido quirúrgicamente, recibiendo 6 días de incapacidad médica emitida por su EPS. Carlos regresa al centro el siguiente martes y el instructor le informa que ya está en proceso de reporte por presunta deserción debido a inasistencias acumuladas.',
    character: 'Carlos Mendoza',
    role: 'Aprendiz Tecnólogo ADSO',
    choices: [
      {
        id: 'opt-1a',
        text: 'Aceptar la deserción porque ya transcurrieron más de tres días desde que inició su ausencia en el aula.',
        isCorrect: false,
        outcome: 'Sanción innecesaria con cancelación de matrícula e inhabilidad de 6 meses.',
        normativeAnalysis: 'La incapacidad médica emitida por la EPS es justa causa legal. Carlos tiene derecho al debido proceso y a radicar los soportes tan pronto su estado de salud lo permita.',
        articleCitation: 'Acuerdo 0009 de 2024, Cap. IV & Cap. VI',
      },
      {
        id: 'opt-1b',
        text: 'Radicar de inmediato ante coordinación académica la incapacidad médica original de la EPS y responder en descargos.',
        isCorrect: true,
        outcome: 'Trámite archivado con éxito y concertación de plan de mejoramiento académico.',
        normativeAnalysis: 'Según el Acuerdo 0009 de 2024, las ausencias por salud con soporte de EPS/IPS constituyen causa justificada. Al radicarse, se archiva el reporte y se concierta un plan de mejoramiento.',
        articleCitation: 'Acuerdo 0009 de 2024, Capítulo IV Deberes & Cap. VI',
      },
      {
        id: 'opt-1c',
        text: 'Pedirle a un compañero que firme las listas de asistencia pasadas para que no figuren las faltas.',
        isCorrect: false,
        outcome: 'Apertura de proceso disciplinario por falta gravísima de falsedad y suplantación.',
        normativeAnalysis: 'La suplantación de identidad o adulteración de listas de asistencia es una falta gravísima (Cap. V Prohibiciones) que amerita cancelación inmediata de matrícula.',
        articleCitation: 'Acuerdo 0009 de 2024, Capítulo V Prohibiciones',
      },
    ],
  },
  {
    id: 'case-2',
    title: 'Divergencia en Calificación y Derecho a la Segunda Revisión',
    category: 'Garantías Pedagógicas',
    situation: 'Laura presentó su proyecto final de integración de bases de datos. El instructor le otorgó juicio "No Aprobado" sin explicar las razones pedagógicas ni entregar retroalimentación en la plataforma Zajuna. Laura considera que cumplió con el 100% de la rúbrica y solicita una solución formal.',
    character: 'Laura Sofía Gómez',
    role: 'Aprendiz en Etapa Lectiva',
    choices: [
      {
        id: 'opt-2a',
        text: 'Insultar al instructor en el grupo de WhatsApp del curso y convocar a un cese de actividades.',
        isCorrect: false,
        outcome: 'Apertura de proceso disciplinario sancionatorio por agresión y alteración del orden.',
        normativeAnalysis: 'El irrespeto y la injuria constituyen falta disciplinaria grave tipificada en el Capítulo VIII.',
        articleCitation: 'Acuerdo 0009 de 2024, Capítulos V y VIII',
      },
      {
        id: 'opt-2b',
        text: 'Radicar solicitud formal y respetuosa de Segunda Revisión ante la Coordinación Académica dentro del plazo reglamentario.',
        isCorrect: true,
        outcome: 'Designación de instructor par, revisión imparcial con rúbrica y emisión de juicio definitivo transparente.',
        normativeAnalysis: 'El Artículo 7 Numeral 17 del Acuerdo 0009 de 2024 faculta al aprendiz para solicitar una segunda revisión técnica ante la coordinación para verificar la evidencia.',
        articleCitation: 'Acuerdo 0009 de 2024, Artículo 7 Numeral 17',
      },
      {
        id: 'opt-2c',
        text: 'Resignarse a repetir todo el trimestre porque los juicios del instructor son legalmente inapelables.',
        isCorrect: false,
        outcome: 'Pérdida injustificada de tiempo académico por desconocimiento de sus derechos.',
        normativeAnalysis: 'Ningún juicio evaluativo es inapelable en el SENA. El debido proceso pedagógico garantiza el derecho de contradicción y revisión transparente.',
        articleCitation: 'Acuerdo 0009 de 2024, Artículo 7 Numeral 15',
      },
    ],
  },
  {
    id: 'case-3',
    title: 'Elección de Alternativa para la Etapa Productiva',
    category: 'Etapa Productiva',
    situation: 'Mateo finalizó su etapa lectiva y su tío le ofrece trabajar en su taller mecánico como mensajero informal sin contrato ni ARL. Al mismo tiempo, una empresa tecnológica le ofrece un Contrato de Aprendizaje formal para soporte de software con 100% del SMMLV, EPS y ARL.',
    character: 'Mateo Restrepo',
    role: 'Aprendiz en Transición Productiva',
    choices: [
      {
        id: 'opt-3a',
        text: 'Aceptar el trabajo informal con su tío porque le paga en efectivo diariamente sin trámites.',
        isCorrect: false,
        outcome: 'Rechazo de la etapa productiva por falta de afinidad temática y ausencia de ARL, impidiendo la certificación.',
        normativeAnalysis: 'El SENA no avala labores informales ni desvinculadas del perfil ocupacional del programa. Además, carecería de cobertura en ARL y no podrá ser certificado.',
        articleCitation: 'Acuerdo 0009 de 2024, Capítulo VII',
      },
      {
        id: 'opt-3b',
        text: 'Formalizar el Contrato de Aprendizaje en la empresa tecnológica a través del aplicativo SGVA con cobertura en ARL y EPS.',
        isCorrect: true,
        outcome: 'Práctica legal exitosa, apoyo económico garantizado, seguimiento de bitácoras y certificación oportuna.',
        normativeAnalysis: 'El Contrato de Aprendizaje es una de las 5 alternativas oficiales del Acuerdo 0009 de 2024. Garantiza seguridad social, apoyo económico mensual, funciones afines y aval institucional.',
        articleCitation: 'Acuerdo 0009 de 2024, Capítulo VII (Etapa Productiva)',
      },
      {
        id: 'opt-3c',
        text: 'Esperar un año descansando en casa antes de buscar alternativa productiva.',
        isCorrect: false,
        outcome: 'Vencimiento de plazos reglamentarios y declaratoria de deserción del programa.',
        normativeAnalysis: 'El reglamento otorga plazos perentorios al finalizar la etapa lectiva; la inactividad injustificada deriva en proceso de deserción.',
        articleCitation: 'Acuerdo 0009 de 2024, Capítulo VI',
      },
    ],
  },
  {
    id: 'case-4',
    title: 'Citación a Comité de Evaluación y Garantías del Debido Proceso',
    category: 'Debido Proceso Sancionatorio',
    situation: 'Valeria fue citada al Comité de Evaluación y Seguimiento mediante oficio en el que se le imputa presunto plagio en una evidencia de aprendizaje. La notificación le fue entregada un día antes de la audiencia y no se le adjuntaron las pruebas del supuesto plagio.',
    character: 'Valeria Jiménez',
    role: 'Aprendiz Convocada a Comité',
    choices: [
      {
        id: 'opt-4a',
        text: 'Exigir el cumplimiento del término legal de 5 días hábiles para descargos y traslado de pruebas según el Acuerdo 002 de 2026.',
        isCorrect: true,
        outcome: 'Reprogramación formal de la sesión, garantía plena de defensa técnica y examen riguroso de pruebas.',
        normativeAnalysis: 'El Artículo 48 (modificado por el Acuerdo 002 de 2026) garantiza de manera vinculante cinco (5) días hábiles entre la formulación de cargos y los descargos, con acceso al expediente y vocero.',
        articleCitation: 'Acuerdo 002 de 2026, Art. 48 & Acuerdo 009 de 2024, Cap. XI',
      },
      {
        id: 'opt-4b',
        text: 'No presentarse nunca al comité creyendo que con no asistir se anula automáticamente el procedimiento.',
        isCorrect: false,
        outcome: 'El comité sesiona válidamente en rebeldía y recomienda la sanción máxima sin escuchar su versión.',
        normativeAnalysis: 'Si el aprendiz no asiste ni justifica en 3 días, el comité sesiona en rebeldía y emite recomendación con las pruebas existentes.',
        articleCitation: 'Acuerdo 0009 de 2024, Capítulo XI',
      },
      {
        id: 'opt-4c',
        text: 'Aceptar la culpa de inmediato sin leer los cargos para evitar que la sanción sea mayor.',
        isCorrect: false,
        outcome: 'Sanción firme en hoja de vida sin haber verificado si la acusación era infundada.',
        normativeAnalysis: 'Todo aprendiz goza de presunción de inocencia y tiene derecho a examinar las pruebas y defenderse con soporte de sus evidencias originales.',
        articleCitation: 'Acuerdo 002 de 2026, Art. 48',
      },
    ],
  },
];

// ==========================================
// 10 PREGUNTAS DE EVALUACIÓN GAMIFICADA
// ==========================================
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    category: 'Identidad SENA',
    question: '¿Cuál es el reglamento del aprendiz actualmente vigente y qué acuerdos anteriores derogó en su totalidad?',
    options: [
      'El Acuerdo 07 de 2012, que continúa vigente de manera indefinida.',
      'El Acuerdo 0009 de 2024 (con ajuste del Acuerdo 002 de 2026), derogando los Acuerdos 07/2012, 02/2014, 06/2023 y 02/2024.',
      'La Resolución 1200 de 2018 expedida por el Ministerio de Educación.',
      'El Decreto 1072 de 2015 sobre formación continua.',
    ],
    correctIndex: 1,
    points: 10,
    legalArticle: 'Normograma Institucional SENA & Acuerdo 0009 de 2024',
    explanation: 'El Consejo Directivo Nacional adoptó el Acuerdo 0009 de 2024 como compilación y nuevo reglamento integral, derogando expresamente todos los acuerdos precedentes.',
  },
  {
    id: 'q-2',
    category: 'Derechos',
    question: '¿Cuántos derechos fundamentales consagra taxativamente el Artículo 7 del Acuerdo 0009 de 2024 para todo aprendiz?',
    options: [
      'Únicamente 4 derechos básicos de permanencia.',
      '10 derechos administrativos.',
      '22 derechos oficiales que amparan su dignidad, formación de calidad, bienestar y debido proceso.',
      '50 derechos universales laborales.',
    ],
    correctIndex: 2,
    points: 10,
    legalArticle: 'Acuerdo 0009 de 2024 / Capítulo II (Artículo 7)',
    explanation: 'El Artículo 7 lista formalmente 22 derechos integrales que cubren inducción, ambientes, EPP, bienestar, evaluación y garantías procesales.',
  },
  {
    id: 'q-3',
    category: 'Deberes',
    question: '¿Cuál es el plazo perentorio legal para radicar justificaciones de inasistencia médica o por fuerza mayor ante el SENA?',
    options: [
      'Veinte (20) días después de retornar a clases.',
      'Tres (3) días hábiles siguientes a la ocurrencia del hecho con soportes válidos de EPS/IPS o fuerza mayor.',
      'Quince (15) días calendario mediante llamada telefónica.',
      'No existe plazo legal, se puede entregar al final del trimestre.',
    ],
    correctIndex: 1,
    points: 10,
    legalArticle: 'Acuerdo 0009 de 2024 / Capítulo IV Deberes & Capítulo VI Deserción',
    explanation: 'El aprendiz debe radicar formalmente su justificación médica o legal dentro de los 3 días hábiles siguientes al hecho para evitar el inicio del trámite de deserción.',
  },
  {
    id: 'q-4',
    category: 'Deberes',
    question: '¿Cuántos días continuos de inasistencia injustificada en formación presencial configuran causal objetiva de presunta deserción?',
    options: [
      'Diez (10) días hábiles.',
      'Tres (3) días hábiles continuos sin radicación de justa causa legal.',
      'Treinta (30) días calendario.',
      'Un (1) solo día de inasistencia.',
    ],
    correctIndex: 1,
    points: 10,
    legalArticle: 'Acuerdo 0009 de 2024 / Capítulo VI (Deserción del Aprendiz)',
    explanation: 'La ausencia injustificada durante tres (3) días hábiles continuos en presencial faculta el inicio del procedimiento de deserción.',
  },
  {
    id: 'q-5',
    category: 'Derechos',
    question: '¿Cuál es el plazo reglamentario que tiene el instructor para registrar evaluaciones y dar retroalimentación de las evidencias?',
    options: [
      'Hasta el último día del año lectivo.',
      'Ocho (8) días hábiles siguientes a la entrega de la evidencia.',
      'Cuarenta y ocho (48) horas exactas.',
      'Treinta (30) días hábiles.',
    ],
    correctIndex: 1,
    points: 10,
    legalArticle: 'Acuerdo 0009 de 2024 / Artículo 7 Numeral 15',
    explanation: 'El aprendiz tiene derecho a conocer oportunamente sus evaluaciones dentro de los 8 días hábiles siguientes a la entrega de la evidencia.',
  },
  {
    id: 'q-6',
    category: 'Etapa Productiva',
    question: '¿Cuáles son las 5 alternativas oficiales avaladas para el desarrollo de la Etapa Productiva en el SENA?',
    options: [
      'Descanso sabático, voluntariado libre, teletrabajo sin ARL, contrato verbal y monitoría informal.',
      'Contrato de Aprendizaje, Vínculo Laboral afín, Proyecto Productivo (SENNOVA/Fondo Emprender), Pasantía y Monitorías.',
      'Únicamente el Contrato de Aprendizaje en empresa privada.',
      'Cualquier empleo no calificado sin importar el programa.',
    ],
    correctIndex: 1,
    points: 10,
    legalArticle: 'Acuerdo 0009 de 2024 / Capítulo VII (Etapa Productiva)',
    explanation: 'El reglamento reconoce 5 alternativas formales que deben tener estrecha relación con las competencias del programa y supervisión con bitácoras.',
  },
  {
    id: 'q-7',
    category: 'Faltas y Sanciones',
    question: 'Según el Artículo 48 (modificado por el Acuerdo 002 de 2026), ¿cuántos días tiene el aprendiz para presentar descargos tras ser notificado de cargos?',
    options: [
      'Un (1) día calendario.',
      'Cinco (5) días hábiles para examinar el expediente, presentar descargos escritos y aportar pruebas.',
      'Veinte (20) días hábiles prorrogables.',
      'No tiene derecho a presentar descargos previos.',
    ],
    correctIndex: 1,
    points: 10,
    legalArticle: 'Acuerdo 002 de 2026, Art. 48 (Modificación del Debido Proceso)',
    explanation: 'El Acuerdo 002 de 2026 blindó la garantía del debido proceso fijando 5 días hábiles formales para la formulación de descargos y práctica de pruebas.',
  },
  {
    id: 'q-8',
    category: 'Faltas y Sanciones',
    question: '¿Qué recurso legal procede contra la resolución que impone sanción emitida por el Subdirector de Centro?',
    options: [
      'Recurso de Casación ante la Corte Suprema.',
      'Recurso de Reposición interpuesto dentro de los cinco (5) días hábiles siguientes a la notificación.',
      'No procede ningún recurso administrativo.',
      'Acción popular inmediata ante el Ministerio.',
    ],
    correctIndex: 1,
    points: 10,
    legalArticle: 'Acuerdo 0009 de 2024 / Capítulo XI (Garantías y Recursos)',
    explanation: 'Contra el acto administrativo que impone sanción procede el Recurso de Reposición ante el mismo funcionario (Subdirector de Centro) dentro de los 5 días hábiles.',
  },
  {
    id: 'q-9',
    category: 'Faltas y Sanciones',
    question: '¿Qué inhabilidad temporal genera la Cancelación de Matrícula por falta gravísima en el SENA?',
    options: [
      'Una semana de suspensión en portería.',
      'Inhabilidad para ingresar al SENA de entre seis (6) meses y dos (2) años.',
      'Inhabilidad permanente de por vida en cualquier entidad del Estado.',
      'No genera ninguna inhabilidad para volver a matricularse de inmediato.',
    ],
    correctIndex: 1,
    points: 10,
    legalArticle: 'Acuerdo 0009 de 2024 / Capítulo X (Sanciones Disciplinarias)',
    explanation: 'La cancelación de matrícula por falta gravísima acarrea una inhabilidad formal de entre 6 meses y 2 años según la gravedad tasada.',
  },
  {
    id: 'q-10',
    category: 'Prohibiciones',
    question: '¿Cuál de las siguientes conductas está clasificada taxativamente como falta gravísima de fraude y deshonestidad académica?',
    options: [
      'Solicitar una segunda revisión de una evidencia ante el coordinador.',
      'Plagiar evidencias, suplantar la identidad en Zajuna LMS o comprar/vender proyectos formativos.',
      'Participar como candidato a Vocero de Ficha.',
      'Radicar incapacidades médicas dentro del plazo de ley.',
    ],
    correctIndex: 1,
    points: 10,
    legalArticle: 'Acuerdo 0009 de 2024 / Capítulo V Prohibiciones & Cap. VIII Faltas',
    explanation: 'El plagio y la suplantación de identidad en plataformas atentan directamente contra la fe pública institucional y son faltas gravísimas.',
  },
];

// ==========================================
// INSIGNIAS OFICIALES DE INDUCCIÓN
// ==========================================
export const INDUCTION_BADGES: InductionBadge[] = [
  {
    id: 'badge-1',
    name: 'Ciudadano SENA',
    description: 'Apropió los principios, misión y enfoque diferencial del Acuerdo 0009 de 2024.',
    iconName: 'ShieldCheck',
    requiredXp: 50,
    condition: 'Completar el Módulo 1 de Principios y Fundamentos del SENA.',
  },
  {
    id: 'badge-2',
    name: 'Garante de Derechos',
    description: 'Dominó los 22 derechos fundamentales y reconocimientos formativos oficiales.',
    iconName: 'Scale',
    requiredXp: 120,
    condition: 'Completar la revisión del Artículo 7 y clasificador de derechos.',
  },
  {
    id: 'badge-3',
    name: 'Ética y Compromiso',
    description: 'Completó el análisis de deberes, prohibiciones y prevención del plagio.',
    iconName: 'FileCheck2',
    requiredXp: 200,
    condition: 'Apropiar los 32 deberes y prohibiciones en casos prácticos.',
  },
  {
    id: 'badge-4',
    name: 'Estratega Productivo',
    description: 'Conoce las 5 alternativas legales de práctica y gestión de novedades académicas.',
    iconName: 'Award',
    requiredXp: 300,
    condition: 'Superar los casos simulados de etapa productiva y novedades.',
  },
  {
    id: 'badge-5',
    name: 'Maestro Normativo 2026',
    description: 'Aprobó con éxito la evaluación oficial del Reglamento del Aprendiz SENA (≥ 70%).',
    iconName: 'Sparkles',
    requiredXp: 400,
    condition: 'Aprobar la evaluación final de inducción con puntaje mayor o igual al 70%.',
  },
];

// ==========================================
// PLAN ESTRUCTURADO DE INDUCCIÓN (4 FASES)
// ==========================================
export const STRUCTURED_INDUCTION_PLAN = [
  {
    phase: 'Fase 1: Contextualización Institucional y Principios',
    hours: '10 Horas',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulo I (Principios y Alcance)',
    goal: 'Apropiar la identidad institucional del SENA, sus valores, principios rectores de dignidad humana, no discriminación, enfoque diferencial y desarrollo sostenible.',
    description: 'Apropiación de la identidad SENA, principios éticos, enfoque diferencial, desarrollo sostenible y el ecosistema de la formación profesional integral.',
    activities: [
      'Recorrido por la misión, visión, símbolos e historia de la fundación del SENA.',
      'Taller vivencial sobre dignidad humana, no discriminación y enfoque diferencial e inclusivo.',
      'Reconocimiento de la infraestructura física, talleres, laboratorios y herramientas tecnológicas.',
      'Apertura de cuentas y validación de acceso en plataformas institucionales (SofíaPlus y Zajuna LMS).',
    ],
    deliverable: 'Acta de matrícula formal suscrita y diagnóstico inicial de competencias.',
  },
  {
    phase: 'Fase 2: Apropiación de Derechos, Deberes e Integridad',
    hours: '10 Horas',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulos II, III, IV y V',
    goal: 'Comprender y ejercer conscientemente el catálogo de 22 derechos oficiales, estímulos por excelencia, 32 deberes formativos y prohibiciones expresas.',
    description: 'Comprensión profunda de los 22 derechos oficiales, estímulos formativos, 32 deberes del aprendiz y prohibiciones expresas contra el fraude y el acoso.',
    activities: [
      'Análisis interactivo del catálogo de 22 derechos fundamentales (Art. 7) y servicios de Bienestar al Aprendiz.',
      'Socialización de las 32 obligaciones académicas y el procedimiento estricto para justificar inasistencias en máx. 3 días hábiles.',
      'Sensibilización sobre propiedad intelectual, ética digital y prevención estricta del plagio y fraude.',
      'Presentación de la ruta de atención institucional inmediata contra el acoso y la discriminación.',
    ],
    deliverable: 'Firma consciente del decálogo ético y compromisos de convivencia.',
  },
  {
    phase: 'Fase 3: Gestión Académica, Novedades y Etapa Productiva',
    hours: '10 Horas',
    legalBasis: 'Acuerdo 0009 de 2024 / Capítulos VI y VII',
    goal: 'Conocer las rutas para tramitar novedades académicas (traslados, aplazamientos, reingresos), prevenir causales de deserción y proyectar la etapa productiva.',
    description: 'Instrucción sobre trámites de permanencia, causales de deserción y preparación para las 5 alternativas de práctica en el sector productivo.',
    activities: [
      'Capacitación en trámites de novedades formativas: Traslados, Aplazamientos, Reingresos y Retiro Voluntario.',
      'Claridad normativa sobre las causales objetivas que configuran la deserción del programa formativo.',
      'Exploración detallada de las 5 alternativas oficiales para la Etapa Productiva (Contrato de Aprendizaje, Vínculo Laboral, Proyecto, Pasantía y Monitoría).',
      'Instrucción en el diligenciamiento quincenal de bitácoras y uso del SGVA.',
    ],
    deliverable: 'Hoja de vida diligenciada en SGVA y plan individual de proyección a etapa productiva.',
  },
  {
    phase: 'Fase 4: Debido Proceso, Representación y Evaluación Final',
    hours: '10 Horas',
    legalBasis: 'Acuerdo 0009 de 2024 (Cap. VIII a XII) & Acuerdo 002 de 2026 (Art. 48)',
    goal: 'Apropiar las garantías del debido proceso sancionatorio, el rol del Vocero de Ficha y superar la evaluación formativa gamificada de 40 horas.',
    description: 'Garantías constitucionales del debido proceso, régimen de faltas y sanciones, elección de voceros y certificación institucional.',
    activities: [
      'Estudio del procedimiento sancionatorio, rol del Comité de Evaluación y garantía de 5 días hábiles para descargos (Acuerdo 002 de 2026).',
      'Distinción de faltas leves, graves y gravísimas, medidas formativas y sanciones con inhabilidad.',
      'Elección democrática del Vocero de Ficha y socialización del mecanismo de representación estudiantil.',
      'Rendición de la evaluación formativa gamificada de inducción institucional (mínimo 70% aprobatorio).',
    ],
    deliverable: 'Certificado Institucional de Inducción SENA (40 Horas) aprobado y generado.',
  },
];

import {
  INDUCTION_MODULES_EN,
  DERECHOS_DEBERES_ITEMS_EN,
  SIMULATION_CASES_EN,
  QUIZ_QUESTIONS_EN,
  INDUCTION_BADGES_EN,
  STRUCTURED_INDUCTION_PLAN_EN,
} from './senaDataEn';

export const getInductionModules = (lang: 'es' | 'en' = 'es'): ModuleItem[] => {
  return lang === 'en' ? INDUCTION_MODULES_EN : INDUCTION_MODULES;
};

export const getDerechosDeberes = (lang: 'es' | 'en' = 'es') => {
  return lang === 'en' ? DERECHOS_DEBERES_ITEMS_EN : DERECHOS_DEBERES_ITEMS;
};

export const getSimulationCases = (lang: 'es' | 'en' = 'es'): SimulationCase[] => {
  return lang === 'en' ? SIMULATION_CASES_EN : SIMULATION_CASES;
};

export const getQuizQuestions = (lang: 'es' | 'en' = 'es'): QuizQuestion[] => {
  return lang === 'en' ? QUIZ_QUESTIONS_EN : QUIZ_QUESTIONS;
};

export const getInductionBadges = (lang: 'es' | 'en' = 'es'): InductionBadge[] => {
  return lang === 'en' ? INDUCTION_BADGES_EN : INDUCTION_BADGES;
};

export const getStructuredInductionPlan = (lang: 'es' | 'en' = 'es') => {
  return lang === 'en' ? STRUCTURED_INDUCTION_PLAN_EN : STRUCTURED_INDUCTION_PLAN;
};
