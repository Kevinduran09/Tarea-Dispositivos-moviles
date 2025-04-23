import {
    IonItem,
    IonLabel,
    IonCheckbox,
    IonButton,
    IonIcon,
} from '@ionic/react';
import { send } from 'ionicons/icons';
import React, { useState } from 'react';

interface DeviceListItemProps {
    device: {
        uid: string;
        token: string;
    };
    onSelectToken: (token: string) => boolean;
    onSendSingle: (token: string) => void;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({
    device,
    onSelectToken,
    onSendSingle,
}) => {
    const [isSelected, setisSelected] = useState(false)

    const handleSelect = () => {
        const isAdd = onSelectToken(device.token);
        console.log(isAdd);

        setisSelected(isAdd);
    }
    return (
        <IonItem className="device-list-item">
            <div className='flex flex-row w-full justify-between items-center'>
                <div>
                    <IonCheckbox
                        checked={isSelected}
                        onIonChange={() => handleSelect()}
                        color="primary"
                    />
                </div>
                <IonLabel >
                    <strong className="device-uid">{device.uid}</strong>
                    <div className="device-token">{device.token.slice(0, 25)}...</div>
                </IonLabel>


                <IonButton
                    fill="clear"
                    color="primary"
                    onClick={() => onSendSingle(device.token)}
                    size='default'
                >
                    <IonIcon icon={send} slot="icon-only" />
                </IonButton>
            </div>
        </IonItem>
    );
};

export default DeviceListItem;