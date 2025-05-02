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
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const tokens = await getAllPushTokens();
      setDevices(tokens);
    };
    fetchDevices();
  }, []);

  const openModal = (token?: string) => {
    setSelectedTokens(token ? [token] : selectedTokens);
    setShowModal(true);
  };

  const toggleTokenSelection = (token: string): boolean => {
    const isSelected = selectedTokens.includes(token);
    setSelectedTokens(prev =>
      isSelected ? prev.filter(t => t !== token) : [...prev, token]
    );
    return !isSelected;
  };
  const resetToken=()=>{
    setSelectedTokens([])
  }
  return (
    <IonPage id="admin-page">
      <AppHeader title="Panel de Administración" showMenuButton />
      <IonContent fullscreen className="admin-content">
        <div className="devices-container flex flex-col py-3 mx-3 h-full">
          <IonList className="flex-1">
            {devices.map(device => (
              <DeviceListItem
                key={device.uid}
                device={device}
                onSelectToken={toggleTokenSelection}
                onSendSingle={() => openModal(device.token)}
              />
            ))}
          </IonList>

          {selectedTokens.length >= 1 && (
            <IonButton expand="block" color="primary" onClick={() => openModal()}>
              Enviar a {selectedTokens.length} dispositivos seleccionados
            </IonButton>
          )}

          <ModalNotificationForm
            resetToken={resetToken}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            selectedTokens={selectedTokens}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;