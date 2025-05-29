import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../core/firebaseConfig";

export const useAuth = () => {
    const { setRole, setUser, logout, setLoading } = useAuthStore();

    useEffect(() => {
        setLoading(true);

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    setUser(firebaseUser);
                    const docRef = doc(db, 'rol_user', firebaseUser.uid);
                    const snap = await getDoc(docRef);
                    
                    if (snap.exists()) {
                        setRole(snap.data().role);
                    } else {
                        // Si no existe el rol, establecemos uno por defecto
                        setRole('user');
                    }
                } else {
                    logout();
                }
            } catch (error) {
                console.error('Error en la autenticación:', error);
                logout();
            } finally {
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [setRole, setUser, setLoading, logout]);

    return useAuthStore();
}; 
