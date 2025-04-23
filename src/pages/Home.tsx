import MessageListItem from '../components/MessageListItem';
import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import InitialScreen from '../modules/firebase/page/InitialScreen';
import { GoogleAuthButton } from '../modules/firebase/components/GoogleAuth';
import AppHeader from '../components/head/AppHeader';
import { useAuthStore } from '../store/userStore';

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
