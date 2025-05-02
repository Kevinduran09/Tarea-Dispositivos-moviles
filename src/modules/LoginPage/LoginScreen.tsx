import { IonContent, IonPage, IonRouterLink, IonText, IonRouterOutlet } from '@ionic/react';
import React, { useEffect } from 'react';

import BackButton from './components/BackButton';
import EmailAndPasswordForm from './components/EmailAndPasswordForm';
import { GoogleAuthButton } from '../firebase/components/GoogleAuth';
import { useAuth } from '../../hooks/useAuth'; // Asegúrate de tener este hook
import { useHistory } from 'react-router';

export const LoginScreen = () => {
 
    return (
        <IonPage>
            <IonContent class='ion-padding'>
                <div className="flex flex-col">
                    <BackButton />
                    <span className='text-3xl font-semibold font-sans text-left p-3 text-wrap'>
                        Bienvenido de nuevo! Inicia sesión para disfrutar de la aplicación
                    </span>
                </div>
                <EmailAndPasswordForm />
                <span className='flex flex-row justify-center items-center mx-3'>
                    <div className=" bg-gray-200 h-px flex-grow "></div>
                    <span className='text-gray-500 whitespace-nowrap mx-4'> O inicia sesión con</span>
                    <div className=" bg-gray-200 h-px flex-grow "></div>
                </span>
                <GoogleAuthButton />
                <div className='text-center mt-6'>
                    <IonText>
                        ¿No tienes cuenta? <IonRouterLink routerLink="/register">Regístrate ahora</IonRouterLink>
                    </IonText>
                </div>
            </IonContent>
        </IonPage>
    );
};
/* 
   const { user } = useAuth();  // Asegúrate de que este hook te da el usuario actual

    const history = useHistory();

    useEffect(() => {
        if (user) {
            // Si el usuario ya está autenticado, redirige automáticamente a /tabs/home
            history.push('/');
        }
    }, [user]);  // Dependemos del estado de 'user' para hacer el redireccionamiento

*/