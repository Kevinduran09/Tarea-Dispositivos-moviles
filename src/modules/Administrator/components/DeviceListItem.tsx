import {
    IonItem,
    IonLabel,
    IonCheckbox,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { send, eye, eyeOff } from 'ionicons/icons';
import React, { useState } from 'react';

interface DeviceListItemProps {
    device: {
        uid: string;
        token: string;
        owner: string;
    };
    onSelectToken: (token: string) => boolean;
    onSendSingle: (token: string) => void;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({
    device,
    onSelectToken,
    onSendSingle,
}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [showToken, setShowToken] = useState(false);

    const handleSelect = () => {
        const isAdd = onSelectToken(device.token);
        setIsSelected(isAdd);
    };

    const toggleShowToken = () => {
        setShowToken(prev => !prev);
    };

    return (
        <IonItem className="device-list-item">
            <div className="flex flex-col w-full space-y-2 md:space-y-0 md:flex-row md:justify-between md:items-center">
             
                <div className="flex  items-start space-x-3 w-full md:w-auto">
                    <IonCheckbox
                        checked={isSelected}
                        onIonChange={handleSelect}
                        color="primary"
                    />

                    <IonLabel className="flex  flex-col text-sm md:text-base">
                        <div className="text-gray-500 text-xs md:text-sm">ID del dispositivo:</div>
                        <strong className="text-wrap break-all">{device.uid.slice(0, 25)}...</strong>
                        <div className="text-gray-500 text-xs md:text-sm">Propietario del dispositivo:</div>
                        <strong className="text-wrap break-all">{device.owner}</strong>
                        <div className="text-gray-500 text-xs md:text-sm mt-2">Token del dispositivo:</div>
                        <div className="flex items-center space-x-2">
                            <span className="text-wrap break-all font-mono">
                                {showToken ? device.token : '•••••••••••••••••••••••••'}
                            </span>
                            <IonButton fill="clear" size="small" onClick={toggleShowToken}>
                                <IonIcon icon={showToken ? eyeOff : eye} slot="icon-only" />
                            </IonButton>
                        </div>
                    </IonLabel>
                </div>

                {/* Botón enviar */}
                <div className="flex justify-end mt-2 md:mt-0">
                    <IonButton
                        fill="clear"
                        color="primary"
                        onClick={() => onSendSingle(device.token)}
                        size="default"
                    >
                        <IonIcon icon={send} slot="icon-only" />
                    </IonButton>
                </div>
            </div>
        </IonItem>
    );
};

export default DeviceListItem;
