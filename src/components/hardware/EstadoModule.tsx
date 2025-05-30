import React from 'react';
import { IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

interface EstadoModuleProps {
  nombre: string;
  estado: boolean;
}

export const EstadoModule: React.FC<EstadoModuleProps> = ({ nombre, estado }) => {
  return (
    <IonCard>
      <IonCardContent>
        <div className="estado-module">
          <h3>{nombre}</h3>
          <IonIcon
            icon={estado ? checkmarkCircle : closeCircle}
            color={estado ? 'success' : 'danger'}
            size="large"
          />
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default EstadoModule; 