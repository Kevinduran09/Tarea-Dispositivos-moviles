// modules/EstadoModule.tsx
import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardTitle, IonIcon } from '@ionic/react';
import { batteryCharging, batteryDead, batteryFull } from 'ionicons/icons';
import { Device } from '@capacitor/device';

const EstadoModule: React.FC = () => {
    const [batteryInfo, setBatteryInfo] = useState<any>(null);

    useEffect(() => {
        const getBatteryInfo = async () => {
            try {
                const info = await Device.getBatteryInfo();
                setBatteryInfo(info);
            } catch (error) {
                console.error('Error al obtener la información de la batería:', error);
            }
        };

        getBatteryInfo();

    
       
    }, []);

    return (
        <IonCard className="p-2">
            <IonCardTitle>Estado de la Batería</IonCardTitle>
            <IonCardContent>
                {batteryInfo ? (
                    <>
                        <p><strong>Nivel de batería:</strong> {(batteryInfo.batteryLevel * 100).toFixed(0)}%</p>
                        <p><strong>Cargando:</strong> {batteryInfo.isCharging ? 'Sí' : 'No'}</p>
                        {batteryInfo.isCharging ? (
                            <IonIcon icon={batteryCharging} color="primary" />
                        ) : batteryInfo.batteryLevel < 0.2 ? (
                            <IonIcon icon={batteryDead} color="danger" />
                        ) : (
                            <IonIcon icon={batteryFull} color="success" />
                        )}
                    </>
                ) : (
                    <p>Cargando información de la batería...</p>
                )}
            </IonCardContent>
        </IonCard>
    );
};

export default EstadoModule;
