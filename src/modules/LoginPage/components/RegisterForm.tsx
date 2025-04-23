import { IonButton, IonIcon, IonInput, IonItem, IonText } from '@ionic/react';
import { eyeOff, eye } from 'ionicons/icons';
import React, { useState } from 'react';
import { register } from '../../firebase/service/firebaseService';  // Aquí tomas la nueva función register
import { useHistory } from 'react-router';
import { useAuthStore } from '../../../store/userStore';  // Zustand store para manejar la autenticación

export default function RegisterForm() {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Intentamos registrar al usuario usando la función register
            const credentials = await register(email, password, username);

            // Si no se pudo registrar correctamente, se lanza un error
            if (typeof credentials !== 'object' || !('user' in credentials)) {
                throw new Error('Error registrando el usuario');
            }

            // Si el registro es exitoso, redirigimos a la página de inicio (tabs/home)
            history.push('/tabs/home');  // Cambiar la ruta según la estructura de tu app

        } catch (error: any) {
            console.error(error);
            setError(error.message || 'Error al registrar el usuario');  // Capturamos el error y lo mostramos
        } finally {
            setLoading(false);  // Desactivamos el estado de carga
        }
    };

    return (
        <div className="mx-3 py-8">
            <form className="space-y-4" onSubmit={handleRegister}>
                {/* Username */}
                <IonItem className="rounded-xl border border-gray-200">
                    <IonInput
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onIonChange={(e) => setUsername(e.detail.value!)}
                    />
                </IonItem>

                {/* Email */}
                <IonItem className="rounded-xl border border-gray-200">
                    <IonInput
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                </IonItem>

                {/* Password */}
                <IonItem className="relative rounded-xl border border-gray-200 bg-gray-100">
                    <IonInput
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                    <IonIcon
                        icon={showPassword ? eyeOff : eye}
                        className="z-50 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </IonItem>

                {/* Error */}
                {error && (
                    <IonText color="danger" className="text-center mt-3">
                        <p>{error}</p>
                    </IonText>
                )}

                {/* Register Button */}
                <IonButton
                    expand="block"
                    type="submit"
                    color="dark"
                    className="hover:bg-gray-800 !rounded-2xl text-white text-base font-medium h-12"
                    disabled={loading}  // Deshabilitamos el botón si estamos cargando
                >
                    {loading ? 'Cargando...' : 'Registrarse'}
                </IonButton>
            </form>
        </div>
    );
}
