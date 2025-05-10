export interface Marker {
    id: string;
    coordinate: {
        lat: number;
        lng: number;
    };
    title: string;
    description: string;
}

export interface AddMarkerModalProps {
    lat: number;
    lng: number;
    onDismiss: () => void;
    onAddMarker: (marker: Omit<Marker, 'id'>) => void;
} 