import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../core/firebaseConfig';

export interface Photo {
  id?: string;
  url: string;
  createdAt: Date;
  userId: string;
  category: string;
}

export class CameraService {
  private storage = getStorage();

  async takePicture(source: CameraSource = CameraSource.Camera): Promise<string> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: source,
    });

    if (!image.webPath) {
      throw new Error('No se pudo obtener la imagen');
    }

    return image.webPath;
  }

  async uploadPhoto(photoUri: string, userId: string, category?: string): Promise<Photo> {
    try {
      // Convertir base64 a blob
      const base64Response = await fetch(photoUri);
      const blob = await base64Response.blob();
      
      const timestamp = new Date().getTime();
      const storageRef = ref(this.storage, `photos/${userId}/${timestamp}.jpg`);
      
      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);
     
      const photoData: Omit<Photo, 'id'> = {
        url: downloadUrl,
        createdAt: new Date(),
        userId,
        category: category || 'Sin categoría'
      };

      const docRef = await addDoc(collection(db, 'photos'), photoData);
      
      return { ...photoData, id: docRef.id };
    } catch (error) {
      console.error('Error en uploadPhoto:', error);
      throw error;
    }
  }

  async getPhotos(category?: string): Promise<Photo[]> {
    try {
      let photosQuery;

      if (category && category !== 'all') {
        console.log('Filtrando por categoría:', category);
        photosQuery = query(
          collection(db, 'photos'),
          where('category', '==', category),
          orderBy('createdAt', 'desc')
        );
      } else {
        console.log('Obteniendo todas las fotos');
        photosQuery = query(
          collection(db, 'photos'),
          orderBy('createdAt', 'desc')
        );
      }

      const querySnapshot = await getDocs(photosQuery);
      
      if (querySnapshot.empty) {
        console.log('No se encontraron fotos');
        return [];
      }

      const photos = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          url: data.url,
          createdAt: data.createdAt?.toDate() || new Date(),
          userId: data.userId,
          category: data.category || 'Sin categoría'
        } as Photo;
      });

      console.log(`Fotos encontradas: ${photos.length}`);
      return photos;
    } catch (error) {
      console.error('Error al obtener las fotos:', error);
      throw error;
    }
  }

  async deletePhoto(photo: Photo): Promise<void> {
    try {
      if (!photo.id) throw new Error('ID de foto no encontrado');

      // Eliminar de Firestore
      await deleteDoc(doc(db, 'photos', photo.id));

      // Eliminar de Storage
      const storageRef = ref(this.storage, photo.url);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error al eliminar la foto:', error);
      throw error;
    }
  }

  async updatePhotoCategory(photoId: string, category: string): Promise<void> {
    try {
      const photoRef = doc(db, 'photos', photoId);
      await updateDoc(photoRef, {
        category: category
      });
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
      throw error;
    }
  }
} 