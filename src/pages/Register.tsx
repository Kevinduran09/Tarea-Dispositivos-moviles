import { IonPage, IonContent, IonTitle, IonText, IonRouterLink } from '@ionic/react'
import { GoogleAuthButton } from '../modules/firebase/components/GoogleAuth'
import UserAndPasswordForm from '../modules/firebase/page/InitialScreen'
import RegisterForm from '../modules/LoginPage/components/RegisterForm'
import BackButton from '../modules/LoginPage/components/BackButton'

export const RegisterScreen = () => {
    return (
        <IonPage>
            <IonContent class='ion-padding'>
                <div className="flex flex-col">
                    <BackButton />
                    <span className='text-3xl font-semibold font-sans text-left p-3 text-wrap'>Bienvendio de nuevo! Inicia sesión para disfrutar de la aplicación</span>
                </div>
                <RegisterForm />
                <span className='flex flex-row justify-center items-center mx-3'>
                    <div className=" bg-gray-200 h-px flex-grow "></div>
                    <span className='text-gray-500 whitespace-nowrap mx-4'> O ingresar con</span>
                    <div className=" bg-gray-200 h-px flex-grow "></div>
                </span>
                <GoogleAuthButton />
                <div className='text-center mt-6'>
                    <IonText>
                        ¿Ya tienes una cuenta? <IonRouterLink routerLink="/login">Inicia Sesión ahora</IonRouterLink>
                    </IonText>
                </div>
            </IonContent>
        </IonPage>
    )
}
