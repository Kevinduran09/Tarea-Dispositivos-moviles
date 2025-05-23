import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonIcon, IonLoading } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { CameraService, Photo } from '../Services/CameraService';
import { useAuthStore } from '../store/useAuthStore';
import AppHeader from '../components/head/AppHeader';
import { StatusBar, Style } from '@capacitor/status-bar';

const GalleryPage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const cameraService = new CameraService();

  useEffect(() => {
    loadPhotos();
 
  }, []);



  const loadPhotos = async () => {
    try {
      const photosList = await cameraService.getPhotos();
      setPhotos(photosList);
    } catch (error) {
      console.error('Error al cargar las fotos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTakePhoto = async () => {
    try {
      if (!user) return;
      
      const photoUri = await cameraService.takePicture();
      const newPhoto = await cameraService.uploadPhoto(photoUri, user.uid);
      setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  };

  return (
    <IonPage className="ion-page">
      <AppHeader title="Galería" showMenuButton={true} />
      <IonContent className="ion-padding-top ion-padding-bottom">
        <IonLoading isOpen={loading} message="Cargando fotos..." />
        
        {photos.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <div className="w-24 h-24 mb-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay fotos</h3>
            <p className="text-gray-500 mb-4">Toma tu primera foto usando el botón de la cámara</p>
          </div>
        ) : (
          <div className="px-2 pt-2 pb-20">
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
              {photos.map((photo) => (
                <div key={photo.id} className="break-inside-avoid mb-2">
                  <div className="relative group rounded-xl overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt="Foto" 
                      className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <span className="text-white text-sm font-medium">
                          {new Date(photo.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="fixed bottom-6 right-6 z-50 safe-area-bottom">
          <button
            onClick={handleTakePhoto}
            className="w-14 h-14 !rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
          >
            <IonIcon icon={camera} className="text-white text-2xl"></IonIcon>
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GalleryPage; 