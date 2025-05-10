import { GoogleMap } from '@capacitor/google-maps';
import { Marker } from '../types/map.types';

export const createMap = async (
    element: HTMLElement,
    position: GeolocationPosition,
    apiKey: string
): Promise<GoogleMap> => {
    return await GoogleMap.create({
        id: 'my-map-ionic',
        element,
        apiKey,
        config: {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            },
            zoom: 14,
        },
    });
};

export const addCurrentLocationMarker = async (
    map: GoogleMap,
    position: GeolocationPosition
): Promise<Marker> => {
    const markerId = await map.addMarker({
        coordinate: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        },
        title: 'Mi ubicación',
        snippet: 'Estás aquí'
    });

    return {
        id: markerId,
        coordinate: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        },
        title: 'Mi ubicación',
        description: 'Estás aquí'
    };
}; 