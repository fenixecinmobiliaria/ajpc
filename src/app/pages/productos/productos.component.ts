import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductoService } from '../../services/producto.service'; // Corrected import name
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-productos',
  imports:[CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  videoActivo: string | null = null;

  constructor(
    private productoService: ProductoService, // Corrected service name
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.productoService.getProducto().subscribe((data: Producto[]) => { // Added type annotation for data
      this.productos = data;
    });
  }

  reproducirVideo(producto: Producto): void {
    // Use producto.id to determine if video is active, not a youtube URL
    this.videoActivo = producto.id || null;
  }

  sanitizarUrl(url: string): SafeResourceUrl {
    // This method is now used for image URLs.
    // Bypass security for the image URL.
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
