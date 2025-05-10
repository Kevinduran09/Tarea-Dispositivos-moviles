import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import NivelBurbuja from '../components/NivelBurbuja'
import AccelerometerRegion from '../components/AccelerometerRegion'

const Acelerometro: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonTitle className='text-center'>
                        Acelerometro
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='flex flex-col items-center justify-center gap-5 mt-4 p-2'>
                    <AccelerometerRegion />
                    <NivelBurbuja />
                </div>
            </IonContent>
        </IonPage>
    )
}
export default Acelerometro