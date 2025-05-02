import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonLabel, IonItem } from '@ionic/react';
import { Device } from '@capacitor/device';
import HardwareModule from '../components/HardwareModule';
import EstadoModule from '../components/EstadoModule';
import AppHeader from '../components/head/AppHeader';

const DeviceInfoPage: React.FC = () => {
    const [deviceInfo, setDeviceInfo] = useState<any>(null);

    useEffect(() => {
        const getDeviceInfo = async () => {
            const info = await Device.getInfo();
            setDeviceInfo(info);
        };

        getDeviceInfo();
    }, []);

    return (
        <IonPage >
            <AppHeader title='Home - Notifaciones' showMenuButton={true} />
            <IonContent className="ion-padding">
                <div className='flex flex-col w-full gap-5'>
                    <HardwareModule />
                    <EstadoModule />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default DeviceInfoPage;
