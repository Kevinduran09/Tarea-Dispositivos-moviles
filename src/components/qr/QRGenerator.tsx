import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { IonButton, IonContent, IonPage } from '@ionic/react';

interface QRGeneratorProps {
  data: string;
  onClose: () => void;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ data, onClose }) => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="qr-container">
          <QRCodeSVG
            value={data}
            size={256}
            level="H"
            includeMargin={true}
          />
          <IonButton onClick={onClose}>Cerrar</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QRGenerator; 