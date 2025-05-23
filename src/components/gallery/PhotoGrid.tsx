import React from 'react';
import { Photo } from '../../Services/CameraService';
import PhotoCard from './PhotoCard';

interface PhotoGridProps {
    photos: Photo[];
    onEdit: (photo: Photo) => void;
    onDelete: (photo: Photo) => void;
    onPhotoClick: (photo: Photo) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onEdit, onDelete, onPhotoClick }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2 mt-4">
            {photos.map(photo => (
                <PhotoCard
                    key={photo.id}
                    photo={photo}
                    onEdit={() => onEdit(photo)}
                    onDelete={() => onDelete(photo)}
                    onPhotoClick={() => onPhotoClick(photo)}
                />
            ))}
        </div>
    );
};

export default PhotoGrid; 