import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SERVICIOS } from '../../../app/pages/servicio/servicios.data';
import { LOGROS_ORDENADOS } from '../../../app/pages/logros/logros.data';
import { PROTOTIPOS } from '../../../app/pages/prototipos/prototipos.data';

/** Opción de un menú desplegable. */
interface OpcionMenu {
  texto: string;
  ruta: string | string[];
  queryParams?: Record<string, string>;
  fragment?: string;
}

/** Pestaña del menú superior con su lista desplegable. */
interface MenuSuperior {
  id: string;
  texto: string;
  ruta: string;
  exacta?: boolean;
  ancho: string;
  opciones: OpcionMenu[];
}

/** Servicios técnicos de siempre (páginas propias). */
const ESPECIALIDADES: OpcionMenu[] = [
  { texto: '🛠 Mantenimiento', ruta: '/mantenimiento' },
  { texto: '🚀 Repotenciación', ruta: '/repotenciacion' },
  { texto: '⚙️ Diseño Inventor', ruta: '/diseno-inventor' },
  { texto: '🏭 Fabricación', ruta: '/fabricacion' },
  { texto: '🤝 Alianzas Estratégicas', ruta: '/alianzas-estrategicas' },
  { texto: '🏠 Domótica', ruta: '/domotica' }
];

const SERVICIOS_NUEVOS: OpcionMenu[] = SERVICIOS.map(s => ({ texto: s.titulo, ruta: ['/servicios', s.id] }));

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  readonly servicios = SERVICIOS;
  @Input() isLoggedIn = false;
  @Output() onLogin = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();

  /** Pestaña cuyo desplegable está abierto (escritorio). */
  abierto: string | null = null;

  readonly menus: MenuSuperior[] = [
    {
      id: 'inicio', texto: 'Inicio', ruta: '/home', exacta: true, ancho: 'w-72',
      opciones: [{ texto: '🏠 Ir al inicio', ruta: '/home' }, ...ESPECIALIDADES, ...SERVICIOS_NUEVOS]
    },
    {
      id: 'catalogo', texto: 'Catálogo', ruta: '/catalogo', ancho: 'w-64',
      opciones: [
        { texto: '🌐 Ver todo', ruta: '/catalogo' },
        { texto: '🚑 Ambulancias', ruta: '/catalogo', queryParams: { category: 'Ambulancia' } },
        { texto: '🩺 Equipo Médico', ruta: '/catalogo', queryParams: { category: 'Equipo Medico' } },
        { texto: '📦 Utilería Médica', ruta: '/catalogo', queryParams: { category: 'Utileria Medica' } },
        { texto: '🪑 Mobiliario Oficina', ruta: '/catalogo', queryParams: { category: 'Mobiliario Oficina' } },
        { texto: '🔬 Diagnóstico', ruta: '/catalogo', queryParams: { category: 'Diagnostico' } },
        { texto: '🏥 Mobiliario Médico', ruta: '/catalogo', queryParams: { category: 'Mobilirio Medico' } }
      ]
    },
    {
      id: 'logros', texto: 'Logros', ruta: '/logros', ancho: 'w-80',
      opciones: [
        { texto: '🏆 Ver todos los logros', ruta: '/logros' },
        ...LOGROS_ORDENADOS.map(l => ({ texto: `${l.periodo || l.anio} · ${l.titulo}`, ruta: '/logros', fragment: l.id }))
      ]
    },
    {
      id: 'prototipos', texto: 'Prototipos', ruta: '/prototipos', ancho: 'w-80',
      opciones: [
        { texto: '🔬 Ver todos los prototipos', ruta: '/prototipos' },
        ...PROTOTIPOS.map(p => ({ texto: p.nombre, ruta: '/prototipos', fragment: p.id }))
      ]
    },
    {
      id: 'especialidades', texto: 'Especialidades', ruta: '', ancho: 'w-64',
      opciones: [...ESPECIALIDADES, ...SERVICIOS_NUEVOS]
    }
  ];

  closeMenu() {
    this.abierto = null;
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  }
}
