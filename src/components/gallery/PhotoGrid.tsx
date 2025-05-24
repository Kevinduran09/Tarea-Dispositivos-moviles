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
        <div className="columns-2 md:columns-3 space-y-2 p-2 mt-4">
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