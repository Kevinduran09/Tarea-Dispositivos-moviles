import React, { useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.replace('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="splash-container">
          <h1>Bienvenido</h1>
          <p>Cargando...</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen; 