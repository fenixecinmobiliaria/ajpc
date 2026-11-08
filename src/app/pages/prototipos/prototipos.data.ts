/**
 * Prototipos de JPC Electronics desarrollados con tecnología propia.
 *
 * Reglas de redacción (marca JPC):
 * - Son PROTOTIPOS FUNCIONALES: nada de "a la venta", "disponible" ni precios (sin registro ARCSA todavía).
 * - La inteligencia artificial va siempre "en desarrollo": "estamos desarrollando…", nunca "detecta" ni "diagnostica".
 * - INGENIATEC 2016 se nombra "junto a FERROMÉDICA".
 *
 * Para agregar un prototipo: copie un bloque, cambie los datos y ponga la foto en
 * src/assets/imagenes/prototipos/ (webp de unos 1000 px).
 */
export interface Prototipo {
  id: string;
  nombre: string;
  categoria: string;
  imagen: string;
  /** Cómo se encuadra la foto: 'cover' la recorta, 'contain' la muestra entera. */
  ajuste?: 'cover' | 'contain';
  resumen: string;
  innovaciones: string[];
  /** Línea de desarrollo que se destaca aparte. */
  enDesarrollo?: { titulo: string; texto: string; ia?: boolean };
}

export const PROTOTIPOS: Prototipo[] = [
  {
    id: 'avatar',
    nombre: 'AVATAR · Lámpara de fototerapia',
    categoria: 'Neonatología',
    imagen: 'assets/imagenes/prototipos/avatar-lampara-fototerapia.webp',
    resumen: 'Lámpara de fototerapia neonatal de diseño propio para el tratamiento de la ictericia en recién nacidos.',
    innovaciones: [
      'Control electrónico propio con pantalla y temporización de cada sesión de tratamiento',
      'Dos versiones funcionando: con Raspberry Pi y pantalla Nextion, y con Arduino Mega y pantalla TFT',
      'Lámpara ganadora INGENIATEC 2016 · junto a FERROMÉDICA',
      'Certificados de eficiencia del Hospital del Río y del IESS Machala'
    ],
    enDesarrollo: {
      ia: true,
      titulo: 'Inteligencia artificial · en desarrollo',
      texto: 'Estamos desarrollando un módulo de inteligencia artificial que analiza imágenes de la piel del recién nacido ' +
        'para apoyar la estimación de la ictericia sin punciones, pensado para integrarse a la lámpara.'
    }
  },
  {
    id: 'servocuna',
    nombre: 'Servocuna neonatal inteligente',
    categoria: 'Neonatología',
    imagen: 'assets/imagenes/prototipos/servocuna.webp',
    resumen: 'Servocuna neonatal modular con monitoreo integrado del recién nacido y control de temperatura.',
    innovaciones: [
      'Dos pantallas táctiles: una para el control del equipo y otra con el tablero de monitoreo',
      'Arquitectura propia con Raspberry Pi 5, ESP32 y STM32',
      'Sensores de temperatura sin contacto, oximetría y frecuencia cardiaca, balanza, luz, temperatura y humedad ambiente',
      'Cámara térmica para observar la distribución de temperatura'
    ],
    enDesarrollo: {
      ia: true,
      titulo: 'Inteligencia artificial · en desarrollo',
      texto: 'Estamos desarrollando funciones de inteligencia artificial para apoyar el monitoreo del neonato, ' +
        'como el análisis de imágenes térmicas y de la piel.'
    }
  },
  {
    id: 'medibed',
    nombre: 'MEDIBED 5F · Cama de cuidados intensivos',
    categoria: 'Hospitalización y UCI',
    imagen: 'assets/imagenes/prototipos/medibed-5f.webp',
    resumen: 'Cama hospitalaria eléctrica de 5 funciones para cuidados intensivos, con control electrónico propio.',
    innovaciones: [
      '5 movimientos motorizados controlados desde un panel táctil con Raspberry Pi 5',
      'Balanza integrada para pesar al paciente sin moverlo de la cama',
      'Batería de respaldo de 2 horas',
      'Controles y tarjetas electrónicas diseñados por JPC'
    ],
    enDesarrollo: {
      titulo: 'Monitor de diuresis · en desarrollo',
      texto: 'Estamos desarrollando un monitor de diuresis por pesaje de la bolsa recolectora, con alertas tempranas ' +
        'y una central para seguir hasta 15 camas de UCI.'
    }
  },
  {
    id: 'nexus',
    nombre: 'NEXUS · Tracción lumbar y cervical',
    categoria: 'Rehabilitación',
    imagen: 'assets/imagenes/prototipos/nexus-traccion.webp',
    resumen: 'Equipo de tracción lumbar y cervical automatizado.',
    innovaciones: [
      'Control neumático de la fuerza de tracción con pantalla táctil de 7" y Raspberry Pi 5',
      'Protecciones de seguridad: sobrepresión, falla de electroválvula y purga antes de terminar',
      'Nació en 2013 como tesis en la Universidad del Azuay y se ha usado con pacientes desde 2014',
      'Desarrollado en alianza con ORTHOSA Lab'
    ]
  },
  {
    id: 'es01',
    nombre: 'ES01 · Esterilizador en seco',
    categoria: 'Esterilización',
    imagen: 'assets/imagenes/prototipos/esterilizador-es01.webp',
    resumen: 'Esterilizador de calor seco para instrumental, con control electrónico propio.',
    innovaciones: [
      'Dos unidades funcionando: una con ESP32 y otra con Arduino Mega',
      'Pantalla táctil y control de temperatura y tiempos de cada ciclo',
      'Pruebas de uniformidad de temperatura en 9 puntos de la cámara'
    ]
  },
  {
    id: 'sillon',
    nombre: 'Sillón multipropósito',
    categoria: 'Consulta y procedimientos',
    imagen: 'assets/imagenes/prototipos/sillon-multiproposito.webp',
    resumen: 'Sillón clínico motorizado para consulta y procedimientos.',
    innovaciones: [
      'Movimientos controlados desde una aplicación móvil',
      'Control de los movimientos por comandos de voz',
      'Tarjetas de control diseñadas por JPC'
    ]
  },
  {
    id: 'sillon-ginecologico',
    nombre: 'Sillón ginecológico eléctrico',
    categoria: 'Consulta y procedimientos',
    imagen: 'assets/imagenes/prototipos/sillon-ginecologico.webp',
    resumen: 'Sillón ginecológico motorizado para consulta y procedimientos, con control electrónico propio.',
    innovaciones: [
      'Respaldo, asiento y altura motorizados',
      'Control con pedal para dejar las manos libres del profesional',
      'Tarjetas de control diseñadas por JPC'
    ]
  },
  {
    id: 'lavamanos',
    nombre: 'Lavamanos quirúrgico',
    categoria: 'Quirófano',
    imagen: 'assets/imagenes/prototipos/lavamanos-quirurgico.webp',
    resumen: 'Lavamanos quirúrgico con control electrónico propio, funcionando en nuestro laboratorio.',
    innovaciones: [
      'Control electrónico diseñado por JPC'
    ]
  },
  {
    id: 'ambulancias',
    nombre: 'Automatización de ambulancias',
    categoria: 'Unidades móviles',
    imagen: 'assets/imagenes/prototipos/automatizacion-ambulancias.webp',
    resumen: 'Sistema electrónico propio para automatizar el habitáculo médico de ambulancias.',
    innovaciones: [
      'Automatizamos 9 ambulancias que operan en 5 provincias del Ecuador desde 2014',
      'Diseño de tarjetas y controles para el equipamiento de la unidad'
    ]
  }
];
