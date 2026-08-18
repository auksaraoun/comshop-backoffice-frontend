import { create } from "zustand"
import { type AuthStore, type Auth, type Menu, type MenuStore } from "@/types/auth.type";

export const useAuthStore = create<AuthStore>((set) => ({
    auth: {
        name: '',
        username: '',
        email: '',
        created_at: '',
        updated_at: '',
    },
    menus: [],
    setAuth: (auth: Auth) => set({ auth }),
    setMenus: (menus: Menu[]) => set({ menus }),
}))

export const useMenuStore = create<MenuStore>((set) => ({
    menus: [],
    setMenus: (menus: Menu[]) => set({ menus }),
}))
