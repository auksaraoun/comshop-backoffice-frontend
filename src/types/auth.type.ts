import { type Icon } from "@tabler/icons-react"

export interface LoginCredentials {
    username: string
    password: string
}

export interface Auth {
    name: string
    username: string
    email: string
    created_at: string
    updated_at: string
}

export interface SetAuth {
    setAuth: (auth: Auth) => void
}

export interface AuthStore {
    auth: Auth
    menus: Menu[]
    setAuth: (auth: Auth) => void
    setMenus: (menus: Menu[]) => void
}

export interface MenuStore {
    menus: Menu[]
    setMenus: (menus: Menu[]) => void
}

export interface AuthResponse {
    success: boolean
    message: string
    data: Auth
}

export interface Menu {
    id: number
    title: string
    url?: string
    icon?: Icon
    subMenus?: SubMenus[]
}

export interface SubMenus {
    id: number
    title: string
    url: string
}