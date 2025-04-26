import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { useAuthStore } from '../context/userStore';

const Account: React.FC = () => {
    const user = useAuthStore((state: any) => state.user);


    return (
        <IonPage id="account-page">
            <IonHeader className="ion-no-border" />
            <IonContent className="p-4 bg-gray-100">
                <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">Mi Cuenta</h1>
                    {user ? (
                        <div className="space-y-6">
                            {/* Avatar */}
                            <div className="flex justify-center">
                                <img
                                    src={user.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                                    alt="Foto de perfil"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                                />
                            </div>

                            {/* Información del usuario */}
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Nombre:</span>
                                    <span className="text-lg font-semibold text-gray-800">{user.displayName || 'No disponible'}</span>
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Correo:</span>
                                    <span className="text-lg font-semibold text-gray-800">{user.email}</span>
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Teléfono:</span>
                                    <span className="text-lg font-semibold text-gray-800">{user.phoneNumber || 'No disponible'}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No se encontró información del usuario.</p>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Account;
