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
    setAuth: (auth: Auth) => void
}

export interface AuthResponse {
    success: boolean
    message: string
    data: Auth
}