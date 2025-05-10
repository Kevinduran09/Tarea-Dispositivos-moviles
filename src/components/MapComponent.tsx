import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap } from '@capacitor/google-maps';
import useLocation from '../hooks/useLocation';
import AddMarkerModal from './AddMarkerModal';
import { Marker } from '../types/map.types';
import { createMap, addCurrentLocationMarker } from '../utils/mapUtils';

const MapComponent: React.FC = () => {
    const { state, getCurrentPosition, requestPermissions } = useLocation();
    const mapRef = useRef(null);
    const mapInstance = useRef<GoogleMap | null>(null);
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [showAddMarkerModal, setShowAddMarkerModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

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

    const handleAddMarker = async (markerData:any) => {
        if (!mapInstance.current) return;

        const markerId = await mapInstance.current.addMarker({
            coordinate: markerData.coordinate,
            title: markerData.title,
            snippet: markerData.description
        });

        setMarkers(prev => [...prev, { ...markerData, id: markerId }]);
    };

    useEffect(() => {
        const initializeMap = async () => {
            if (!mapRef.current || !position || mapInstance.current) return;

            try {
                const map = await createMap(
                    mapRef.current,
                    position,
                    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                );

                mapInstance.current = map;

                const currentMarker = await addCurrentLocationMarker(map, position);
                setMarkers([currentMarker]);

                map.setOnMapClickListener((event) => {
                    setSelectedLocation({
                        lat: event.latitude,
                        lng: event.longitude
                    });
                    setShowAddMarkerModal(true);
                });

                map.setOnMarkerClickListener(async (marker) => {
                
                });
            } catch (error) {
                console.error('Error initializing map:', error);
            }
        };

        initializeMap();
    }, [position]);

    return (
        <>
            {state.loading && (
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
            )}
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} id="map" />

            {showAddMarkerModal && selectedLocation && (
                <AddMarkerModal
                    lat={selectedLocation.lat}
                    lng={selectedLocation.lng}
                    onDismiss={() => {
                        setShowAddMarkerModal(false);
                        setSelectedLocation(null);
                    }}
                    onAddMarker={handleAddMarker}
                />
            )}
        </>
    );
};

export default MapComponent;
