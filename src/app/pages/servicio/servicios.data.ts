/**
 * Servicios nuevos de JPC Electronics (noviembre 2026).
 * Para cambiar textos o imágenes basta con editar este archivo.
 * La imagen puede ser un SVG de assets/imagenes/servicios/ o una foto propia (.webp/.jpg).
 */
export interface Servicio {
  id: string;
  titulo: string;
  etiqueta: string;
  imagen: string;
  resumen: string;
  puntos: { icono: string; titulo: string; texto: string }[];
  dirigidoA: string[];
  nota?: string;
  /** Video vertical (reel) con su portada, párrafos de descripción y un texto destacado. */
  videos?: VideoServicio[];
  /** Trabajos realizados (sitios web, sistemas). */
  portafolio?: TrabajoPortafolio[];
  mensajeWhatsApp: string;
}

export interface VideoServicio {
  src: string;
  portada: string;
  titulo: string;
  parrafos: string[];
  destacado?: string;
  /** true para reels 9:16; si no, el video es horizontal y ocupa todo el ancho. */
  vertical?: boolean;
  /** Etiqueta sobre el video; por defecto «Demostración en video». */
  etiqueta?: string;
}

export interface TrabajoPortafolio {
  nombre: string;
  tipo: string;
  descripcion: string;
  imagen: string;
  /** Enlace al sitio publicado; sin enlace se muestra como demo. */
  url?: string;
}

export const WHATSAPP_JPC = '593980929669';

export const SERVICIOS: Servicio[] = [
  {
    id: 'kits-interactivos',
    titulo: 'Plataforma de Kits Interactivos',
    etiqueta: 'Educación inclusiva',
    imagen: 'assets/imagenes/servicios/foto-kits-interactivos.webp',
    resumen:
      'Kits educativos físicos conectados a una plataforma de software que guía cada actividad con voz e imagen. ' +
      'Nacieron con el Kit Braille para acompañar la alfabetización de personas con discapacidad visual.',
    puntos: [
      { icono: '⠿', titulo: 'Kit Braille', texto: 'Fichas y regleta para aprender y practicar la lectura braille paso a paso.' },
      { icono: '🔊', titulo: 'Guía por voz', texto: 'La plataforma indica cada ejercicio y confirma el avance de la persona.' },
      { icono: '🤝', titulo: 'Para quien acompaña', texto: 'Docentes y familiares pueden seguir la actividad aunque no lean braille.' }
    ],
    dirigidoA: ['Escuelas y unidades educativas', 'Fundaciones y asociaciones', 'Familias'],
    mensajeWhatsApp: 'Hola JPC Electronics, quiero información sobre la Plataforma de Kits Interactivos.'
  },
  {
    id: 'equipos-didacticos',
    titulo: 'Equipos Médicos Didácticos',
    etiqueta: 'Diseño y fabricación',
    imagen: 'assets/imagenes/servicios/foto-equipos-didacticos.webp',
    resumen:
      'Diseñamos y fabricamos equipos médicos didácticos para que estudiantes de electromedicina e ingeniería biomédica ' +
      'aprendan con equipos funcionales, abiertos y seguros.',
    puntos: [
      { icono: '🩺', titulo: 'Equipos funcionales', texto: 'Basados en los equipos que fabricamos y mantenemos en hospitales.' },
      { icono: '🔧', titulo: 'Hechos a medida', texto: 'Se adaptan al plan de estudios y al laboratorio de cada institución.' },
      { icono: '📘', titulo: 'Con prácticas', texto: 'Entregamos guías de práctica y capacitación al personal docente.' }
    ],
    dirigidoA: ['Universidades', 'Institutos tecnológicos', 'Centros de capacitación'],
    videos: [{
      vertical: true,
      etiqueta: 'Prototipo en video',
      src: 'assets/videos/electrobisturi-didactico.mp4',
      portada: 'assets/imagenes/servicios/electrobisturi-didactico-portada.webp',
      titulo: 'Electrobisturí didáctico monopolar · en desarrollo',
      parrafos: [
        'En Ingeniería Biomédica se estudia la electrocirugía, pero casi nunca hay un equipo para abrirlo, medirlo ' +
          'y entender qué pasa en cada etapa.',
        'Por eso estamos diseñando un electrobisturí monopolar didáctico: cuatro modos (PURE, BLEND, FULG y SPRAY), ' +
          'una pantalla táctil para operarlo y otra para ver las señales, y puntos de prueba en cada placa para que ' +
          'el estudiante mida lo que la teoría explica.',
        'Antes de construirlo lo simulamos paso a paso: formas de onda, potencias, protecciones y monitoreo del ' +
          'electrodo de retorno (REM). Hoy la interfaz ya funciona y el diseño electrónico avanza.'
      ],
      destacado: 'Equipo de uso exclusivo para laboratorio y docencia, no para pacientes. ¿Eres docente o coordinas ' +
        'una carrera de Ingeniería Biomédica o Electrónica? Escríbenos y conversemos.'
    }],
    mensajeWhatsApp: 'Hola JPC Electronics, quiero información sobre equipos médicos didácticos.'
  },
  {
    id: 'paginas-web',
    titulo: 'Desarrollo de Páginas Web y Software',
    etiqueta: 'Software a medida',
    imagen: 'assets/imagenes/servicios/foto-paginas-web.webp',
    resumen:
      'Creamos páginas web, aplicaciones y software a medida: sitios con catálogo que usted mismo administra y ' +
      'sistemas para hospitales, como la gestión del mantenimiento y la metrología de equipos médicos.',
    puntos: [
      { icono: '🛒', titulo: 'Catálogo administrable', texto: 'Suba productos, fotos y precios desde un panel, sin programar.' },
      { icono: '📱', titulo: 'Pensada para celular', texto: 'La mayoría de sus clientes la verá desde el teléfono.' },
      { icono: '🌐', titulo: 'Dominio y publicación', texto: 'Le guiamos para tener su propio dominio y mantener el sitio en línea.' }
    ],
    dirigidoA: ['Pequeñas y medianas empresas', 'Profesionales independientes', 'Emprendimientos'],
    portafolio: [
      { nombre: 'JPC Electronics', tipo: 'Sitio corporativo', imagen: 'assets/imagenes/portafolio/jpc.webp',
        url: 'https://jpcelectronics-52996.web.app', descripcion: 'Este mismo sitio: catálogo, logros, prototipos y panel de administración.' },
      { nombre: 'Inmobiliaria Fenix EC', tipo: 'Inmobiliaria', imagen: 'assets/imagenes/portafolio/fenix.webp',
        url: 'https://finalinmobiliaria.web.app', descripcion: 'Catálogo de propiedades administrable, con contacto por WhatsApp.' },
      { nombre: 'Fenix EC Suite', tipo: 'Sistema interno', imagen: 'assets/imagenes/portafolio/fenix-suite.webp',
        url: 'https://fenix-ec-suite.web.app', descripcion: 'Captación de propiedades en campo y cola de aprobación para publicar.' },
      { nombre: 'Inmobiliaria Happy Home', tipo: 'Inmobiliaria', imagen: 'assets/imagenes/portafolio/happy-home.webp',
        url: 'https://inmobiliaria-happy-home.web.app', descripcion: 'Sitio con catálogo de propiedades y panel para el equipo.' },
      { nombre: 'Realtor VIP Cuenca', tipo: 'Demo inmobiliaria', imagen: 'assets/imagenes/portafolio/realtor-vip.webp',
        descripcion: 'Demostración de sitio inmobiliario con la identidad de la marca.' },
      { nombre: 'Vive Feliz Real Estate', tipo: 'Demo inmobiliaria', imagen: 'assets/imagenes/portafolio/vive-feliz.webp',
        descripcion: 'Demostración de sitio inmobiliario con la identidad de la marca.' },
      { nombre: 'MasterBeauty', tipo: 'Escuela de belleza', imagen: 'assets/imagenes/portafolio/masterbeauty.webp',
        url: 'https://master-beauty-jpc.web.app', descripcion: 'Sitio con cursos, portafolio y contacto directo por WhatsApp.' },
      { nombre: 'Gabriel Garaban (@garabanto)', tipo: 'Portafolio de artista', imagen: 'assets/imagenes/portafolio/garabanto.webp',
        descripcion: 'Portafolio de diseño gráfico e ilustración con galería filtrable y animaciones.' }
    ],
    videos: [
      {
        src: 'assets/videos/software-mantenimiento.mp4',
        portada: 'assets/imagenes/servicios/software-mantenimiento-portada.jpg',
        titulo: 'Software de gestión de mantenimiento de equipos médicos',
        parrafos: [
          'Sistema web para departamentos de Ingeniería Clínica: inventario de equipos por áreas, solicitudes de ' +
            'mantenimiento, órdenes de trabajo, cronograma de preventivos, indicadores y calidad y seguridad.',
          'Lo desarrollamos a partir de la experiencia de nuestro fundador en la gestión de equipos médicos hospitalarios.'
        ]
      },
      {
        vertical: true,
        src: 'assets/videos/software-mantenimiento-empresas.mp4',
        portada: 'assets/imagenes/servicios/software-mantenimiento-empresas-portada.jpg',
        titulo: 'Software de mantenimiento preventivo para empresas de servicio',
        parrafos: [
          'Pensado para empresas privadas que dan mantenimiento a equipos médicos: código QR por equipo, reporte de ' +
            'fallas, inventario e historial, planificación de preventivos, indicadores de gestión, priorización con ' +
            'AHP e informes en PDF.'
        ]
      },
      {
        src: 'assets/videos/software-metrologia.mp4',
        portada: 'assets/imagenes/servicios/software-metrologia-portada.jpg',
        titulo: 'Software de metrología y calibración',
        parrafos: [
          'Gestiona calibraciones de equipos médicos paso a paso: equipos patrón, toma de lecturas, cálculo de la ' +
            'incertidumbre e informe en PDF, además de intervalos de calibración, riesgos y auditorías.'
        ]
      }
    ],
    mensajeWhatsApp: 'Hola JPC Electronics, quiero información sobre el desarrollo de una página web o un software.'
  },
  {
    id: 'asesoria-tesis',
    titulo: 'Asesoría de Tesis',
    etiqueta: 'Grado y posgrado',
    imagen: 'assets/imagenes/servicios/foto-asesoria-tesis.webp',
    resumen:
      'Acompañamiento técnico para trabajos de titulación de grado y posgrado en electrónica y bioingeniería, ' +
      'desde la idea hasta el prototipo funcionando.',
    puntos: [
      { icono: '💡', titulo: 'Planteamiento', texto: 'Ayuda para definir un tema viable, con objetivos y alcance claros.' },
      { icono: '🔌', titulo: 'Prototipo', texto: 'Orientación en diseño electrónico, programación y pruebas en nuestro laboratorio.' },
      { icono: '📊', titulo: 'Validación', texto: 'Apoyo para medir, analizar resultados y presentarlos con rigor.' }
    ],
    dirigidoA: ['Estudiantes de grado', 'Estudiantes de maestría', 'Docentes investigadores'],
    nota: 'Es un acompañamiento técnico: el trabajo y la autoría son siempre del estudiante.',
    mensajeWhatsApp: 'Hola JPC Electronics, quiero información sobre la asesoría de tesis.'
  },
  {
    id: 'incubadora',
    titulo: 'Incubadora de Emprendimientos',
    etiqueta: 'Guía para emprendedores',
    imagen: 'assets/imagenes/servicios/foto-incubadora.webp',
    resumen:
      'Compartimos lo que aprendimos al llevar nuestros propios equipos del laboratorio al mercado: ' +
      'una guía paso a paso para convertir una idea en un emprendimiento.',
    puntos: [
      { icono: '🧭', titulo: 'Modelo de negocio', texto: 'Cliente, propuesta de valor, costos y precio, con herramientas prácticas.' },
      { icono: '🛠️', titulo: 'Del prototipo al producto', texto: 'Apoyo técnico para validar y mejorar el prototipo.' },
      { icono: '🎤', titulo: 'Pitch y capital', texto: 'Preparación para concursos, incubadoras e inversionistas.' }
    ],
    dirigidoA: ['Emprendedores', 'Estudiantes con proyectos', 'Profesionales con una idea'],
    nota: 'Estamos desarrollando un software propio para acompañar cada etapa del proceso.',
    mensajeWhatsApp: 'Hola JPC Electronics, quiero información sobre la incubadora de emprendimientos.'
  }
];
