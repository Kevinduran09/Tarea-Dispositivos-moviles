import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useIonViewDidEnter, IonPage } from '@ionic/react';
import { useState, useLayoutEffect, useEffect } from 'react';
import useLocation from '../../hooks/useLocation';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente para invalidar tamaño
const ResizeHandler = () => {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => map.invalidateSize(), 0);
    }, [map]);
    return null;
};

const SimpleMap = () => {
    const [renderMap, setRenderMap] = useState(false);
    const { state, getCurrentPosition, requestPermissions } = useLocation();
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    useEffect(() => {
        const setup = async () => {
            try {
                await requestPermissions();
                const pos = await getCurrentPosition();
                if (pos) {
                    setPosition(pos as GeolocationPosition);
                } else {
                    console.error('Position is undefined');
                }
            } catch (err) {
                console.error('Error getting permissions or position', err);
            }
        };

        setup();
    }, []);

    // Delay opcional para evitar render prematuro
    useLayoutEffect(() => {
        setTimeout(() => setRenderMap(true), 10);
    }, []);

    // Forzar resize al entrar en la vista Ionic
    useIonViewDidEnter(() => {
        window.dispatchEvent(new Event('resize'));
    });

    return (
        <IonPage>
            {state.loading ? (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <p style={{ fontSize: '1.2rem', color: '#333' }}>Cargando mapa...</p>
                </div>
            ) : (
                <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
                    <MapContainer center={position ? [position.coords.latitude, position.coords.longitude] : [0, 0]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <ResizeHandler />
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <Marker position={position ? [position.coords.latitude, position.coords.longitude] : [0, 0]}>
                            <Popup>Ubicación fija</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
            {/* {renderMap && (
                
            )} */}
        </IonPage>
    );
};

export default SimpleMap;