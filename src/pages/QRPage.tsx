import React, { useState } from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { QRGenerator } from '../components/qr/QRGenerator';
import { QRScanner } from '../components/qr/QRScanner';

export const QRPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'generate' | 'scan'>('scan');

  return (
    <IonPage>
      <IonContent>
        <IonSegment value={selectedTab} onIonChange={e => setSelectedTab(e.detail.value as 'generate' | 'scan')}>
          <IonSegmentButton value="generate">
            <IonLabel>Generar QR</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="scan">
            <IonLabel>Escanear QR</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <div className="ion-padding">
          {selectedTab === 'generate' ? <QRGenerator /> : <QRScanner />}
        </div>
      </IonContent>
    </IonPage>
  );
}; 