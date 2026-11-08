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
  /** Video vertical (reel) con su portada y una leyenda corta. */
  video?: { src: string; portada: string; titulo: string; leyenda: string };
  mensajeWhatsApp: string;
}

export const WHATSAPP_JPC = '593980929669';

export const SERVICIOS: Servicio[] = [
  {
    id: 'kits-interactivos',
    titulo: 'Plataforma de Kits Interactivos',
    etiqueta: 'Educación inclusiva',
    imagen: 'assets/imagenes/servicios/kits-interactivos.svg',
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
    imagen: 'assets/imagenes/servicios/equipos-didacticos.svg',
    resumen:
      'Diseñamos y fabricamos equipos médicos didácticos para que estudiantes de electromedicina e ingeniería biomédica ' +
      'aprendan con equipos funcionales, abiertos y seguros.',
    puntos: [
      { icono: '🩺', titulo: 'Equipos funcionales', texto: 'Basados en los equipos que fabricamos y mantenemos en hospitales.' },
      { icono: '🔧', titulo: 'Hechos a medida', texto: 'Se adaptan al plan de estudios y al laboratorio de cada institución.' },
      { icono: '📘', titulo: 'Con prácticas', texto: 'Entregamos guías de práctica y capacitación al personal docente.' }
    ],
    dirigidoA: ['Universidades', 'Institutos tecnológicos', 'Centros de capacitación'],
    video: {
      src: 'assets/videos/electrobisturi-didactico.mp4',
      portada: 'assets/imagenes/servicios/electrobisturi-didactico-portada.webp',
      titulo: 'Electrobisturí didáctico monopolar · en desarrollo',
      leyenda: 'Cuatro modos de operación, osciloscopio integrado, puntos de prueba en cada placa y alarma REM, ' +
        'pensado para aprender electrocirugía midiendo. Uso exclusivo de laboratorio y docencia.'
    },
    mensajeWhatsApp: 'Hola JPC Electronics, quiero información sobre equipos médicos didácticos.'
  },
  {
    id: 'paginas-web',
    titulo: 'Desarrollo de Páginas Web',
    etiqueta: 'Software a medida',
    imagen: 'assets/imagenes/servicios/paginas-web.svg',
    resumen:
      'Creamos páginas web y aplicaciones para negocios: sitios con catálogo que usted mismo administra, ' +
      'adaptados al celular y listos para recibir clientes por WhatsApp.',
    puntos: [
      { icono: '🛒', titulo: 'Catálogo administrable', texto: 'Suba productos, fotos y precios desde un panel, sin programar.' },
      { icono: '📱', titulo: 'Pensada para celular', texto: 'La mayoría de sus clientes la verá desde el teléfono.' },
      { icono: '🌐', titulo: 'Dominio y publicación', texto: 'Le guiamos para tener su propio dominio y mantener el sitio en línea.' }
    ],
    dirigidoA: ['Pequeñas y medianas empresas', 'Profesionales independientes', 'Emprendimientos'],
    mensajeWhatsApp: 'Hola JPC Electronics, quiero información sobre el desarrollo de una página web.'
  },
  {
    id: 'asesoria-tesis',
    titulo: 'Asesoría de Tesis',
    etiqueta: 'Grado y posgrado',
    imagen: 'assets/imagenes/servicios/asesoria-tesis.svg',
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
    imagen: 'assets/imagenes/servicios/incubadora.svg',
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
