import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonTitle, IonInput, IonLabel, IonItem, IonTextarea, IonModal } from '@ionic/react';
import { AddMarkerModalProps } from '../types/map.types';

const AddMarkerModal: React.FC<AddMarkerModalProps> = ({ lat, lng, onDismiss, onAddMarker }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        onAddMarker({
            coordinate: { lat, lng },
            title,
            description
        });
        onDismiss();
    };

    return (
        <IonModal
            isOpen={true}
            onDidDismiss={onDismiss}
            breakpoints={[0, 0.5]}
            initialBreakpoint={0.5}
            className="custom-modal"
        >
            <IonHeader className="ion-no-border">
                <div className="flex mt-8 justify-between mx-5">
                    <IonTitle>Agregar Marcador</IonTitle>
                    <IonButton fill="clear" onClick={onDismiss}>
                        Cancelar
                    </IonButton>
                </div>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Título</IonLabel>
                    <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Descripción</IonLabel>
                    <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} />
                </IonItem>
                <div className="ion-padding">
                    <p><strong>Latitud:</strong> {lat}</p>
                    <p><strong>Longitud:</strong> {lng}</p>
                </div>
                <IonButton expand="block" onClick={handleSubmit} disabled={!title}>
                    Agregar Marcador
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default AddMarkerModal; 