// firebaseService.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, db, authReady } from "../../../core/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { useAuthStore } from "../../../store/useAuthStore";

interface successResponse {
    user: {
        uid: string;
        email: string | null;
        emailVerified: boolean;
        displayName: string | null;
        photoURL: string | null;
        phoneNumber: string | null;
        providerId: string;
    };
    providerId: string | null;
    operationType: "signIn" | "link" | "reauthenticate";
}

export const Login = async (email: string, password: string): Promise<successResponse | string> => {
    try {
        await authReady;
        const response = await signInWithEmailAndPassword(auth, email, password);

        const user = response.user;
        await syncUserRole(user.uid)
        const userAuth = auth.currentUser;

        useAuthStore.getState().setUser(userAuth);

        return response
    } catch (error) {
        console.error('error login in firebase', error);
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
};

export const register = async (email: string, password: string, username: string): Promise<successResponse | string> => {
    try {
        await authReady;
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        await syncUserRole(user.uid)

        const userAuth = auth.currentUser;
        useAuthStore.getState().setUser(userAuth); // solo si tu store espera un User real


        return response;
    } catch (error) {
        console.error('error registrando usuario en firebase', error);
        return error instanceof Error ? error.message : 'An unknown error occurred';
    }
};



// Función para iniciar sesión con Google
export const loginWithGoogle = async () => {
    try {
        const result = await FirebaseAuthentication.signInWithGoogle();
        if (result?.user) {
            await authReady;
            const credential = await GoogleAuthProvider.credential(result?.credential?.idToken);
            const userCredential = await signInWithCredential(auth, credential);
            const user = userCredential.user;

            const existingUser = useAuthStore.getState().user;
            if (existingUser && existingUser.uid === user.uid) {


            }


            // Seteamos el user directo de Firebase en el store
            useAuthStore.getState().setUser(user);

            // Consultamos o creamos el rol
            await syncUserRole(user.uid);
        }


    } catch (error) {
        console.error("Error iniciando sesión con Google: ", error);
    }
};

// Consulta el rol desde la colección "rol_user" o lo crea si no existe
const syncUserRole = async (uid: string) => {
    try {
        const roleRef = doc(db, "rol_user", uid);
        const roleSnap = await getDoc(roleRef);


        if (roleSnap.exists()) {
            const role = roleSnap.data().role;


            useAuthStore.getState().setRole(role);
        } else {
            await setDoc(roleRef, { role: 'user' });
            useAuthStore.getState().setRole('user');
        }

    } catch (error) {
        console.error("Error sincronizando el rol del usuario: ", error);
    }
};
