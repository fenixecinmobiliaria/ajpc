import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../models/producto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { PROTOTIPOS } from '../prototipos/prototipos.data';

/** Categoría con la que los prototipos aparecen en el catálogo. */
export const CATEGORIA_PROTOTIPOS = 'Prototipo JPC';

/** Los 9 prototipos (ventana Prototipos) como tarjetas del catálogo; sin precios ni «disponible». */
const PROTOTIPOS_CATALOGO = PROTOTIPOS.map(p => ({
  id: 'proto-' + p.id,
  protoId: p.id,
  esPrototipo: true,
  nombre: p.nombre,
  descripcion: p.resumen,
  categoria: CATEGORIA_PROTOTIPOS,
  tipo: p.categoria,
  foto: p.imagen
}));

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements OnInit {
  private productoService = inject(ProductoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  allProducts: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedProduct: any | null = null;
  indicesImagenes: { [key: number]: number } = {};

  private ordenCategorias: { [key: string]: number } = {
    'Prototipo JPC': 0.5,
    'Ambulancia': 1,
    'Mobilirio Medico': 2,
    'Equipo Medico': 3,
    'Mobiliario Oficina': 4,
    'Utileria Medica': 5,
    'Diagnostico': 6
  };

  ngOnInit(): void {
    this.productoService.getProducto().subscribe({
      next: (products: Producto[]) => {
        this.allProducts = [...products, ...PROTOTIPOS_CATALOGO];
        this.route.queryParams.subscribe(params => {
          this.selectedCategory = params['category'] || '';
          this.applyFilters();
        });
      },
      error: (err) => console.error(err)
    });
  }

  applyFilters(): void {
    let products = [...this.allProducts];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      products = products.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.tipo.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term)
      );
    }

    if (this.selectedCategory !== '') {
      const cat = this.selectedCategory.toLowerCase();
      products = products.filter(p =>
        p.categoria.toLowerCase() === cat ||
        // Los prototipos también aparecen en «Equipo Médico».
        (p.esPrototipo && cat === 'equipo medico')
      );
    }

    products.sort((a, b) => {
      const pesoA = this.ordenCategorias[a.categoria] || 99;
      const pesoB = this.ordenCategorias[b.categoria] || 99;
      return pesoA - pesoB;
    });

    this.filteredProducts = products;

    this.filteredProducts.forEach((_, i) => {
      if (this.indicesImagenes[i] === undefined) {
        this.indicesImagenes[i] = 0;
      }
    });
  }

  filtrarPorCategoria(category: string): void {
    this.router.navigate(['/catalogo'], { queryParams: category ? { category } : {} });
  }

  selectProduct(product: any): void {
    if (product.esPrototipo) {
      this.router.navigate(['/prototipos'], { fragment: product.protoId });
      return;
    }
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }

  obtenerImagenUrl(producto: any, index: number): string {
    if (producto.fotos && producto.fotos.length > 0) {
      return producto.fotos[this.indicesImagenes[index] || 0];
    }
    return producto.foto || 'assets/logo.webp';
  }

  siguienteImagen(index: number, event: Event, max: number): void {
    event.stopPropagation();
    if (this.indicesImagenes[index] < max - 1) {
      this.indicesImagenes[index]++;
    } else {
      this.indicesImagenes[index] = 0;
    }
  }

  anteriorImagen(index: number, event: Event, max: number): void {
    event.stopPropagation();
    if (this.indicesImagenes[index] > 0) {
      this.indicesImagenes[index]--;
    } else {
      this.indicesImagenes[index] = max - 1;
    }
  }
}
