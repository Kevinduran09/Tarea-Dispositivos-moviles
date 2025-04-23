import { IonPage, IonContent, IonTitle } from '@ionic/react'
import { GoogleAuthButton } from '../modules/firebase/components/GoogleAuth'
import UserAndPasswordForm from '../modules/firebase/page/InitialScreen'

export const Login = () => {
    return (
        <IonPage id="home-page">
            <IonContent fullscreen class='ion-padding'>
                <IonTitle className='text-3xl text-center p-3 text-wrap'>Bienvendio de nuevo! Inicia sesión para disfrutar de la aplicación</IonTitle>
                <UserAndPasswordForm />
                <GoogleAuthButton />
            </IonContent>
        </IonPage>
    )
}
