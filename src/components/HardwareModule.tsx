// modules/HardwareModule.tsx
import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardTitle } from '@ionic/react';
import { Device } from '@capacitor/device';

const HardwareModule: React.FC = () => {
    const [deviceInfo, setDeviceInfo] = useState<any>(null);

    useEffect(() => {
        const getDeviceInfo = async () => {
            const info = await Device.getInfo();
            setDeviceInfo(info);
        };

        getDeviceInfo();
    }, []);

    return (
        <IonCard className='p-2'>
            <IonCardTitle>Información del Dispositivo</IonCardTitle>
            <IonCardContent>
                {deviceInfo ? (
                    <>
                        <p><strong>Modelo:</strong> {deviceInfo.model}</p>
                        <p><strong>Plataforma:</strong> {deviceInfo.platform}</p>
                        <p><strong>Versión del SO:</strong> {deviceInfo.osVersion}</p>
                        <p><strong>ID único:</strong> {deviceInfo.uuid}</p>
                    </>
                ) : (
                    <p>Cargando información del dispositivo...</p>
                )}
            </IonCardContent>
        </IonCard>
    );
};

export default HardwareModule;
//         