import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PROTOTIPOS } from './prototipos.data';
import { WHATSAPP_JPC } from '../servicio/servicios.data';

@Component({
  selector: 'app-prototipos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prototipos.component.html'
})
export class PrototiposComponent implements OnDestroy {
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

  readonly prototipos = PROTOTIPOS;
  readonly conIA = PROTOTIPOS.filter(p => p.enDesarrollo?.ia).length;
  readonly enlaceWhatsApp =
    `https://wa.me/${WHATSAPP_JPC}?text=` +
    encodeURIComponent('Hola JPC Electronics, vi sus prototipos en la web y quiero conversar sobre una colaboración o un piloto.');
}
