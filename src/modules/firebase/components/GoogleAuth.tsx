import { useState } from 'react'
import { useHistory } from 'react-router';
import { loginWithGoogle } from '../service/firebaseService';
import { User } from 'firebase/auth';
import { IonButton, IonLoading } from '@ionic/react';
import Google from '../../../components/GoogleIcon';
import { useAuthStore } from '../../../store/userStore';

export const GoogleAuthButton = () => {
    const [loading, setLoading] = useState(false)
    const [userLog, setUser] = useState<User | null>(null)
    const history = useHistory();
    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            await loginWithGoogle()
            if (useAuthStore.getState().isAuthenticated) {
                history.push('/tabs/home')
            }
        } catch (error: any) {
            setLoading(false);
            console.log("Error durante el inicio de sesión con Google: " + error);
        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return <IonLoading isOpen message='Cargando sesión...' />;
    }
    return (
        <div className='mt-5 text-center'>
            <IonButton className='border-2 border-gray-200/10 rounded-lg' onClick={signInWithGoogle} color={'light'}>
                {<Google className='size-8 mr-3' />}
                <span className='text-lg font-sans !font-medium'>Google</span>
            </IonButton>

            {/* {
                userLog && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
                        <IonImg style={{ width: '300px' }} src={userLog?.photoURL ?? undefined} />
                        <IonText>{userLog.displayName}</IonText>
                        <IonText>{userLog.email}</IonText>
                        <IonText>{userLog.uid}</IonText>
                    </div>
                )
            } */}
        </div>
    );
}
