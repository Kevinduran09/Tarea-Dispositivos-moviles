import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonIcon, IonButton, IonLoading } from '@ionic/react';
import { camera, flash, flashOff, cameraReverse } from 'ionicons/icons';
import { CameraPreview, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { useHistory } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { useAuthStore } from '../store/useAuthStore';
import { CameraService } from '../Services/CameraService';
import '../theme/camera.css';
const CameraPage: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const user = useAuthStore((state) => state.user);
  const cameraService = new CameraService();
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const cameraPreviewOptions = isNative ? {
        position: 'rear',
        parent: 'camera-preview',
        className: 'camera-preview',
        toBack: true,
        width: window.innerWidth,
        height: window.innerHeight,
      } : {
        parent: 'camera-preview',
        className: 'camera-preview'
      };

      await CameraPreview.start(cameraPreviewOptions);
      setIsCameraActive(true);
    } catch (error) {
      console.error('Error al iniciar la cámara:', error);
    }
  };

  const stopCamera = async () => {
    try {
      await CameraPreview.stop();
      setIsCameraActive(false);
    } catch (error) {
      console.error('Error al detener la cámara:', error);
    }
  };

  const takePicture = async () => {
    try {
      setLoading(true);
      const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
        quality: 85,
        width: 800,
        height: 600,
      };

      const result = await CameraPreview.capture(cameraPreviewPictureOptions);
      
      if (user && result.value) {
        // Asegurarnos de que la imagen tenga el prefijo data:image/jpeg;base64,
        const base64Image = result.value.startsWith('data:') 
          ? result.value 
          : `data:image/jpeg;base64,${result.value}`;
          
        const newPhoto = await cameraService.uploadPhoto(base64Image, user.uid);
        history.push('/tabs/gallery');
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFlash = async () => {
    if (!isNative) {
      console.log('Flash no disponible en la versión web');
      return;
    }
    try {
      if (isFlashOn) {
        await CameraPreview.setFlashMode({ flashMode: 'off' });
      } else {
        await CameraPreview.setFlashMode({ flashMode: 'on' });
      }
      setIsFlashOn(!isFlashOn);
    } catch (error) {
      console.error('Error al cambiar el flash:', error);
    }
  };

  const switchCamera = async () => {
    try {
      await CameraPreview.stop();
      const newPosition = isFrontCamera ? 'rear' : 'front';
      const cameraPreviewOptions = isNative ? {
        position: newPosition,
        parent: 'camera-preview',
        className: 'camera-preview',
        toBack: true,
        width: window.innerWidth,
        height: window.innerHeight,
      } : {
        parent: 'camera-preview',
        className: 'camera-preview'
      };

      await CameraPreview.start(cameraPreviewOptions);
      setIsFrontCamera(!isFrontCamera);
    } catch (error) {
      console.error('Error al cambiar la cámara:', error);
    }
  };

  return (
    <IonPage>
      {/* <AppHeader title="Cámara" showBackButton={true} /> */}
      <IonContent fullscreen className='my-custom-camera-preview-content '>
        <div id="camera-preview" className="w-full h-full"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-around items-center bg-black bg-opacity-50">
          <IonButton 
            fill="clear" 
            onClick={toggleFlash}
            disabled={!isNative}
          >
            <IonIcon 
              icon={isFlashOn ? flash : flashOff} 
              className={`text-2xl ${isNative ? 'text-white' : 'text-gray-500'}`}
            />
          </IonButton>

          <IonButton 
            fill="clear" 
            onClick={takePicture}
            className="w-16 h-16 rounded-full bg-white"
          >
            <IonIcon icon={camera} className="text-black text-2xl" />
          </IonButton>

          <IonButton 
            fill="clear" 
            onClick={switchCamera}
            disabled={!isNative}
          >
            <IonIcon 
              icon={cameraReverse} 
              className={`text-2xl ${isNative ? 'text-white' : 'text-gray-500'}`}
            />
          </IonButton>
        </div>

        <IonLoading isOpen={loading} message="Procesando foto..." />
      </IonContent>
    </IonPage>
  );
};

export default CameraPage; 