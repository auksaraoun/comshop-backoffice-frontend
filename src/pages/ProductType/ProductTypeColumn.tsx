"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { SortableHeader } from "../../components/SortableHeader"
import type { ProductType } from "@/types/product-type.type"
import { ProductTypeEdit } from "./ProductTypeEdit"
import { ProductTypeDelete } from "./ProductTypeDelete"

export const productTypeColumn: ColumnDef<ProductType>[] = [
    {
        accessorKey: "index",
        header: "#",
        cell: ({ row, table }) => {
            const { pageIndex, pageSize } = table.getState().pagination
            return pageIndex * pageSize + row.index + 1
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <SortableHeader column={column} label="Name" />
            )
        },
    },
    {
        accessorKey: "action",
        header: "",
        cell: ({ row }) => {
            return (
                <div key={row.original.id} className="flex justify-center gap-4" >
                    <ProductTypeEdit productType={row.original} />
                    <ProductTypeDelete productType={row.original} />
                </div>
            )
        },
    },
]