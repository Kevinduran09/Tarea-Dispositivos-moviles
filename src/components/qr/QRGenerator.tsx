import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { IonSelect, IonSelectOption, IonCard, IonCardContent, IonText } from '@ionic/react';
import { useAuthStore } from '../store/useAuthStore';

interface QRData {
    userId: string;
    email: string;
    timestamp: number;
    selectedInterval: number;
}

const intervalOptions = [
    { label: '20 segundos', value: 20 },
    { label: '1 minuto', value: 60 },
    { label: '5 minutos', value: 300 },
    { label: '15 minutos', value: 900 },
    { label: '25 minutos', value: 1500 },
];

export const QRGenerator: React.FC = () => {

    const user = useAuthStore((state: any) => state.user);
    const [selectedInterval, setSelectedInterval] = useState<number>(60);
    console.log(user)

    const qrData: QRData = {
        userId: user?.uid || '',
        email: user?.email || '',
        timestamp: Date.now(),
        selectedInterval: selectedInterval
    };

    const qrString = JSON.stringify(qrData);

    return (
        <IonCard>
            <IonCardContent>
                <IonText>
                    <h2>Generar Código QR Temporal</h2>
                </IonText>

                <IonSelect
                    value={selectedInterval}
                    placeholder="Seleccionar duración"
                    onIonChange={e => setSelectedInterval(e.detail.value)}
                >
                    {intervalOptions.map(option => (
                        <IonSelectOption key={option.value} value={option.value}>
                            {option.label}
                        </IonSelectOption>
                    ))}
                </IonSelect>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <QRCodeSVG
                        value={qrString}
                        size={256}
                        level="H"

                    />
                </div>

                <IonText color="medium" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
                    <p>Este código QR expirará en {intervalOptions.find(opt => opt.value === selectedInterval)?.label}</p>
                </IonText>
            </IonCardContent>
        </IonCard>
    );
}; 