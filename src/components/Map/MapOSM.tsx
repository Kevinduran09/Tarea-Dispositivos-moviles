import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapOSM.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

// Configuración del ícono por defecto
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const maps = {
    base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

// Ubicación por defecto (Ciudad de México)
const DEFAULT_POSITION = {
    coords: {
        latitude: 19.4326,
        longitude: -99.1332
    }
};

const MapUpdater: React.FC<{ position: GeolocationPosition }> = ({ position }) => {
    const map = useMap();
    
    useEffect(() => {
        if (position) {
            map.setView([position.coords.latitude, position.coords.longitude], 13);
        }
    }, [position, map]);

    return null;
};

const MapOSM: React.FC = () => {
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        setPosition(pos);
                        setError(null);
                    },
                    (err) => {
                        console.error('Error al obtener la ubicación:', err);
                        setError('No se pudo obtener tu ubicación');
                        setPosition(DEFAULT_POSITION as GeolocationPosition);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                console.log('Geolocalización no disponible');
                setError('La geolocalización no está disponible en tu navegador');
                setPosition(DEFAULT_POSITION as GeolocationPosition);
            }
        };

        getLocation();
    }, []);

    return (
        <div className="map-container">
            {error && <div className="error-message">{error}</div>}
            <MapContainer
                center={[position?.coords.latitude || DEFAULT_POSITION.coords.latitude, 
                        position?.coords.longitude || DEFAULT_POSITION.coords.longitude]}
                zoom={13}
                style={{ height: "100vh", width: "100%", padding: 0 }}
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url={maps.base}
                />
                {position && (
                    <>
                        <Marker position={[position.coords.latitude, position.coords.longitude]}>
                            <Popup>
                                {error ? 'Ubicación por defecto' : '¡Estás aquí!'}
                            </Popup>
                        </Marker>
                        <MapUpdater position={position} />
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default MapOSM; 