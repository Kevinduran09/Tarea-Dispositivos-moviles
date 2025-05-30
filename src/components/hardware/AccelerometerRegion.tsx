import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';

interface AccelerometerRegionProps {
  x: number;
  y: number;
  z: number;
}

export const AccelerometerRegion: React.FC<AccelerometerRegionProps> = ({ x, y, z }) => {
  return (
    <IonCard>
      <IonCardContent>
        <h3>Acelerómetro</h3>
        <p>X: {x.toFixed(2)}</p>
        <p>Y: {y.toFixed(2)}</p>
        <p>Z: {z.toFixed(2)}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default AccelerometerRegion; 