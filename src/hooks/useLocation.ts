import { useEffect, useState } from "react";
import { Geolocation, PermissionStatus, Position } from "@capacitor/geolocation";

interface LocationState {
    location: Position | null;
    loading: boolean;
    error: string | null;
}

const useLocation = () => {
    const [state, setState] = useState<LocationState>({
        location: null,
        loading: true,
        error: null,
    });


    const requestPermissions = async () => {
        setState(prev => ({ ...prev, loading: true }));
        const available = await Geolocation.checkPermissions()
        if (available.location !== 'granted') {
            const requestStatus = await Geolocation.requestPermissions()

            if (requestStatus.location !== 'granted') {
                throw new Error('Permiso de ubicacion no concedido')
            }

        }
    }
    const getCurrentPosition = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 10000,
            });
            console.log('position is: ',position);
            
            setState({
                location: position,
                loading: false,
                error: null,
            });
            return position
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: `Error getting location: ${error instanceof Error ? error.message : String(error)}`
            }));
        }
    }


    return {state,requestPermissions,getCurrentPosition};
};

export default useLocation;