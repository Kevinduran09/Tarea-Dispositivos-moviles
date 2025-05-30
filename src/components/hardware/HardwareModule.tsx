import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface HardwareModuleProps {
  titulo: string;
  children: React.ReactNode;
}

export const HardwareModule: React.FC<HardwareModuleProps> = ({ titulo, children }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{titulo}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {children}
      </IonCardContent>
    </IonCard>
  );
};

export default HardwareModule; 