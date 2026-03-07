import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { ColumnDef } from "@/types/util.type"
import { IconArrowDown, IconArrowsSort, IconArrowUp } from "@tabler/icons-react"
import { AdminUserEdit } from "./AdminUserEdit"
import { AdminUserDelete } from "./AdminUserDelete"
import type { AdminUsersData } from "@/types/admin-user.type"
import { cn } from "@/lib/utils"
import { useSearchParams } from "react-router-dom"

export function AdminUserDataTable({ columnDefs, data }: { columnDefs: Array<ColumnDef>, data: AdminUsersData }) {
    const [params, setParams] = useSearchParams()
    const sortBy = params.get('sort_by') || ''
    const sortOrder = params.get('sort_order') || 'asc'

    const sorting = (column: ColumnDef) => {
        let sortOrder = params.get('sort_order') || 'asc'
        if (sortBy != column.accessorKey) {
            sortOrder = 'asc'
        } else {
            sortOrder = sortOrder == 'asc' ? 'desc' : 'asc'
        }

        setParams({
            ...Object.fromEntries(params),
            'page': '1',
            "sort_by": column.accessorKey,
            'sort_order': sortOrder
        })
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-background!" >
                    {columnDefs.map((column, key) => (
                        <TableHead key={key} className={column.className}>
                            <a
                                className={cn(`flex flex-row gap-1 items-center ${column.isSortable ? "cursor-pointer" : "pointer-events-none"}`)}
                                onClick={() => sorting(column)}
                            >
                                {column.header}
                                {column.isSortable && column.accessorKey != sortBy && (<IconArrowsSort className="opacity-30" size={15} />)}
                                {column.isSortable && column.accessorKey == sortBy && sortOrder == 'asc' && (<IconArrowUp size={15} />)}
                                {column.isSortable && column.accessorKey == sortBy && sortOrder == 'desc' && (<IconArrowDown size={15} />)}
                            </a>
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.data.map((adminUser, key) => (
                    <TableRow key={adminUser.id}>
                        <TableCell>{((data.meta.current_page - 1) * data.meta.per_page) + (key + 1)}</TableCell>
                        <TableCell>{adminUser.name}</TableCell>
                        <TableCell>{adminUser.email}</TableCell>
                        <TableCell>{adminUser.username}</TableCell>
                        <TableCell className="flex justify-center gap-4">
                            <AdminUserEdit adminUser={adminUser} />
                            <AdminUserDelete adminUser={adminUser} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}