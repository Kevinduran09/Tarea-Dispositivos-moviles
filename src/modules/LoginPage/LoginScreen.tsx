import { IonContent, IonPage, IonRouterLink, IonText } from '@ionic/react'
import React from 'react'
import BackButton from './components/BackButton'
import EmailAndPasswordForm from './components/EmailAndPasswordForm'
import { GoogleAuthButton } from '../firebase/components/GoogleAuth'

export const LoginScreen = () => {
    return (
        <IonPage>
            <IonContent class='ion-padding'>
                <div className="flex flex-col">
                    <BackButton />
                    <span className='text-3xl font-semibold font-sans text-left p-3 text-wrap'>Bienvendio de nuevo! Inicia sesión para disfrutar de la aplicación</span>
                </div>
                <EmailAndPasswordForm/>
                <span className='flex flex-row justify-center items-center mx-3'>
                    <div className=" bg-gray-200 h-px flex-grow "></div>
                    <span className='text-gray-500 whitespace-nowrap mx-4'> O inicia sesión con</span>
                    <div className=" bg-gray-200 h-px flex-grow "></div>
                </span>
                <GoogleAuthButton/>
                <div className='text-center mt-6'>
                    <IonText>
                        ¿No tienes cuenta? <IonRouterLink routerLink="/register">Regístrate ahora</IonRouterLink>
                    </IonText>
                </div>
            </IonContent>
        </IonPage>
    )
}
