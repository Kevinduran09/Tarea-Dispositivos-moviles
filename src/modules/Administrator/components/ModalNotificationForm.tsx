import {
    IonModal,
    IonButton,
    IonContent,
    IonInput,
    IonTextarea,
    IonImg,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSegmentView,
    IonSegmentContent,
    IonText,
    IonTitle,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { sendMulticastNotification, sendSingleNotification, sendTopicNotification } from '../service/SendNotificationsService';
import SingleNotificationForm from './SingleNotificationForm';
import TopicNotificationForm from './TopicNotificaction';

interface ExtraDataField {
    key: string;
    value: string;
}

interface NotificationFormData {
    token: string;
    title: string;
    body: string;
    topic?: string;
    image: string;
    extraData: ExtraDataField[];
}

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTokens: string[]
    resetToken:()=>void
}

const defaultFormState: NotificationFormData = {
    token: '',
    title: '',
    body: '',
    image: '',
    extraData: [{ key: '', value: '' }],
};

const ModalNotificationForm: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
    selectedTokens,
    resetToken
}) => {
    const [formState, setFormState] = useState<NotificationFormData>(defaultFormState);
    const [selectedSegment, setSelectedSegment] = useState<'single' | 'topic'>('single');

    useEffect(() => {
        if (selectedTokens.length === 1) {
            setFormState(prev => ({ ...prev, token: selectedTokens[0] }));
        } else {
            setFormState(defaultFormState);
        }
    }, [selectedTokens, isOpen]);

    const handleAddField = () => {
        setFormState(prev => ({
            ...prev,
            extraData: [...prev.extraData, { key: '', value: '' }],
        }));
    };

    const handleFieldChange = (index: number, field: 'key' | 'value', newValue: string) => {
        const updated = [...formState.extraData];
        updated[index][field] = newValue;
        setFormState(prev => ({ ...prev, extraData: updated }));
    };

    const removeField = (index: number) => {
        const updated = formState.extraData.filter((_, i) => i !== index);
        setFormState(prev => ({ ...prev, extraData: updated }));
    };

    const onSubmit = async () => {
        if(formState.topic !=null){
            await sendTopicNotification(formState)
        }
        const result = selectedTokens.length > 1
            ? await sendMulticastNotification(formState, selectedTokens)
            : await sendSingleNotification({ ...formState, token: selectedTokens[0] });

        alert(result);
        onClose();
    };
    const closeModal =()=>{
        resetToken()
        onClose();
    }
    return (
        <IonModal
            isOpen={isOpen}
            onDidDismiss={onClose}
            initialBreakpoint={1}
            breakpoints={[0, 1]}
            className="ion-modal-rounded"
        >
            <IonContent className="ion-padding bg-gray-50">
                <div className="flex flex-row justify-between items-end mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Enviar Notificación</h2>
                    <IonButton
                        onClick={closeModal}
                        fill="clear"
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Cerrar
                    </IonButton>
                </div>
                <IonSegment value={selectedSegment}
                    onIonChange={(e) => setSelectedSegment(e.detail.value as 'single' | 'topic')}>
                    <IonSegmentButton value={'single'} contentId='single'>
                        <IonLabel>Notificación Normal</IonLabel>
                    </IonSegmentButton>


                    <IonSegmentButton value={'topic'} contentId='topic'>
                        <IonLabel>Notificación por Tema</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <IonSegmentContent>
                    {selectedSegment === 'single' && (
                        <SingleNotificationForm
                            formState={formState}
                            setFormState={setFormState}
                            handleFieldChange={handleFieldChange}
                            removeField={removeField}
                            handleAddField={handleAddField}
                            onSubmit={onSubmit}
                        />
                    )}

                    {selectedSegment === 'topic' && (
                        <TopicNotificationForm
                            formState={formState}
                            setFormState={setFormState}
                            handleFieldChange={handleFieldChange}
                            removeField={removeField}
                            handleAddField={handleAddField}
                            onSubmit={onSubmit}
                        />
                    )}

                </IonSegmentContent>

            </IonContent>
        </IonModal>
    );
};

export default ModalNotificationForm;