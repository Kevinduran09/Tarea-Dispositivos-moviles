import { IonButton, IonIcon, IonInput, IonItem, IonText } from '@ionic/react'
import { eyeOff, eye } from 'ionicons/icons';
import React, { useState } from 'react'
import { Login } from '../../firebase/service/firebaseService';
import { useHistory } from 'react-router';

export default function EmailAndPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await Login(email, password)
            if (typeof result !== 'object' || !('user' in result)) {
                throw new Error('Error iniciando sesion');
            }

            
            history.push('/tabs/home');
        } catch (error: any) {
            setLoading(false);
            
            
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-3 py-8 ">
            <form className="space-y-4" onSubmit={handleLogin}>
                {/* Email */}
                <IonItem className="rounded-xl border border-gray-200 ">
                    <IonInput
                        type="email"
                        placeholder="Enter your email"
                        className="placeholder-gray-500 !py-2  "
                        value={email} 
                        onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                </IonItem>

                {/* Password */}
                <IonItem className="relative rounded-xl border border-gray-200 bg-gray-100">
                    <IonInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="placeholder-gray-500 pr-10  !py-2"
                        value={password} onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                    <IonIcon
                        icon={showPassword ? eyeOff : eye}
                        className="z-50 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </IonItem>

                {/* Forgot Password */}
                <div className="text-right">
                    <IonText >
                        <a href="#" className="text-sm hover:underline !text-gray-600 font-semibold">
                            Forgot Password?
                        </a>
                    </IonText>
                </div>
                <div>
                    {error && (
                        <IonText color='danger' className='text-center mt-3'>
                            <p>{error}</p>
                        </IonText>
                    )}
                </div>
                {/* Login Button */}
                <IonButton
                    expand="block"
                    type='submit'
                    color={'dark'}
                    className="hover:bg-gray-800 !rounded-2xl text-white text-base font-medium h-12"
                >
                    Login
                </IonButton>
            </form>
        </div>
    );
}
