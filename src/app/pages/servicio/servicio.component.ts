import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { SERVICIOS, Servicio, WHATSAPP_JPC } from './servicios.data';

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './servicio.component.html'
})
export class ServicioComponent {
  private route = inject(ActivatedRoute);

  readonly servicio = toSignal(
    this.route.paramMap.pipe(map(p => SERVICIOS.find(s => s.id === p.get('id')))),
    { initialValue: undefined as Servicio | undefined }
  );

  readonly otros = SERVICIOS;

  enlaceWhatsApp(s: Servicio): string {
    return `https://wa.me/${WHATSAPP_JPC}?text=${encodeURIComponent(s.mensajeWhatsApp)}`;
  }
}
