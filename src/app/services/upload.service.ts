import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface Upload {
  progress: number;
  downloadURL?: string;
  path?: string;
}

/** Lado más largo de la foto publicada. El catálogo la muestra a ~170–400 px. */
const MAX_LADO = 1200;
/** Por debajo de este tamaño la foto se sube tal cual. */
const UMBRAL_BYTES = 300 * 1024;
const CALIDAD = 0.82;

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private storage = inject(Storage);

  uploadFile(file: File): Observable<Upload> {
    return new Observable(observer => {
      let cancelado = false;
      let cancelarSubida: (() => void) | undefined;

      this.reducirImagen(file).then(archivo => {
        if (cancelado) return;
        const path = `productos/${Date.now()}_${archivo.name}`;
        const storageRef = ref(this.storage, path);
        const uploadTask = uploadBytesResumable(storageRef, archivo, { contentType: archivo.type });
        cancelarSubida = () => uploadTask.cancel();

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            observer.next({ progress });
          },
          (error) => {
            console.error('Upload error:', error);
            observer.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            observer.next({ progress: 100, downloadURL, path });
            observer.complete();
          }
        );
      });

      return () => {
        cancelado = true;
        cancelarSubida?.();
      };
    });
  }

  /**
   * Reduce fotos pesadas (p. ej. de celular, 3–5 MB) a MAX_LADO px antes de subirlas.
   * Si algo falla, o la versión reducida no pesa menos, se sube el archivo original.
   */
  private async reducirImagen(file: File): Promise<File> {
    const reducible = /^image\/(jpeg|png|webp|heic|heif)$/.test(file.type);
    if (!reducible || file.size <= UMBRAL_BYTES) return file;

    try {
      // createImageBitmap respeta la orientación EXIF de la cámara.
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      const escala = Math.min(1, MAX_LADO / Math.max(bitmap.width, bitmap.height));
      const ancho = Math.round(bitmap.width * escala);
      const alto = Math.round(bitmap.height * escala);

      const canvas = document.createElement('canvas');
      canvas.width = ancho;
      canvas.height = alto;
      const ctx = canvas.getContext('2d');
      if (!ctx) return file;
      ctx.drawImage(bitmap, 0, 0, ancho, alto);
      bitmap.close();

      // PNG y WebP pueden tener transparencia: se guardan en WebP. El resto, en JPG.
      const tipo = /png|webp/.test(file.type) ? 'image/webp' : 'image/jpeg';
      const blob = await new Promise<Blob | null>(ok => canvas.toBlob(ok, tipo, CALIDAD));
      if (!blob || blob.size >= file.size) return file;

      const extension = tipo === 'image/webp' ? 'webp' : 'jpg';
      const nombre = file.name.replace(/\.[^.]+$/, '') + '.' + extension;
      return new File([blob], nombre, { type: tipo, lastModified: Date.now() });
    } catch (error) {
      console.warn('No se pudo reducir la imagen; se sube la original.', error);
      return file;
    }
  }
}
