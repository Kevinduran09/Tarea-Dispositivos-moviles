// store/userStore.ts
import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthState {
    user: User | null;
    role: string | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setRole: (role: string | null) => void;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    role: null,
    isAuthenticated: false,
    setUser: (user) => set({ user }),
    setRole: (role) => set({ role }),
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    logout: () => set({ user: null, role: null, isAuthenticated: false }),
}));
