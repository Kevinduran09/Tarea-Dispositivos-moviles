import { useState, useEffect } from "react";
interface Topic {
    topic: string;
    description: string;
    img: string;
    isSubscribe: boolean;
}
import { Storage } from '@ionic/storage';
import { toggleTopicSubscription } from "../Services/topicsService";
import { useAuth } from "./useAuth";
import { useAuthStore } from "../store/useAuthStore";
import { Toast } from "@capacitor/toast";

const TOPICS = [
    {
        topic: "breaking-news",
        description: "Últimas noticias",
        img: "https://gray-wifr-prod.gtv-cdn.com/resizer/v2/GZXYVYBQSBAYNO5QVFA3QVRUOE.jpg?auth=afd29ce822d206994cfafd6c1c661dd41457299fde9805ca1ca4db825c5d76b2&width=800&height=450&smart=true"
    },
    {
        topic: "world",
        description: "Noticias del mundo",
        img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        topic: "nation",
        description: "Noticias nacionales",
        img: "https://media.diariolasamericas.com/p/f4af72c498a82234fa31c2cc03a3ca4f/adjuntos/216/imagenes/001/601/0001601729/375x211/smart/el-nacional-17png.png"
    },
    {
        topic: "business",
        description: "Negocios y finanzas",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        topic: "technology",
        description: "Tecnología e innovación",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        topic: "entertainment",
        description: "Entretenimiento y espectáculos",
        img: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
        topic: "sports",
        description: "Deportes y actividades",
        img: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        topic: "science",
        description: "Ciencia y descubrimientos",
        img: "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        topic: "health",
        description: "Salud y bienestar",
        img: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    }
];
const showToast = async (message: string) => {
    await Toast.show({
        text: message,
        duration: 'short',
        position: 'bottom',
    });
};
export default function useTopicsStorage() {
    
    const [topics, setTopics] = useState<Topic[]>([]);
    const [storeInstance, setStoreInstance] = useState<Storage | null>(null);

    useEffect(() => {
        (async () => {
            const store = new Storage();
            await store.create();
            setStoreInstance(store);

            const saved = await store.get('user-topics');
            const defaultTopics = TOPICS.map(t => ({ ...t, isSubscribe: false }));
            setTopics(saved || defaultTopics);
        })();
    }, []);

    const toggleSubscribe = async (index: number, topic: string) => {
        if (!storeInstance) return;
        try {
           
            const action = topics[index].isSubscribe ? 'unsubscribe' : 'subscribe';

            // Actualizamos el estado de la UI antes de la llamada
            const updated = [...topics];
            updated[index].isSubscribe = !updated[index].isSubscribe;
            setTopics(updated);
            await storeInstance.set('user-topics', updated);
        
            // Realizamos la llamada al backend
            const token = useAuthStore.getState().deviceToken;
            if (!token) return;
            console.log('token: ', token);
            
            const response = await toggleTopicSubscription([token], topic, action);
            const interimMessage = updated[index].isSubscribe
                ? `Te has suscrito a "${topic}"`
                : `Has cancelado la suscripción a "${topic}"`;
            await showToast(interimMessage);

           
            console.log(response.message);

        } catch (error) {
            // Si ocurre un error, revertimos la UI
            const updated = [...topics];
            updated[index].isSubscribe = !updated[index].isSubscribe; // Revertir el cambio visual
            setTopics(updated);
            await showToast("Ocurrió un error. Intenta de nuevo.");
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    };

    return { topics, toggleSubscribe };
}
