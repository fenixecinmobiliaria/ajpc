import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LOGROS_ORDENADOS } from './logros.data';
import { WHATSAPP_JPC } from '../servicio/servicios.data';

@Component({
  selector: 'app-logros',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logros.component.html'
})
export class LogrosComponent implements OnDestroy {
  /** Baja hasta la tarjeta indicada en la dirección (#/logros#id o #/prototipos#id), también si ya estaba en la página. */
  private readonly route = inject(ActivatedRoute);
  private readonly sub = this.route.fragment.subscribe(f => {
    if (!f) return;
    // Salto directo, repetido cuando la página termina de acomodarse (imágenes, desplazamiento del router).
    for (const ms of [100, 500, 1200]) {
      setTimeout(() => document.getElementById(f)?.scrollIntoView({ block: 'start' }), ms);
    }
  });

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  readonly logros = LOGROS_ORDENADOS;
  readonly enlaceWhatsApp =
    `https://wa.me/${WHATSAPP_JPC}?text=` +
    encodeURIComponent('Hola JPC Electronics, vi sus logros en la web y quiero conversar sobre una colaboración.');
}
