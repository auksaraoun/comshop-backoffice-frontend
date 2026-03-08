import { z } from "zod";
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

export const adminUserSchemaStore = z.object({
    name: z.string().min(1, { message: 'จำเป็นต้องระบุ' }).max(255, { message: "ความยาวชื่อจ้องไม่เกิน 255 ตัวอักษร" }),
    username: z.string().min(4, { message: "username ความนาวต้องไม่ต่ำกว่า 4 ตัวอักษร" }),
    email: z.email({ message: 'อีเมล์ไม่ถูกต้อง' })
        .min(4, { message: "email ความนาวต้องไม่ต่ำกว่า 4 ตัวอักษร" })
        .max(255, { message: "email ความนาวต้องไม่เกิน 255 ตัวอักษร" }),
    password: z.string().min(4, { message: "password ความนาวต้องไม่ต่ำกว่า 4 ตัวอักษร" }),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: "password ไม่ตรงกัน",
    path: ["password_confirmation"],  // ← error จะไปโชว์ที่ field นี้
})

export type AdminUserStore = z.infer<typeof adminUserSchemaStore>


export const adminUserSchemaUpdate = z.object({
    name: z.string().min(1, { message: 'จำเป็นต้องระบุ' }).max(255, { message: "ความยาวชื่อจ้องไม่เกิน 255 ตัวอักษร" }),
    username: z.string().min(4, { message: "username ความนาวต้องไม่ต่ำกว่า 4 ตัวอักษร" }),
    email: z.email({ message: 'อีเมล์ไม่ถูกต้อง' })
        .min(4, { message: "email ความนาวต้องไม่ต่ำกว่า 4 ตัวอักษร" })
        .max(255, { message: "email ความนาวต้องไม่เกิน 255 ตัวอักษร" }),
})

export type AdminUserUpdate = z.infer<typeof adminUserSchemaUpdate>


export const adminUserSchemaUpdatePassword = z.object({
    password: z.string().min(4, { message: "password ความนาวต้องไม่ต่ำกว่า 4 ตัวอักษร" }),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: "password ไม่ตรงกัน",
    path: ["password_confirmation"],  // ← error จะไปโชว์ที่ field นี้
})

export type AdminUserSchemaUpdatePassword = z.infer<typeof adminUserSchemaUpdatePassword>
