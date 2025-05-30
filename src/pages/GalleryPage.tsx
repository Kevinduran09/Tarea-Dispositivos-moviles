import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonIcon, IonLoading, IonAlert, IonModal, IonButton } from '@ionic/react';
import { camera, close, trash, create } from 'ionicons/icons';
import { CameraService, Photo } from '../Services/CameraService';
import { useHistory } from 'react-router-dom';
import AppHeader from '../components/head/AppHeader';
import EmptyState from '../components/gallery/EmptyState';
import CategoryFilter from '../components/gallery/CategoryFilter';
import PhotoGrid from '../components/gallery/PhotoGrid';
import '../theme/maps.css'
const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'Personal', label: 'Personal' },
  { id: 'Trabajo', label: 'Trabajo' },
  { id: 'Paisajes', label: 'Paisajes' },
  { id: 'Mascotas', label: 'Mascotas' },
  { id: 'Otros', label: 'Otros' }
];

const GalleryPage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [photoToUpdate, setPhotoToUpdate] = useState<Photo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const cameraService = new CameraService();
  const history = useHistory();

  useEffect(() => {
    loadPhotos();
  }, [selectedCategory]);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const photosList = await cameraService.getPhotos(selectedCategory);
      setPhotos(photosList);
    } catch (error) {
      console.error('Error al cargar las fotos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTakePhoto = () => {
    history.push('/camera');
  };

  const handleDeleteClick = (photo: Photo) => {
    setPhotoToDelete(photo);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = async () => {
    if (!photoToDelete) return;
    try {
      await cameraService.deletePhoto(photoToDelete);
      setPhotos(prevPhotos => prevPhotos.filter(p => p.id !== photoToDelete.id));
    } catch (error) {
      console.error('Error al eliminar la foto:', error);
    } finally {
      setShowDeleteAlert(false);
      setPhotoToDelete(null);
    }
  };

  const handleCategoryClick = (photo: Photo) => {
    setPhotoToUpdate(photo);
    setShowCategorySelect(true);
  };

  const handleCategoryChange = async (category: string) => {
    if (!photoToUpdate?.id) return;
    try {
      await cameraService.updatePhotoCategory(photoToUpdate.id, category);
      await loadPhotos();
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    } finally {
      setShowCategorySelect(false);
      setPhotoToUpdate(null);
    }
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  };

  return (
    <IonPage className="ion-page">
      <AppHeader title="Galería" showMenuButton={true} />
      <IonContent className="!mt-2">
        <IonLoading isOpen={loading} message="Cargando fotos..." />

        <div className="sticky top-0 z-10 bg-white shadow-sm pt-3">
          <CategoryFilter
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        {photos.length === 0 && !loading ? (
          <EmptyState selectedCategory={selectedCategory} categories={CATEGORIES} />
        ) : (
          <PhotoGrid
            photos={photos}
            onEdit={handleCategoryClick}
            onDelete={handleDeleteClick}
            onPhotoClick={handlePhotoClick}
          />
        )}
        <div className="fixed bottom-6 right-6 z-50 safe-area-bottom">
          <button
            onClick={handleTakePhoto}
            className="w-14 h-14 !rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
          >
            <IonIcon icon={camera} className="text-white text-2xl"></IonIcon>
          </button>
        </div>

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Eliminar foto"
          message="¿Estás seguro de que quieres eliminar esta foto?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: 'Eliminar',
              cssClass: 'danger',
              handler: handleDeleteConfirm
            }
          ]}
        />
        {/* Modal para seleccionar la categoría */}
        <IonModal
          isOpen={showCategorySelect}
          onDidDismiss={() => setShowCategorySelect(false)}
          breakpoints={[0, 0.5]}
          initialBreakpoint={0.5}
          className="custom-modal"
        >
          <IonContent className="ion-no-border ion-padding">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Seleccionar categoría</h2>
                <IonButton fill="clear" onClick={() => setShowCategorySelect(false)}>
                  <IonIcon icon={close} slot="icon-only" className='size-8' />
                </IonButton>
              </div>

              <div className="flex-1 gap-2 space-y-2">
                {CATEGORIES.filter(c => c.id !== 'all').map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className="w-full p-4 !text-lg text-left rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </IonContent>
        </IonModal>


        {/* Modal para ver la foto */}
        <IonModal
          isOpen={showPhotoModal}
          onDidDismiss={() => setShowPhotoModal(false)}
          breakpoints={[0, 0.5]}
          initialBreakpoint={0.5}
          className="custom-modal"
        >
          <IonContent className="ion-padding">
            <div className="flex flex-col items-center justify-center py-4">
              {selectedPhoto && (
                <>
                  <img 
                    src={selectedPhoto.url} 
                    alt="Foto" 
                    className="w-32 h-32 object-cover rounded-lg mb-6"
                  />
                  <div className="w-full max-w-sm space-y-3">
                    <IonButton 
                      expand="block" 
                      onClick={() => {
                        handleCategoryClick(selectedPhoto);
                        setShowPhotoModal(false);
                      }}
                      className="!bg-yellow-500 !text-white"
                    >
                      <IonIcon icon={create} slot="start" />
                      Editar categoría
                    </IonButton>
                    
                    <IonButton 
                      expand="block" 
                      onClick={() => {
                        handleDeleteClick(selectedPhoto);
                        setShowPhotoModal(false);
                      }}
                      className="!bg-red-500 !text-white"
                    >
                      <IonIcon icon={trash} slot="start" />
                      Eliminar foto
                    </IonButton>

                    <IonButton 
                      expand="block" 
                      fill="clear" 
                      onClick={() => setShowPhotoModal(false)}
                      className="!text-gray-600"
                    >
                      Cancelar
                    </IonButton>
                  </div>
                </>
              )}
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default GalleryPage; 