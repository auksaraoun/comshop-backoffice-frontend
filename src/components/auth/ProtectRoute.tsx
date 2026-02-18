import { Navigate, Outlet } from "react-router-dom"

export function ProtectRoute() {
    const token: string = localStorage.getItem("bearer_token") ?? ""
    if (!token) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}