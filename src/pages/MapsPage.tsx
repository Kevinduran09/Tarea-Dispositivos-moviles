import { IonContent, IonHeader, IonPage } from '@ionic/react'
import React from 'react'
import MapComponent from '../components/MapComponent'
import '../theme/maps.css'
import MapOSM from '../components/Map/MapOSM'
const MapsPage: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>

            </IonHeader>
            <IonContent className='ion-content-bg-t'>

               
                    <MapComponent />
                {/* <MapOSM /> */}
            </IonContent>
        </IonPage>
    )
}

export default MapsPage


