import React from 'react';
import { useAccelerometer } from '../hooks/useAccelerometer';

const NivelBurbuja: React.FC = () => {
    const { x, y } = useAccelerometer();

 
    const posX = Math.max(-10, Math.min(10, x));
    const posY = Math.max(-10, Math.min(10, y));

    return (
        <div className="bg-white p-4 rounded-xl shadow-md text-center flex-col items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800 !mb-5">Nivel de Burbuja</h2>
            <div className="relative w-52 h-52 border-2 border-black rounded-full overflow-hidden">
                <div
                    className="absolute w-5 h-5 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: `calc(50% + ${posX * 5}px)`,
                        top: `calc(50% + ${posY * 5}px)`,
                    }}
                />
            </div>
        </div>
    );
};

export default NivelBurbuja;
