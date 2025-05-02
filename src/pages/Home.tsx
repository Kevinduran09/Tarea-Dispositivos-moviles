import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
  IonTitle
} from '@ionic/react';

import AppHeader from '../components/head/AppHeader';
import useTopicsStorage from '../hooks/useTopicsStorage';
import 'animate.css';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';



const Home: React.FC = () => {
  const { topics, toggleSubscribe } = useTopicsStorage()
  const showActions = async () => {
    const result = await ActionSheet.showActions({
      title: 'Opciones',
      message: 'Elige una acción',
      options: [
        {
          title: 'Compartir',
        },
        {
          title: 'Eliminar',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'Cancelar',
          style: ActionSheetButtonStyle.Cancel,
        },
      ],
    });

    console.log('Botón seleccionado:', result.index);
    if (result.index === 1) {
      alert('Eliminado!');
    }
  };
  return (
    <IonPage id="home-page">
      <AppHeader title='Home - Notifaciones' showMenuButton={true} />
      <IonContent fullscreen class='ion-padding'>
        <div className='flex flex-col w-full gap-5'>
          <IonTitle className='font-semibold text-2xl text-center font-sans'>Trending Topics</IonTitle>
          <IonText className='text-xl text-gray-500/80'>Suscribete a los temas de tu interes para recibir notificaciones del mismo</IonText>
          <section className='grid grid-cols-2 gap-5'>
            {
              topics.map((topic, index) => {
                return (
                  <TopicCard key={index} title={topic.topic} description={topic.description} imageUrl={topic.img} isSubscribe={topic.isSubscribe} toggleSubscribe={toggleSubscribe} index={index} />
                )
              })
            }
          </section>
          <IonButton onClick={showActions}>
            Mostrar Action Sheet
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

const TopicCard = ({ title, description, imageUrl, isSubscribe, toggleSubscribe, index }: any) => {
  return (
    <div onClick={() => toggleSubscribe(index,title)}
      className={`relative h-60 rounded-2xl overflow-hidden rotate-1 hover:scale-105 transition-all cursor-pointer ${isSubscribe ? 'ring-2 ring-blue-500' : ''} 
         ${isSubscribe ? 'shadow-lg' : ''} ${isSubscribe ? ' ' : ''}`}
      style={{
        boxShadow: isSubscribe ? '0 0 10px rgba(0, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.5)' : 'none',
      }}
    >
      <img className='h-full w-full object-cover object-top' src={imageUrl} alt={title} />
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
      <div className="absolute bottom-0 left-0 ml-3 mb-3">
        <span className='text-2xl text-white capitalize'>{title}</span>
        <p className='text-xl text-white'>{description}</p>
      </div>
      {isSubscribe && (
        <span className='absolute top-0 right-0 mt-3 mr-3 text-md text-white bg-gradient-to-r from-blue-500 to-pink-500 px-4 py-2 rounded-full shadow-lg transform scale-105 transition-all ease-out  hover:scale-110 animate__animated animate__fadeIn animate'>
          Suscrito
        </span>
      )}
    </div>
  );
};