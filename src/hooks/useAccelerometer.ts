// src/hooks/useAccelerometer.ts
import { useEffect, useState } from 'react';
import { Motion } from '@capacitor/motion';
import type { PluginListenerHandle } from '@capacitor/core';

interface Acceleration {
    x: number;
    y: number;
    z: number;
}

export const useAccelerometer = (): Acceleration => {
    const [accel, setAccel] = useState<Acceleration>({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        let accelHandler: PluginListenerHandle;
        const startListening = async () => {
            if (
                typeof DeviceMotionEvent !== 'undefined' &&
                typeof (DeviceMotionEvent as any).requestPermission === 'function'
            ) {
                try {
                    const permission = await (DeviceMotionEvent as any).requestPermission();
                    if (permission !== 'granted') {
                        console.warn('Permiso de movimiento denegado');
                        return;
                    }
                } catch (error) {
                    console.error('Error al solicitar permiso de movimiento', error);
                    return;
                }
            }
            accelHandler = await Motion.addListener('accel', event => {
                const { x, y, z } = event.accelerationIncludingGravity;
                setAccel({
                    x: x ?? 0,
                    y: y ?? 0,
                    z: z ?? 0,
                });
            });
        };
        startListening();
        return () => {
            accelHandler?.remove();
        };
    }, []);

    return accel;
};
