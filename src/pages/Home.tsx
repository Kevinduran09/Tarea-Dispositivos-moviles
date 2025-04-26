import {
  IonContent,
  IonPage,
  IonTitle} from '@ionic/react';

import AppHeader from '../components/head/AppHeader';
import { useAuthStore } from '../context/userStore';

const Home: React.FC = () => {
  const {user,role} = useAuthStore()
  console.log(user);
  console.log('rol del uuario: ', role);
  
  return (
    <IonPage id="home-page">
      <AppHeader title='Home - Notifaciones' showMenuButton={true} />
      <IonContent fullscreen class='ion-padding'>
        {/* <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher> */}
        <IonTitle>Inicio</IonTitle>
       <span>{user?.displayName}</span>
      </IonContent>
    </IonPage>
  );
};

export default Home;
