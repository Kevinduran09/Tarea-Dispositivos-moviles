

export const getTopics = async () => {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&apikey=${import.meta.env.VITE_API_KEY_NEWS}`)
    const data = await response.json()
    return data
}


interface SubscribeResponse {
    success: boolean;
    message: string;
    response: any;
}

export const toggleTopicSubscription = async (
    tokens: string[],
    topic: string,
    action: 'subscribe' | 'unsubscribe'
): Promise<SubscribeResponse> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/subscribe-topic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokens,
                topic,
                action,
            }),
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Error en la suscripción');
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Error al comunicarse con el servidor');
        } else {
            throw new Error('Error al comunicarse con el servidor');
        }
    }
};