import {
  IonPage,
  IonContent,
  IonList,
  IonButton,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAllPushTokens } from '../../Services/firebase/notification';
import AppHeader from '../../components/head/AppHeader';
import DeviceListItem from './components/DeviceListItem';
import ModalNotificationForm from './components/ModalNotificationForm';

interface TokenInfo {
  uid: string;
  token: string;
  owner:string;
}

interface ExtraDataField {
  key: string;
  value: string;
}

interface NotificationFormData {
  token: string,
  title: string;
  body: string;
  image: string;
  extraData: ExtraDataField[];
}

const defaultFormState: NotificationFormData = {
  token: '',
  title: '',
  body: '',
  image: '',
  extraData: [{ key: '', value: '' }],
};

const AdminPage: React.FC = () => {
  const [devices, setDevices] = useState<TokenInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState<NotificationFormData>(defaultFormState);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([])
  useEffect(() => {
    const fetchDevices = async () => {
      const tokens = await getAllPushTokens();
      setDevices(tokens);
    };
    fetchDevices();
  }, []);


  const openModal = (token: string) => {
    setFormState({
      ...formState,
      token: token
    });
    setShowModal(true);
  };
  const toggleTokenSelection = (token: string):  boolean => {
    const exists = selectedTokens.includes(token);
    if (exists) {
      setSelectedTokens(prev => prev.filter(t => t !== token));
      return false;
    } else {
      setSelectedTokens(prev => [...prev, token]);
      return true;
    }
  };

  return (
    <IonPage id="admin-page">
      <AppHeader title="Panel de Administración" showMenuButton={true} />
      <IonContent fullscreen className="admin-content">
        <div className="devices-container flex flex-col py-3 mx-3 h-full">
          <IonList className="flex-1">
            {devices.map((device) => (
              <DeviceListItem
                key={device.uid}
                device={device}
                onSelectToken={toggleTokenSelection}
                onSendSingle={openModal}
              />
            ))}
          </IonList>

          {selectedTokens.length >= 1 && (
            <div className="s">
              <IonButton
                expand="block"
                color="primary"
                onClick={() => setShowModal(true)}
              >
                Enviar a {selectedTokens.length} dispositivos seleccionados
              </IonButton>
            </div>
          )}
          <ModalNotificationForm
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            formState={formState}
            setFormState={setFormState}
            selectedTokens={selectedTokens}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;