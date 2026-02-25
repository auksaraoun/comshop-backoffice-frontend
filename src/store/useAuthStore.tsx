import { create } from "zustand"
import { type AuthStore, type Auth } from "@/types/auth.type";

const useAuthStore = create<AuthStore>((set) => ({
    auth: {
        name: '',
        username: '',
        email: '',
        created_at: '',
        updated_at: '',
    },
    setAuth: (auth: Auth) => set({ auth }),
}))

export default useAuthStore