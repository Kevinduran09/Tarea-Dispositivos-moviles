import React from 'react';
import { IonAvatar } from '@ionic/react';

interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = 'Avatar', className = '' }) => {
  return (
    <IonAvatar className={className}>
      <img src={src} alt={alt} />
    </IonAvatar>
  );
};

export default Avatar; 