import {
    IonModal,
    IonButton,
    IonContent,
    IonInput,
    IonTextarea,
    IonImg,
} from '@ionic/react';
import React from 'react';
import { sendMulticastNotification, sendSingleNotification } from '../service/SendNotificationsService';

interface ExtraDataField {
    key: string;
    value: string;
}

interface NotificationFormData {
    token: string;
    title: string;
    body: string;
    image: string;
    extraData: ExtraDataField[];
}

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    formState: NotificationFormData;
    setFormState: React.Dispatch<React.SetStateAction<NotificationFormData>>;
    selectedTokens: string[]
}

const ModalNotificationForm: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
    formState,
    setFormState,
    selectedTokens
}) => {
    const handleAddField = () => {
        setFormState({
            ...formState,
            extraData: [...formState.extraData, { key: '', value: '' }],
        });
    };

    const handleFieldChange = (index: number, field: 'key' | 'value', newValue: string) => {
        const updated = [...formState.extraData];
        updated[index][field] = newValue;
        setFormState({ ...formState, extraData: updated });
    };

    const removeField = (index: number) => {
        const updated = formState.extraData.filter((_, i) => i !== index);
        setFormState({ ...formState, extraData: updated });
    };
    const onSubmit = async () => {
        let result = ''
        if (selectedTokens.length >= 1) {
            result = await sendMulticastNotification(formState, selectedTokens);
        } else {
            result = await sendSingleNotification(formState);
        }
        alert(result)
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
                        onClick={onClose}
                        fill="clear"
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Cerrar
                    </IonButton>
                </div>
                <div className="max-w-md mx-auto space-y-6">

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <IonInput
                            value={formState.title}
                            onIonChange={(e) => setFormState({ ...formState, title: e.detail.value! })}
                            placeholder="Ingrese el título"
                            className="bg-white rounded-lg !px-2 shadow-sm border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>


                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Contenido</label>
                        <IonTextarea
                            value={formState.body}
                            onIonChange={(e) => setFormState({ ...formState, body: e.detail.value! })}
                            placeholder="Ingrese el contenido del mensaje"
                            rows={4}
                            className="bg-white rounded-lg !px-2 shadow-sm border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>


                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Imagen (URL)</label>
                        <IonInput
                            value={formState.image}
                            onIonChange={(e) => setFormState({ ...formState, image: e.detail.value! })}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className="bg-white rounded-lg shadow-sm !px-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Vista previa de imagen */}
                    {formState.image && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Vista previa</label>
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <IonImg
                                    src={formState.image}
                                    className="w-full h-48 object-contain bg-gray-100"
                                    alt="Preview de la notificación"
                                />
                            </div>
                        </div>
                    )}

                    {/* Datos adicionales */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Datos adicionales</label>

                        {formState.extraData.map((item, index) => (
                            <div key={index} className="flex items-end space-x-2">
                                <div className="flex-1 space-y-1">
                                    <label className="text-xs text-gray-500">Clave</label>
                                    <IonInput
                                        placeholder="Nombre del campo"
                                        value={item.key}
                                        onIonChange={(e) => handleFieldChange(index, 'key', e.detail.value!)}
                                        className="bg-white !px-2 rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div className="flex-1 space-y-1">
                                    <label className="text-xs text-gray-500">Valor</label>
                                    <IonInput
                                        placeholder="Valor del campo"
                                        value={item.value}
                                        onIonChange={(e) => handleFieldChange(index, 'value', e.detail.value!)}
                                        className="bg-white !px-2 rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                {formState.extraData.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeField(index)}
                                        className="mb-1 p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddField}
                            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Agregar campo adicional
                        </button>
                    </div>

                    {/* Botón de enviar */}
                    <div className="pt-4">
                        <button
                            onClick={onSubmit}
                            className="w-full h-10 !rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-5 px-4 shadow-md font-medium transition duration-150 ease-in-out"
                        >
                            Enviar Notificación
                        </button>
                    </div>
                </div>
            </IonContent>
        </IonModal>
    );
};

export default ModalNotificationForm;