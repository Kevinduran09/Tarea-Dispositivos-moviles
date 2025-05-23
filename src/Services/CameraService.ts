import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../core/firebaseConfig';

export interface Photo {
  id?: string;
  url: string;
  createdAt: Date;
  userId: string;
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

  async uploadPhoto(photoUri: string, userId: string): Promise<Photo> {
    try {
      const response = await fetch(photoUri);
      const blob = await response.blob();
      
      const timestamp = new Date().getTime();
      const storageRef = ref(this.storage, `photos/${userId}/${timestamp}.jpg`);
      
      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);
     
      const photoData: Omit<Photo, 'id'> = {
        url: downloadUrl,
        createdAt: new Date(),
        userId
      };


      const docRef = await addDoc(collection(db, 'photos'), photoData);
      
      return { ...photoData, id: docRef.id };
    } catch (error) {
      console.error('Error en uploadPhoto:', error);
      throw error;
    }
  }

  async getPhotos(): Promise<Photo[]> {
    try {

      const photosQuery = query(
        collection(db, 'photos'),
        orderBy('createdAt', 'desc')
      );
       console.log('Ejecutando consulta a Firestore...');
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
          userId: data.userId
        } as Photo;
      });

  
      return photos;
    } catch (error) {
      console.error('Error al obtener las fotos:', error);
      throw error; 
    }
  }
} 