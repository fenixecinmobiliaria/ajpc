import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SERVICIOS } from '../../../app/pages/servicio/servicios.data';

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

  isDropdownOpen = false;

  closeMenu() {
    this.isDropdownOpen = false;
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  }
}
