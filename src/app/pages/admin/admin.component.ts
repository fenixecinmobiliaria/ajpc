import { Component, OnInit, inject, NgZone } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload.service';

interface VideoDisplay {
  id?: string;
  title: string;
  description?: string;
  rawUrl: string;
  sanitizedUrl: SafeResourceUrl;
  categoryId: string;
  categoryName: string;
}

interface ImageItem {
  url: string;
  file?: File;
  path?: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  private productoService = inject(ProductoService);
  private ngZone = inject(NgZone);
  private authService: any = inject(AuthService);
  private uploadService = inject(UploadService);
  private domSanitizer = inject(DomSanitizer);

  public filteredProducts: any[] | null = null;

  productos: any[] = [];
  productoSeleccionado: any = { nombre: '', descripcion: '', categoria: '', tipo: '', foto: '' };
  isEditing = false;
  selectedProductId: string | null = null;
  indicesImagenes: { [key: number]: number } = {};

  categoriasDisponibles: string[] = [
    'Ambulancia', 'Equipo Medico', 'Utileria Medica',
    'Mobiliario Oficina', 'Diagnostico', 'Mobilirio Medico'
  ];

  imagenes: ImageItem[] = [];
  uploadProgress: number | null = null;
  isUploading = false;

  videos: VideoDisplay[] = [];
  isVideoEditing = false;
  editingVideoId: string | null = null;
  editingVideoCategoryId: string = '';

  newVideoTitle: string = '';
  newVideoUrl: string = '';
  newVideoCategory: string = 'maintenanceVideos';

  public ordenPrioridadVideos = [
    'potenciacionVideos',
    'designVideos',
    'fabricacionVideos',
    'alianzasVideos',
    'domoticaVideos',
    'maintenanceVideos'
  ];

  public seccionesClasificacion = [
    { id: 'maintenanceVideos', name: 'Mantenimiento' },
    { id: 'potenciacionVideos', name: 'Repotenciación' },
    { id: 'designVideos', name: 'Diseño 3D' },
    { id: 'fabricacionVideos', name: 'Fabricación' },
    { id: 'domoticaVideos', name: 'Domótica' },
    { id: 'alianzasVideos', name: 'Alianzas Estratégicas' }
  ];

  ngOnInit(): void {
    this.cargarProductos();
    this.loadVideos();
  }

  cargarProductos(): void {
    this.productoService.getProducto().subscribe(data => {
      this.ngZone.run(() => {
        this.productos = data;

        const categoriasUnicas = new Set(this.categoriasDisponibles);
        data.forEach((p: any) => {
          if (p.categoria && p.categoria.trim() !== '') {
            categoriasUnicas.add(p.categoria.trim());
          }
        });
        this.categoriasDisponibles = Array.from(categoriasUnicas);

        this.productos.forEach((_, i) => {
          if (this.indicesImagenes[i] === undefined) {
            this.indicesImagenes[i] = 0;
          }
        });
      });
    });
  }

  onCategoriaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement.value === 'ADD_NEW') {
      const nuevaCategoria = prompt('Ingrese el nombre de la nueva categoría:');
      if (nuevaCategoria && nuevaCategoria.trim() !== '') {
        const catLimpia = nuevaCategoria.trim();
        if (!this.categoriasDisponibles.includes(catLimpia)) {
          this.categoriasDisponibles.push(catLimpia);
        }
        this.productoSeleccionado.categoria = catLimpia;
      } else {
        this.productoSeleccionado.categoria = '';
      }
    }
  }

  eliminarCategoria(categoria: string): void {
    if (!categoria || categoria === 'ADD_NEW') return;

    const enUso = this.productos.some(p => p.categoria.toLowerCase() === categoria.toLowerCase());

    if (enUso) {
      alert(`Bloqueo de seguridad: No se puede eliminar la categoría "${categoria}" porque hay equipos en el inventario que la están utilizando.`);
      return;
    }

    if (confirm(`¿Eliminar definitivamente la categoría "${categoria}"?`)) {
      this.categoriasDisponibles = this.categoriasDisponibles.filter(c => c !== categoria);
      this.productoSeleccionado.categoria = '';
    }
  }

  async onSubmit(): Promise<void> {
    if (this.imagenes.length === 0) {
      alert('Se requiere al menos una imagen del equipo.');
      return;
    }

    if (this.isEditing && this.selectedProductId) {
      await this.actualizarProducto();
    } else {
      await this.crearProducto();
    }
  }

  async crearProducto(): Promise<void> {
    try {
      const urls: string[] = [];
      const paths: string[] = [];

      for (const img of this.imagenes) {
        if (img.file) {
          const uploadResult = await this.uploadImage(img.file);
          urls.push(uploadResult.downloadURL);
          paths.push(uploadResult.path);
        } else {
          urls.push(img.url);
          if (img.path) paths.push(img.path);
        }
      }

      this.productoSeleccionado.foto = urls.length > 0 ? urls[0] : '';
      this.productoSeleccionado.fotos = urls;
      this.productoSeleccionado.fotoPaths = paths;

      await this.productoService.crearProducto({ ...this.productoSeleccionado });
      this.resetForm();
      alert('Registro guardado correctamente');
    } catch (error) {
      alert('Error al crear el producto. Revisa los permisos.');
    }
  }

  async actualizarProducto(): Promise<void> {
    if (!this.selectedProductId) return;
    try {
      const currentProducto: any = await firstValueFrom(this.productoService.getProductoRefPorId(this.selectedProductId));
      const oldPaths = currentProducto?.fotoPaths || (currentProducto?.fotoPath ? [currentProducto.fotoPath] : []);

      const urls: string[] = [];
      const paths: string[] = [];

      for (const img of this.imagenes) {
        if (img.file) {
          const uploadResult = await this.uploadImage(img.file);
          urls.push(uploadResult.downloadURL);
          paths.push(uploadResult.path);
        } else {
          urls.push(img.url);
          if (img.path) paths.push(img.path);
        }
      }

      for (const oldPath of oldPaths) {
        if (!paths.includes(oldPath)) {
          try {
            await this.productoService.deleteFile(oldPath);
          } catch (e) {}
        }
      }

      this.productoSeleccionado.foto = urls.length > 0 ? urls[0] : '';
      this.productoSeleccionado.fotos = urls;
      this.productoSeleccionado.fotoPaths = paths;

      await this.productoService.actualizarProducto(this.selectedProductId, { ...this.productoSeleccionado, id: this.selectedProductId });
      this.resetForm();
      alert('Registro actualizado correctamente');
    } catch (error) {
      alert('Error al actualizar el producto.');
    }
  }

  editProduct(producto: any): void {
    this.cancelEditVideo();
    this.isEditing = true;
    this.selectedProductId = producto.id || null;
    this.productoSeleccionado = { ...producto };
    this.imagenes = [];

    if (producto.categoria && !this.categoriasDisponibles.includes(producto.categoria)) {
      this.categoriasDisponibles.push(producto.categoria);
    }

    const fotosArray = producto.fotos || (producto.foto ? [producto.foto] : []);
    const pathsArray = producto.fotoPaths || (producto.fotoPath ? [producto.fotoPath] : []);

    for (let i = 0; i < fotosArray.length; i++) {
      this.imagenes.push({ url: fotosArray[i], path: pathsArray[i] });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteProduct(id: string): void {
    if (confirm('¿Baja técnica definitiva del equipo?')) {
      this.productoService.eliminarProducto(id).then(() => this.cargarProductos());
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedProductId = null;
    this.productoSeleccionado = { nombre: '', descripcion: '', categoria: '', tipo: '', foto: '' };
    this.imagenes = [];
    this.uploadProgress = null;
    this.isUploading = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFiles = Array.from(input.files);
      const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024;

      for (const file of newFiles) {
        if (!acceptedTypes.includes(file.type)) {
          alert(`Formato inválido en ${file.name}. Use JPEG, PNG o WEBP.`);
          continue;
        }
        if (file.size > maxSize) {
          alert(`El archivo ${file.name} excede los 5MB.`);
          continue;
        }

        const reader = new FileReader();
        reader.onload = (e) => this.ngZone.run(() => {
          if (e.target?.result) {
            this.imagenes.push({ url: e.target.result as string, file: file });
          }
        });
        reader.readAsDataURL(file);
      }
      input.value = '';
    }
  }

  removeImage(index: number): void {
    this.imagenes.splice(index, 1);
  }

  private convertToEmbedUrl(url: string): string {
    if (!url) return '';
    if (url.includes('v=')) return `https://www.youtube.com/embed/${url.split('v=')[1].split('&')[0]}`;
    if (url.includes('youtu.be/')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
    return url;
  }

  async loadVideos(): Promise<void> {
    this.videos = [];
    try {
      const allFirebaseVideosPromises = this.seccionesClasificacion.map(sec =>
        this.authService.getVideos(sec.id as any).then((firebaseVideos: any[]) => ({
          secId: sec.id,
          secName: sec.name,
          firebaseVideos
        }))
      );

      const results = await Promise.all(allFirebaseVideosPromises);

      let tempVideos: VideoDisplay[] = [];
      results.forEach(result => {
        const mapped = result.firebaseVideos.map((video: any) => ({
          id: video.id,
          title: video.title,
          description: (video as any).description || '',
          rawUrl: video.url,
          sanitizedUrl: this.domSanitizer.bypassSecurityTrustResourceUrl(this.convertToEmbedUrl(video.url)),
          categoryId: result.secId,
          categoryName: result.secName
        }));
        tempVideos = [...tempVideos, ...mapped];
      });

      tempVideos.sort((a, b) => {
        const indexA = this.ordenPrioridadVideos.indexOf(a.categoryId);
        const indexB = this.ordenPrioridadVideos.indexOf(b.categoryId);
        const priorityA = indexA === -1 ? 999 : indexA;
        const priorityB = indexB === -1 ? 999 : indexB;
        return priorityA - priorityB;
      });

      this.videos = tempVideos;

    } catch (error) {
      console.error(error);
    }
  }

  async onSubmitVideo(): Promise<void> {
    if (!this.newVideoTitle || !this.newVideoUrl || !this.newVideoCategory) {
        alert('Título, URL y categoría son obligatorios.');
        return;
    }

    if (this.isVideoEditing && this.editingVideoId && this.editingVideoCategoryId) {
      await this.saveVideo();
    } else {
      await this.addVideo();
    }
  }

  async addVideo(): Promise<void> {
    try {
      const embedUrl = this.convertToEmbedUrl(this.newVideoUrl);

      const videoData: any = {
        title: this.newVideoTitle,
        url: embedUrl
      };

      await this.authService.addVideo(this.newVideoCategory as any, videoData);

      this.resetVideoForm();
      await this.loadVideos();
      alert('Evidencia de video registrada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al registrar el video.');
    }
  }

  startEditVideo(video: VideoDisplay): void {
    this.resetForm();
    this.isVideoEditing = true;
    this.editingVideoId = video.id || null;
    this.editingVideoCategoryId = video.categoryId;

    this.newVideoTitle = video.title;
    this.newVideoUrl = video.rawUrl;
    this.newVideoCategory = video.categoryId;

    const videoForm = document.getElementById('evidencia_form');
    if (videoForm) {
      videoForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  }

  cancelEditVideo(): void {
    this.resetVideoForm();
  }

  resetVideoForm(): void {
    this.isVideoEditing = false;
    this.editingVideoId = null;
    this.editingVideoCategoryId = '';
    this.newVideoTitle = '';
    this.newVideoUrl = '';
    this.newVideoCategory = 'maintenanceVideos';
  }

  async saveVideo(): Promise<void> {
    if (!this.editingVideoId || !this.editingVideoCategoryId) return;

    try {
      const embedUrl = this.convertToEmbedUrl(this.newVideoUrl);

      const updateData = {
        title: this.newVideoTitle,
        url: embedUrl
      };

      if (this.newVideoCategory !== this.editingVideoCategoryId) {
        await this.authService.deleteVideo(this.editingVideoCategoryId as any, this.editingVideoId);
        await this.authService.addVideo(this.newVideoCategory as any, updateData);
      } else {
        await this.authService.updateVideo(this.editingVideoCategoryId as any, this.editingVideoId, updateData);
      }

      this.resetVideoForm();
      await this.loadVideos();
      alert('Evidencia de video actualizada correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el video.');
    }
  }

  async deleteVideo(categoryId: string, id: string): Promise<void> {
    if (confirm('¿Eliminar registro definitivo del video?')) {
      try {
        await this.authService.deleteVideo(categoryId as any, id);
        if (this.isVideoEditing && this.editingVideoId === id) {
          this.resetVideoForm();
        }
        await this.loadVideos();
      } catch (error) {
        alert('Error al eliminar el video.');
      }
    }
  }

  uploadImage(file: File): Promise<{ downloadURL: string; path: string }> {
    return new Promise((resolve, reject) => {
      this.isUploading = true;
      this.uploadService.uploadFile(file).subscribe({
        next: (upload: any) => {
          this.ngZone.run(() => this.uploadProgress = upload.progress);
          if (upload.downloadURL && upload.path) {
            this.isUploading = false;
            resolve({ downloadURL: upload.downloadURL, path: upload.path });
          }
        },
        error: (err: any) => { this.isUploading = false; reject(err); }
      });
    });
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
