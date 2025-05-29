import React, { useState, useEffect } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IonButton, IonCard, IonCardContent, IonText, IonIcon, IonToast } from '@ionic/react';
import { closeOutline, scanOutline } from 'ionicons/icons';
import '../theme/qr-scanner.css';

interface QRData {
    userId: string;
    email: string;
    timestamp: number;
    selectedInterval: number;
}

export const QRScanner: React.FC = () => {
    const [scanResult, setScanResult] = useState<QRData | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
       
        return () => {
            stopScan();
        };
    }, []);

    const checkQRValidity = (data: QRData) => {
        const currentTime = Date.now();
        const qrTime = data.timestamp;
        const timeDiff = (currentTime - qrTime) / 1000;
        return timeDiff <= data.selectedInterval;
    };

    const checkPermissions = async () => {
        try {
            const status = await BarcodeScanner.checkPermission({ force: true });
            if (!status.granted) {
                setToastMessage('Se requiere permiso para acceder a la cámara');
                setShowToast(true);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error al verificar permisos:', error);
            setToastMessage('Error al verificar permisos de la cámara');
            setShowToast(true);
            return false;
        }
    };

    const stopScan = async () => {
        try {
            await BarcodeScanner.showBackground();
            await BarcodeScanner.stopScan();
            document.querySelector('body')?.classList.remove('scanner-active');
            setIsScanning(false);
        } catch (error) {
            console.error('Error al detener el escáner:', error);
        }
    };

    const startScan = async () => {
        try {
            const hasPermission = await checkPermissions();
            if (!hasPermission) return;

            setIsScanning(true);
            document.querySelector('body')?.classList.add('scanner-active');
            await BarcodeScanner.hideBackground();

            const result = await BarcodeScanner.startScan({
                targetedFormats: ['QR_CODE']
            });

            if (result.hasContent) {
                try {
                    const qrData: QRData = JSON.parse(result.content);
                    setScanResult(qrData);
                    setIsValid(checkQRValidity(qrData));
                } catch (error) {
                    console.error('Error al parsear el QR:', error);
                    setToastMessage('Error al leer el código QR');
                    setShowToast(true);
                    setIsValid(false);
                }
            }
        } catch (error) {
            console.error('Error al escanear:', error);
            setToastMessage('Error al iniciar el escáner');
            setShowToast(true);
        } finally {
            await stopScan();
        }
    };

    return (
        <div className="qr-scanner-container">
            {isScanning && (
                <IonButton className="floating-button" onClick={stopScan}>
                    <IonIcon icon={closeOutline} />
                </IonButton>
            )}
            <IonCard>
                <IonCardContent>
                    <IonText>
                        <h2>Escanear Código QR</h2>
                    </IonText>

                    <IonButton expand="block" onClick={startScan} disabled={isScanning}>
                        <IonIcon slot="start" icon={scanOutline} />
                        {isScanning ? 'Escaneando...' : 'Escanear QR'}
                    </IonButton>

                    {scanResult && (
                        <div style={{ marginTop: '20px' }}>
                            <IonText color={isValid ? 'success' : 'danger'}>
                                <h3>Estado: {isValid ? 'Válido' : 'Expirado'}</h3>
                            </IonText>

                            <IonText>
                                <p>Usuario ID: {scanResult.userId}</p>
                                <p>Email: {scanResult.email}</p>
                                <p>Generado: {new Date(scanResult.timestamp).toLocaleString()}</p>
                                <p>Duración: {scanResult.selectedInterval} segundos</p>
                            </IonText>
                        </div>
                    )}

                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message={toastMessage}
                        duration={3000}
                        position="bottom"
                    />
                </IonCardContent>
            </IonCard>
        </div>
    );
}; 