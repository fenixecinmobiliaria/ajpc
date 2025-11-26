import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

export interface Upload {
  progress: number;
  downloadURL?: string;
  path?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private storage = inject(Storage);

  uploadFile(file: File): Observable<Upload> {
    const timestamp = Date.now();
    const path = `productos/${timestamp}_${file.name}`;
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Observable(observer => {
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
  }
}
