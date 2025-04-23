// src/Services/notifications/service.ts

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

interface SendNotificationPayload {
    title: string;
    body: string;
    image:string
    data: Record<string, string>;
}

export const buildPayload = (formState: NotificationFormData): SendNotificationPayload => {
    return {
        title: formState.title,
        body: formState.body,
        image: formState.image,
        data: Object.fromEntries(
            formState.extraData
                .filter(({ key }) => key.trim() !== '')
                .map(({ key, value }) => [key, value])
        ),
    };
};

export const sendSingleNotification = async (formState: NotificationFormData): Promise<string> => {
    const payload = buildPayload(formState);
    console.log(`url: ${"http://192.168.50.221:3000"}`);
    
    const response = await fetch('http://192.168.50.221:3000/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: formState.token, ...payload }),
    });

    const result = await response.json();
    return result.message || 'Sin mensaje de respuesta';
};

export const sendMulticastNotification = async (formState: NotificationFormData, selectedTokens: string[]): Promise<string> => {
    const payload = buildPayload(formState);

    const response = await fetch('http://192.168.50.221:3000/api/send-multicast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({tokens:selectedTokens,...payload}),
    });

    const result = await response.json();
    return result.message || 'Sin mensaje de respuesta';
};