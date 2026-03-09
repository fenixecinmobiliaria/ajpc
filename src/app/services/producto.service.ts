import { Injectable, inject , NgZone} from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, docData, updateDoc} from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';
import { Storage, ref, listAll, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { addDoc } from 'firebase/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { query, where, getDocs } from 'firebase/firestore';
import { Producto } from '../../models/producto';


@Injectable({ providedIn: 'root' })
export class ProductoService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private auth = inject(Auth);
  private ngZone = inject(NgZone);


  getProducto(): Observable<Producto[]> {
    const productoRef = collection(this.firestore, 'Productos');
    return collectionData(productoRef, { idField: 'id' }) as Observable<Producto[]>;
  }

  getImagenesProductoRef(folderPath: string): Observable<string[]> {
    if (!folderPath) return from([[]]);
    const folderRef = ref(this.storage, folderPath);

    return from(listAll(folderRef)).pipe(
      switchMap(result => {
        const item = result.items[0];
        return item
          ? from(getDownloadURL(item)).pipe(map(url => [url]))
          : from([[]]);
      })
    );
  }


  getProductoRefPorId(id: string) {
    const docRef = doc(this.firestore, 'Productos', id);
    return docData(docRef) as Observable<Producto>;
  }

  actualizarProducto(id: string, data: any) {
    const docRef = doc(this.firestore, 'Productos', id);
    return updateDoc(docRef, data);
  }

  eliminarProducto(id: string) {
    const docRef = doc(this.firestore, 'Productos', id);
    return (async () => {
      try {
        const producto = await firstValueFrom(docData(docRef) as Observable<any>);
        const fotoPath = producto?.fotoPath;
        if (fotoPath) {
          try {
            await this.deleteFile(fotoPath);
          } catch (err) {
            console.warn('eliminarProducto: could not delete storage file', fotoPath, err);
          }
        }
      } catch (err) {
        console.warn('eliminarProducto: could not read product before delete', err);
      }

      return deleteDoc(docRef);
    })();
  }


  actualizarImagenesProducto(id: string, nuevasImagenes: string[]) {
    const docRef = doc(this.firestore, 'Productos', id);
    return updateDoc(docRef, {
      imagenes: nuevasImagenes
    });
  }

  verificarCodigoExiste(codigo: string): Promise<boolean> {
    const codigoNormalizado = codigo.trim().toLowerCase();
    const propiedadesRef = collection(this.firestore, 'Productos');
    const consulta = query(propiedadesRef, where('IPD', '==', codigoNormalizado));
    return getDocs(consulta).then(snapshot => !snapshot.empty);
  }

  crearProducto(producto: Producto): Promise<void> {
    const propiedadesRef = collection(this.firestore, 'Productos');

    return addDoc(propiedadesRef, {
      ...producto,
    }).then(() => {});
  }

  async deleteFile(filePath: string): Promise<void> {
    if (!filePath) return;
    try {
      const fileRef = ref(this.storage, filePath);
      try {
        const user = this.auth.currentUser;
        console.log('deleteFile: currentUser uid=', user?.uid);
        if (user && typeof (user as any).getIdToken === 'function') {
          try {
            const token = await (user as any).getIdToken();
            console.log('deleteFile: idToken (first 40 chars)=', token?.substring?.(0,40));
          } catch (tErr) {
            console.warn('deleteFile: could not get idToken', tErr);
          }
        }
      } catch (logErr) {
        console.warn('deleteFile: auth logging error', logErr);
      }

      await deleteObject(fileRef);
    } catch (error) {
      console.warn('deleteFile: could not delete storage object', filePath, error);
      throw error;
    }
  }





}
