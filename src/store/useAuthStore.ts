import { Storage } from '@ionic/storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
    user: any | null
    role: string | null
    deviceToken: string | null
    loading: boolean

    setUser: (user: any) => void
    setRole: (role: string) => void
    setDeviceToken: (token: string) => void
    setLoading: (state: boolean) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            role: null,
            deviceToken: null,
            loading: false,

            setUser: (user) => set(() => ({ user })),
            setRole: (role) => set(() => ({ role })),
            setDeviceToken: (token) => set(() => ({ deviceToken: token })),
            setLoading: (state) => set(() => ({ loading: state })),
            logout: () =>
                set(() => ({
                    user: null,
                    role: null,
                    deviceToken: null,
                    loading: false
                }))
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => {
                const storage = new Storage()
                storage.create()
                return {
                    getItem: (key) => storage.get(key),
                    setItem: (key, value) => storage.set(key, value),
                    removeItem: (key) => storage.remove(key)
                }
            })
        }
    )
)
