import { AdminUser } from "@/pages/AdminUser/AdminUser"
import type { Meta } from "./util.type"

export interface AdminUser {
    id: number
    name: string
    username: string
    email: string
    created_at: string
    updated_at: string
}

export interface AdminUsersData {
    data: AdminUser[]
    message: string
    meta: Meta
}
