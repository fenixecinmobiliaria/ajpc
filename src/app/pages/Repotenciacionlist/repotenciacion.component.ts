import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';

interface VideoDisplay {
  id?: string;
  title: string;
  rawUrl: string;
  sanitizedUrl: SafeResourceUrl;
}

@Component({
  selector: 'app-repotenciacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './repotenciacion.component.html',
  styleUrls: ['./repotenciacion.component.css']
})
export class RepotenciacionComponent implements OnInit {
  videos: VideoDisplay[] = [];
  isAdmin = false;
  showAdminSection = false;

  newVideoTitleForAdd = '';
  newVideoUrlForAdd = '';

  editingVideoId: string | null = null;
  currentVideoTitle = '';
  currentVideoUrl = '';

  // sección que se usará en AuthService -> 'potenciacion'
  private readonly section: 'potenciacion' = 'potenciacion';

  constructor(private domSanitizer: DomSanitizer, private authService: AuthService) {}

  ngOnInit(): void {
    // cargar videos al inicio
    this.loadVideos();

    // detectar rol admin
    this.authService.authState$.subscribe(async (user: User | null) => {
      if (user) {
        this.isAdmin = await this.authService.checkUserRole(user.uid);
      } else {
        this.isAdmin = false;
      }
    });
  }

  /** Convierte URL normal a embed (YouTube) */
  private convertToEmbedUrl(url: string): string {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    return url;
  }

  /** Carga videos desde la colección 'potenciacionVideos' */
  async loadVideos(): Promise<void> {
    try {
      const firebaseVideos = await this.authService.getVideos(this.section);
      this.videos = firebaseVideos.map(video => ({
        id: video.id,
        title: video.title,
        rawUrl: video.url,
        sanitizedUrl: this.domSanitizer.bypassSecurityTrustResourceUrl(this.convertToEmbedUrl(video.url))
      }));
    } catch (error) {
      console.error('Error loading videos (potenciacion):', error);
      alert('Error al cargar los videos. Inténtalo nuevamente.');
    }
  }

  /** Agregar nuevo video (solo admin) */
  async addVideo(): Promise<void> {
    if (!this.newVideoTitleForAdd || !this.newVideoUrlForAdd) {
      alert('Por favor ingrese el título y la URL del video.');
      return;
    }
    try {
      const embedUrl = this.convertToEmbedUrl(this.newVideoUrlForAdd);
      await this.authService.addVideo(this.section, { title: this.newVideoTitleForAdd, url: embedUrl });
      alert('✅ Video agregado correctamente.');
      this.newVideoTitleForAdd = '';
      this.newVideoUrlForAdd = '';
      await this.loadVideos();
    } catch (error) {
      console.error('Error adding video (potenciacion):', error);
      alert('❌ No se pudo agregar el video.');
    }
  }

  startEdit(video: VideoDisplay): void {
    this.editingVideoId = video.id || null;
    this.currentVideoTitle = video.title;
    this.currentVideoUrl = video.rawUrl;
  }

  cancelEdit(): void {
    this.editingVideoId = null;
    this.currentVideoTitle = '';
    this.currentVideoUrl = '';
  }

  /** Guardar cambios en video existente */
  async saveVideo(): Promise<void> {
    if (!this.currentVideoTitle || !this.currentVideoUrl) {
      alert('Por favor ingrese el título y la URL.');
      return;
    }
    try {
      if (!this.editingVideoId) {
        alert('No hay video seleccionado para editar.');
        return;
      }
      const embedUrl = this.convertToEmbedUrl(this.currentVideoUrl);
      await this.authService.updateVideo(this.section, this.editingVideoId, {
        title: this.currentVideoTitle,
        url: embedUrl
      });
      alert('✅ Video actualizado correctamente.');
      this.cancelEdit();
      await this.loadVideos();
    } catch (error) {
      console.error('Error saving video (potenciacion):', error);
      alert('❌ No se pudo guardar el video.');
    }
  }

  /** Eliminar video */
  async deleteVideo(videoId: string): Promise<void> {
    if (!confirm('¿Seguro que deseas eliminar este video?')) return;
    try {
      await this.authService.deleteVideo(this.section, videoId);
      alert('🗑️ Video eliminado correctamente.');
      await this.loadVideos();
    } catch (error) {
      console.error('Error deleting video (potenciacion):', error);
      alert('❌ No se pudo eliminar el video.');
    }
  }

  toggleAdminSection(): void {
    this.showAdminSection = !this.showAdminSection;
    if (this.showAdminSection && this.isAdmin) {
      this.loadVideos();
    }
  }
}
