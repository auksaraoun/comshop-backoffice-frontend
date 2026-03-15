"use client"

import type { AdminUser } from "@/types/admin-user.type"
import { type ColumnDef } from "@tanstack/react-table"
import { AdminUserEdit } from "./AdminUserEdit"
import { AdminUserChangePassword } from "./AdminUserChangePassword"
import { AdminUserDelete } from "./AdminUserDelete"
import { SortableHeader } from "../../components/SortableHeader"

export const adminUserColumn: ColumnDef<AdminUser>[] = [
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
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <SortableHeader column={column} label="Email" />
            )
        },
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <SortableHeader column={column} label="Username" />
            )
        },
    },
    {
        accessorKey: "action",
        header: "",
        cell: ({ row }) => {
            return (
                <div key={row.original.id} className="flex justify-center gap-4" >
                    <AdminUserEdit adminUser={row.original} />
                    <AdminUserChangePassword adminUser={row.original} />
                    <AdminUserDelete adminUser={row.original} />
                </div>
            )
        },
    },
]