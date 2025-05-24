import React from 'react';
import { Photo } from '../../Services/CameraService';

interface PhotoCardProps {
    photo: Photo;
    onEdit: () => void;
    onDelete: () => void;
    onPhotoClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onPhotoClick }) => {
    return (
        <div className="relative bg-white !rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
                src={photo.url}
                alt="Foto"
                className="w-full h-auto object-cover cursor-pointer"
                onClick={onPhotoClick}
            />
            <div className="absolute bottom-0 left-0 p-2">
                <span className="text-white text-xs bg-black/50 px-2 py-1 rounded-full">
                    {photo.category}
                </span>
            </div>
        </div>
    );
};

export default PhotoCard; 