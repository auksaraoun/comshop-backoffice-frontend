import { z } from "zod";
import type { Meta } from "./util.type"

export interface ProductType {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export interface ProductTypesData {
    data: ProductType[]
    message: string
    meta: Meta
}

export const productTypeSchemaStore = z.object({
    name: z.string().min(1, { message: 'จำเป็นต้องระบุ' }).max(255, { message: "ความยาวชื่อต้องไม่เกิน 255 ตัวอักษร" }),
})

export type ProductTypeStore = z.infer<typeof productTypeSchemaStore>


export const ProductTypeSchemaUpdate = z.object({
    name: z.string().min(1, { message: 'จำเป็นต้องระบุ' }).max(255, { message: "ความยาวชื่อต้องไม่เกิน 255 ตัวอักษร" }),
})

export type ProductTypeUpdate = z.infer<typeof ProductTypeSchemaUpdate>