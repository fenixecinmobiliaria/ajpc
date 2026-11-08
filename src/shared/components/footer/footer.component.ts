import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SERVICIOS } from '../../../app/pages/servicio/servicios.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  private sanitizer = inject(DomSanitizer);

  public currentYear: number = new Date().getFullYear();
  public readonly servicios = SERVICIOS;

  // Contacto oficial de JPC Electronics (Ing. Patricio Campozano).
  public jpcPhone: string = '098 092 9669';
  public jpcWhatsApp: string = 'https://wa.me/593980929669?text=' + encodeURIComponent('Hola JPC Electronics, vi su sitio web y quiero información.');
  public jpcEmail: string = 'jpcelectronics2025@gmail.com';
  public jpcFacebook: string = 'JPC ELECTRONICS';
  // Por seguridad solo se muestra la zona (Urb. El Cebollar), no la dirección exacta.
  public ubicacion: string = 'Urb. El Cebollar, Cuenca';
  public googleMapsSearch: string = 'https://www.google.com/maps/search/?api=1&query=El+Cebollar,+Cuenca,+Ecuador';

  public mapEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://maps.google.com/maps?q=El+Cebollar,+Cuenca,+Ecuador&z=14&output=embed'
  );
}
