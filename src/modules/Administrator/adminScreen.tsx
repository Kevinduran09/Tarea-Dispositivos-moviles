import {
  IonPage,
  IonContent,
  IonList,
  IonButton,
  IonTitle,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAllPushTokens } from '../../Services/firebase/notification';
import AppHeader from '../../components/head/AppHeader';
import DeviceListItem from './components/DeviceListItem';
import ModalNotificationForm from './components/ModalNotificationForm';

interface TokenInfo {
  uid: string;
  token: string;
  owner: string;
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

const AdminPage: React.FC = () => {
  const [devices, setDevices] = useState<TokenInfo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const tokens = await getAllPushTokens();
        setDevices(tokens);
      } catch (error) {
        console.error('Error al cargar dispositivos:', error);
        setDevices([]);
      }
    };
    fetchDevices();
  }, []);

  const openModal = (token?: string) => {
    if (token) {
      setSelectedTokens([token]);
    }
    setShowModal(true);
  };

  const toggleTokenSelection = (token: string) => {
    setSelectedTokens(prev => {
      const isSelected = prev.includes(token);
      if (isSelected) {
        return prev.filter(t => t !== token);
      } else {
        return [...prev, token];
      }
    });
  };

  const resetToken = () => {
    setSelectedTokens([]);
  };

  return (
    <IonPage id="admin-page">
      <AppHeader title="Panel de Administración" showMenuButton />
      <IonContent fullscreen className="admin-content">
        <div className="space-y-5 mt-4 py-3 mx-3 h-full">
          <IonTitle className='text-2xl font-bold border-b-2 border-gray-300 pb-2'>
            Dispositivos registrados
          </IonTitle>

          <IonList className="flex-1">
            {devices.map(device => (
              <DeviceListItem
                key={device.uid}
                device={device}
                onSelectToken={toggleTokenSelection}
                onSendSingle={() => openModal(device.token)}
                isSelected={selectedTokens.includes(device.token)}
              />
            ))}
          </IonList>

          {selectedTokens.length > 0 && (
            <IonButton expand="block" color="primary" onClick={() => openModal()}>
              Enviar a {selectedTokens.length} dispositivos seleccionados
            </IonButton>
          )}

          <ModalNotificationForm
            resetToken={resetToken}
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              resetToken();
            }}
            selectedTokens={selectedTokens}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;