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
export type TipoLogro = 'Reconocimiento' | 'Selección nacional' | 'Incubación' | 'Alianza' | 'Evento' | 'Medios';

export interface Logro {
  id: string;
  anio: number;
  tipo: TipoLogro;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  imagen?: string;
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
  }
];

/** Logros del más reciente al más antiguo (a igual año, se respeta el orden de la lista). */
export const LOGROS_ORDENADOS: Logro[] = [...LOGROS].sort((a, b) => b.anio - a.anio);
