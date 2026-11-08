/**
 * Logros de JPC Electronics.
 *
 * PARA AGREGAR UN LOGRO NUEVO: copie uno de los bloques { ... } de abajo, péguelo
 * al inicio de la lista y cambie los datos. La foto va en src/assets/imagenes/logros/
 * (de preferencia .webp de unos 1000 px). La página ordena los logros por año, del
 * más reciente al más antiguo.
 *
 * Reglas de redacción (marca JPC):
 * - INGENIATEC 2016 se nombra siempre "junto a FERROMÉDICA".
 * - Misión Emprende 593: "Top 100", nunca "finalista".
 * - Nada de "a la venta" ni precios: ningún equipo tiene registro ARCSA todavía.
 */
export type TipoLogro =
  | 'Reconocimiento' | 'Selección nacional' | 'Incubación' | 'Alianza' | 'Evento' | 'Medios'
  | 'Formación' | 'Trayectoria profesional';

export interface Logro {
  id: string;
  /** Año con el que se ordena (en un periodo, el año de inicio). */
  anio: number;
  /** Texto a mostrar en lugar del año, p. ej. '2009 – 2013'. */
  periodo?: string;
  tipo: TipoLogro;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen?: string;
  /** Emoji que se muestra cuando el logro aún no tiene foto. */
  icono?: string;
  /** Cómo se encuadra la foto en la tarjeta: 'cover' la recorta, 'contain' la muestra entera. */
  ajuste?: 'cover' | 'contain';
  enlace?: { texto: string; url: string };
}

export const LOGROS: Logro[] = [
  {
    id: 'kalary-open-2026',
    anio: 2026,
    tipo: 'Incubación',
    titulo: 'Kalary Open 2026',
    subtitulo: 'Universidad Católica de Cuenca',
    descripcion:
      'Participamos en Kalary Open con la Plataforma JPC de Kits Interactivos: AutiSense, SignPlay y Braille. ' +
      'Trabajamos en el desarrollo del prototipo y en la preparación de pilotos educativos.',
    imagen: 'assets/imagenes/logros/kalary-open-2026.webp',
    ajuste: 'cover'
  },
  {
    id: 'mision-emprende-593-2026',
    anio: 2026,
    tipo: 'Selección nacional',
    titulo: 'Misión Emprende 593',
    subtitulo: 'Top 100 de 3.500 postulaciones',
    descripcion:
      'Seleccionados entre los 100 mejores emprendimientos del país, de un total de 3.500 postulaciones. ' +
      'Una oportunidad para presentar nuestra propuesta de innovación.',
    imagen: 'assets/imagenes/logros/mision-emprende-593-2026.webp',
    ajuste: 'contain'
  },
  {
    id: 'maestria-ingenieria-biomedica-ups',
    anio: 2026,
    periodo: '2025 – 2026',
    tipo: 'Formación',
    titulo: 'Maestría en Ingeniería Biomédica',
    subtitulo: 'Universidad Politécnica Salesiana · Cuenca',
    descripcion:
      'Nuestro fundador aprobó con éxito todos los módulos de la maestría en Ingeniería Biomédica (bioingeniería) ' +
      'y está en la etapa final de su trabajo de titulación.',
    icono: '🧬'
  },
  {
    id: 'ingeniatec-2016',
    anio: 2016,
    tipo: 'Reconocimiento',
    titulo: 'INGENIATEC 2016',
    subtitulo: 'Premio a la lámpara de fototerapia',
    descripcion:
      'Lámpara ganadora INGENIATEC 2016 · junto a FERROMÉDICA. ' +
      'Un hito en nuestra trayectoria de desarrollo de tecnología médica.',
    imagen: 'assets/imagenes/logros/ingeniatec-2016.webp',
    ajuste: 'cover'
  },
  {
    id: 'iess-jose-carrasco-arteaga-2009-2013',
    anio: 2009,
    periodo: '2009 – 2013',
    tipo: 'Trayectoria profesional',
    titulo: 'Fundador de Ingeniería Clínica · IESS',
    subtitulo: 'Hospital de Especialidades José Carrasco Arteaga · Cuenca',
    descripcion:
      'El Ing. Patricio Campozano fue el primer ingeniero biomédico contratado por el Hospital José Carrasco Arteaga ' +
      'del IESS, hospital de tercer nivel de especialidades en Cuenca, y dejó fundado su Departamento de Ingeniería Clínica.',
    imagen: 'assets/imagenes/logros/hospital-jose-carrasco-arteaga.webp',
    ajuste: 'cover',
    icono: '🏥'
  },
  {
    id: 'uda-primera-promocion-2003',
    anio: 2003,
    tipo: 'Formación',
    titulo: 'Primera promoción de Ingeniería Electrónica',
    subtitulo: 'Universidad del Azuay · 2003',
    descripcion:
      'Nuestro fundador forma parte de la primera promoción de Ingenieros Electrónicos graduados en la ' +
      'Universidad del Azuay, en Cuenca.',
    // Foto del campus con el logo de la UDA solo como identificación del lugar (no implica alianza con JPC).
    imagen: 'assets/imagenes/logros/universidad-del-azuay.webp',
    ajuste: 'cover',
    icono: '🎓',
    enlace: { texto: 'Ver el título de Ingeniero Electrónico', url: 'assets/imagenes/logros/titulo-ingeniero-electronico-uda-2003.webp' }
  },
  {
    id: 'upm-especialista-2004',
    anio: 2004,
    tipo: 'Formación',
    titulo: 'Especialista en Ingeniería de Sistemas Internet y Móviles',
    subtitulo: 'Universidad Politécnica de Madrid · España · 2004',
    descripcion:
      'Título de especialización de posgrado (18,5 créditos) de la Universidad Politécnica de Madrid, ' +
      'que sumó formación internacional en sistemas de internet y comunicaciones móviles.',
    imagen: 'assets/imagenes/logros/titulo-especialista-upm-2004.webp',
    ajuste: 'contain',
    icono: '🎓'
  },
  {
    id: 'uda-tecnologo-1998',
    anio: 1998,
    tipo: 'Formación',
    titulo: 'Tecnólogo Industrial en Electrónica',
    subtitulo: 'Universidad del Azuay · 1998',
    descripcion:
      'Primer título de nuestro fundador en electrónica: el inicio de su formación técnica en la Universidad del Azuay.',
    imagen: 'assets/imagenes/logros/titulo-tecnologo-electronica-uda-1998.webp',
    ajuste: 'contain',
    icono: '🎓'
  }
];

/** Logros del más reciente al más antiguo (a igual año, se respeta el orden de la lista). */
export const LOGROS_ORDENADOS: Logro[] = [...LOGROS].sort((a, b) => b.anio - a.anio);
