import { useEffect, useState } from "react";
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
import { handleApiError } from "@/utils/utils";
import type { AxiosResponse } from "axios";

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
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenthicated, setIsAuthenthicated] = useState(false)
    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const response: AxiosResponse<AuthResponse> = await api.get('/api/auth')
                useAuthStore.setState({ auth: response.data.data })
                useMenuStore.setState({ menus: menus })
                setIsLoading(false)
                setIsAuthenthicated(true)
            } catch (error) {
                setIsLoading(false)
                setIsAuthenthicated(false)
                handleApiError(error)
            }
        }

        fetchAuth()

    }, [navigate])

    return (
        <>
            {!isLoading && !isAuthenthicated && ""}
            {!isLoading && isAuthenthicated && (<Outlet />)}
        </>
    )
}