import { IonButton, IonContent, IonHeader, IonPage } from '@ionic/react'
import React, { useState } from 'react'
import MapComponent from '../components/MapComponent'
import '../theme/maps.css'
import MapOSM from '../components/Map/MapOSM'
const MapsPage: React.FC = () => {
    const [map, setMap] = useState<'osm' | 'google'>('osm')
    return (
        <IonPage>
            <IonHeader>

            </IonHeader>
            <IonContent className='ion-content-bg-t'>


                
                {map === 'osm' ? <MapOSM /> : <MapComponent />}
                <div className='!z-[1000] absolute bottom-0 left-0 ml-5 mb-5'>
                    <IonButton onClick={() => setMap(map === 'osm' ? 'google' : 'osm')}>
                        Cambiar a mapa de {map === 'osm' ? 'Google' : 'OSM'}
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default MapsPage


