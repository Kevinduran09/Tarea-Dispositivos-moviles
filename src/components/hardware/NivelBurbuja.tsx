import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

interface NivelBurbujaProps {
  x: number;
  y: number;
}

export const NivelBurbuja: React.FC<NivelBurbujaProps> = ({ x, y }) => {
  return (
    <IonCard>
      <IonCardContent>
        <h3>Nivel de Burbuja</h3>
        <p>X: {x.toFixed(2)}°</p>
        <p>Y: {y.toFixed(2)}°</p>
      </IonCardContent>
    </IonCard>
  );
};

export default NivelBurbuja; 