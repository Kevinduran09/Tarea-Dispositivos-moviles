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

const URL_BASE = "172.29.176.1:3000"
export const sendSingleNotification = async (formState: NotificationFormData): Promise<string> => {
    const payload = buildPayload(formState);
    console.log(`url: ${`http://${URL_BASE}:3000`}`);
    
    const response = await fetch(`http://${URL_BASE}/api/send-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: formState.token, ...payload }),
    });

    const result = await response.json();
    return result.message || 'Sin mensaje de respuesta';
};

export const sendMulticastNotification = async (formState: NotificationFormData, selectedTokens: string[]): Promise<string> => {
    const payload = buildPayload(formState);

    const response = await fetch(`http://${URL_BASE}/api/send-multicast`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({tokens:selectedTokens,...payload}),
    });

    const result = await response.json();
    return result.message || 'Sin mensaje de respuesta';
};