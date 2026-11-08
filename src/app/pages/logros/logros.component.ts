import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LOGROS_ORDENADOS } from './logros.data';
import { WHATSAPP_JPC } from '../servicio/servicios.data';

@Component({
  selector: 'app-logros',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logros.component.html'
})
export class LogrosComponent {
  readonly logros = LOGROS_ORDENADOS;
  readonly enlaceWhatsApp =
    `https://wa.me/${WHATSAPP_JPC}?text=` +
    encodeURIComponent('Hola JPC Electronics, vi sus logros en la web y quiero conversar sobre una colaboración.');
}
