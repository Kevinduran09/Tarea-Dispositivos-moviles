import React, { useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import '../../theme/qr-scanner.csss';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

  const startScan = async () => {
    try {
      await BarcodeScanner.checkPermission({ force: true });
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      setScanning(true);
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        onScan(result.content);
        stopScan();
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      stopScan();
    }
  };

  const stopScan = async () => {
    await BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    setScanning(false);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="scanner-container">
          {!scanning ? (
            <IonButton onClick={startScan}>Iniciar Escaneo</IonButton>
          ) : (
            <IonButton onClick={stopScan}>Detener Escaneo</IonButton>
          )}
          <IonButton onClick={onClose}>Cerrar</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QRScanner; 