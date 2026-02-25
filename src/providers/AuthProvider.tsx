import { useEffect } from "react";
import axios, { type AxiosResponse } from "axios";
import Swal from "sweetalert2";
import api from "@/lib/api";
import { Outlet, useNavigate } from "react-router-dom";
import { type AuthResponse } from "@/types/auth.type";
import useAuthStore from "@/store/useAuthStore";


export function AuthProvider() {
    const navigate = useNavigate()
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
                    }).then(() => {
                        navigate('/login')
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