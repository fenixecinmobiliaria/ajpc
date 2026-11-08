import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subscription, take } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { SERVICIOS } from '../servicio/servicios.data';
import { LOGROS_ORDENADOS } from '../logros/logros.data';

/** Una diapositiva del carrusel de la portada. */
interface Diapositiva {
  src: string;
  titulo: string;
  subtitulo: string;
  categoria: string;
  /** true: la foto llena el marco (banners); false: se muestra entera (fotos de producto). */
  llenar: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  /** Los 5 servicios nuevos, que van debajo de las 6 tarjetas originales. */
  readonly servicios = SERVICIOS;
  /** Los 3 logros más recientes para la portada; la lista completa está en /logros. */
  readonly logros = LOGROS_ORDENADOS.slice(0, 3);

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  /** Banners de las ambulancias; las fotos de equipos del catálogo se agregan al cargar. */
  diapositivas: Diapositiva[] = [1, 2, 3, 4, 5].map(n => ({
    src: `assets/ambu/Ambu${n}.webp`,
    titulo: 'Unidades Móviles',
    subtitulo: 'Equipamiento de alta complejidad para emergencias.',
    categoria: 'Ambulancia',
    llenar: true
  }));
  indiceActual = 0;
  private carouselInterval: any;
  private pausado = false;
  private productosSub?: Subscription;
  private productoService = inject(ProductoService);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Una foto por equipo del catálogo (sin ambulancias, que ya tienen banner), intercaladas con los banners.
    this.productosSub = this.productoService.getProducto().pipe(take(1)).subscribe(productos => {
      const equipos: Diapositiva[] = productos
        .filter(p => p.foto && p.categoria !== 'Ambulancia')
        .map(p => ({
          src: p.foto,
          titulo: p.nombre.trim(),
          subtitulo: p.categoria,
          categoria: p.categoria,
          llenar: false
        }));
      const banners = this.diapositivas.filter(d => d.llenar);
      const mezcla: Diapositiva[] = [];
      for (let i = 0; i < Math.max(banners.length, equipos.length); i++) {
        if (banners[i]) mezcla.push(banners[i]);
        if (equipos[i]) mezcla.push(equipos[i]);
      }
      this.diapositivas = mezcla;
      this.indiceActual = Math.min(this.indiceActual, mezcla.length - 1);
    });
  }

  ngAfterViewInit(): void {
    this.carouselInterval = setInterval(() => { if (!this.pausado) this.siguiente(); }, 4000);

    if (this.videoPlayer?.nativeElement) {
      const video = this.videoPlayer.nativeElement;
      video.muted = true;
      video.volume = 0;
      video.play().catch(() => {});
    }
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) clearInterval(this.carouselInterval);
    this.productosSub?.unsubscribe();
  }

  siguiente(): void {
    this.indiceActual = (this.indiceActual + 1) % this.diapositivas.length;
  }

  anterior(): void {
    this.indiceActual = (this.indiceActual - 1 + this.diapositivas.length) % this.diapositivas.length;
  }

  irA(i: number): void {
    this.indiceActual = i;
  }

  pausar(valor: boolean): void {
    this.pausado = valor;
  }

  navigateToCatalogo(category: string): void {
    this.router.navigate(['/catalogo'], { queryParams: { category: category } });
  }

  navegar(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
