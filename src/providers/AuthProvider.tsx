import { useEffect } from "react";
import axios, { type AxiosResponse } from "axios";
import Swal from "sweetalert2";
import api from "@/lib/api";
import { Outlet, useNavigate } from "react-router-dom";
import { type AuthResponse } from "@/types/auth.type";
import { useAuthStore, useMenuStore } from "@/store/useAuthStore";
import {
    IconUsersGroup,
    IconDeviceDesktop,
    IconFileInvoiceFilled
} from "@tabler/icons-react"

import type { Menu } from "@/types/auth.type"

const menus: Array<Menu> = [
    {
        id: 1,
        title: "Admin Users",
        url: "/admin-users",
        icon: IconUsersGroup
    },
    {
        id: 2,
        title: "Products",
        icon: IconDeviceDesktop,
        subMenus: [
            {
                id: 3,
                title: "Types",
                url: "/product-types",
            },
            {
                id: 4,
                title: "Stocks",
                url: "/product-stocks",
            },
        ]
    },
    {
        id: 5,
        title: "Orders",
        url: "/orders",
        icon: IconFileInvoiceFilled
    },
]

export function AuthProvider() {
    const navigate = useNavigate()
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const response: AxiosResponse<AuthResponse> = await api.get('/api/auth')
                useAuthStore.setState({ auth: response.data.data })
                useMenuStore.setState({ menus: menus })
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: error.response?.data?.message ?? "Internal Server error",
                    }).then(() => {
                        navigate('/login')
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: "Internal Server error",
                    }).then(() => {
                        navigate('/login')
                    })
                }
            }
        }

        fetchAuth()

    }, [navigate])

    return (
        <Outlet />
    )
}