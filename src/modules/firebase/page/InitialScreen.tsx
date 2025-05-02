
import { useState } from 'react';

import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText
} from '@ionic/react';
import { Login } from '../service/firebaseService';

const UserAndPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await Login(email, password)
      
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
      <form onSubmit={handleLogin} className='flex flex-col gap-4' >
        <IonItem className=''>
          <IonInput className='bg-gray-500/75'
           label="Correo electronico" labelPlacement="floating" placeholder="Ingrese correo electronico" type='email' value={email} onIonChange={(e) => setEmail(e.detail.value!)} required ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput label="Contraseña" labelPlacement="floating" placeholder="Ingrese su contraseña" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required ></IonInput>
        </IonItem>
        {error && (
          <IonText color='danger'>
            <p>{error}</p>
          </IonText>
        )}
        <IonButton expand='block' type='submit'>
          Login
        </IonButton>
      </form>
    </>
  );
};

export default UserAndPasswordForm;
