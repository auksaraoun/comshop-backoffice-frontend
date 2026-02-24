import { useEffect } from "react";
import axios, { type AxiosResponse } from "axios";
import Swal from "sweetalert2";
import api from "@/lib/api";
import { Outlet } from "react-router-dom";
import { create } from "zustand"
import { type AuthResponse, type AuthStore, type Auth } from "@/types/auth.type";


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

export function AuthProvider() {
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const response: AxiosResponse<AuthResponse> = await api.get('/api/auth')
                useAuthStore.setState({ auth: response.data.data })
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: error.response?.data?.message ?? "Internal Server error",
                    })
                }
            }
        }

        fetchAuth()

    }, [])

    return (
        <Outlet />
    )
}