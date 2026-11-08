import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PROTOTIPOS } from './prototipos.data';
import { WHATSAPP_JPC } from '../servicio/servicios.data';

@Component({
  selector: 'app-prototipos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prototipos.component.html'
})
export class PrototiposComponent {
  readonly prototipos = PROTOTIPOS;
  readonly conIA = PROTOTIPOS.filter(p => p.enDesarrollo?.ia).length;
  readonly enlaceWhatsApp =
    `https://wa.me/${WHATSAPP_JPC}?text=` +
    encodeURIComponent('Hola JPC Electronics, vi sus prototipos en la web y quiero conversar sobre una colaboración o un piloto.');
}
