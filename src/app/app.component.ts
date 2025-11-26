import { Component, HostListener } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Producto } from '../models/producto';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { LoginModalComponent } from './pages/login-modal/login-modal.component'; 
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [LoginModalComponent, CommonModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inmobiliariafenix';
  properties: Producto[] = [];
  showLoginModal: boolean = false;
  isLoggedIn = false;
  isShrunk = false;

  // NUEVO: variable para menú móvil
  mobileMenuOpen: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.authState$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownAbierto = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isShrunk = window.scrollY > 5;
  }

  // ===== Métodos de navegación =====
  goToInicio(): void {
    this.router.navigateByUrl('/home');
    this.closeMobileMenu(); // cerrar menú en móvil al navegar
  }

  goToContacto(): void {
    this.router.navigateByUrl('/contacto');
    this.closeMobileMenu();
  }

  goToAcercaDe(): void {
    this.router.navigateByUrl('/acerca');
    this.closeMobileMenu();
  }

  goToMantenimiento(): void {
    this.router.navigateByUrl('/mantenimiento');
    this.closeMobileMenu();
  }

  goToCatalogo(): void {
    this.router.navigateByUrl('/catalogo');
    this.closeMobileMenu();
  }

  // ===== Modal Login =====
  openLoginModal() {
    console.log("Modal abierto");
    this.showLoginModal = true;
    this.closeMobileMenu(); // cerrar menú si estaba abierto
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  cerrarSesion() {
    this.authService.logOut();
    this.closeMobileMenu(); // cerrar menú al cerrar sesión
  }

  // ===== Dropdown =====
  dropdownAbierto = false;

  toggleDropdown() {
    this.dropdownAbierto = !this.dropdownAbierto;
  }

  filtrarPorTipo(tipo: string) {
    this.dropdownAbierto = false;
    this.router.navigate(['/catalogo'], {
      queryParams: { propertyType: tipo }
    });
  }

  // ===== NUEVO: Menú hamburguesa móvil =====
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
