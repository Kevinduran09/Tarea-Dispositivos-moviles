// src/components/SplashScreen.tsx
import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const SplashScreen: React.FC = () => {
    return (
        <IonPage>
            <IonHeader />
            <IonContent>
                <div className="!bg-gradient-to-br !from-amber-400 !to-yellow-500 h-full">
                    <div className="flex flex-col justify-center items-center h-full text-white relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg tracking-wide">
                                Mi App
                            </h1>
                            <p className="text-lg text-yellow-100 italic">Cargando contenido...</p>
                        </motion.div>

                        <motion.div
                            className="absolute bottom-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 1 }}
                        >
                            <Loader2 className="w-10 h-10 animate-spin text-yellow-100" />
                        </motion.div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SplashScreen;
