"use client"

import {
    type ColumnDef,
    type SortingState,
    getSortedRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Pagination } from "@/components/Pagination"
import type { ResponseFetchDatas } from "@/types/util.type"
import type { useQueryStates } from "nuqs"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: ResponseFetchDatas<TData>,
    params: ReturnType<typeof useQueryStates>[0]
    setParams: ReturnType<typeof useQueryStates>[1]
}

export function CustomDataTable<TData, TValue>({
    columns,
    data,
    params,
    setParams
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState({
        pageIndex: params.page - 1,
        pageSize: params.perPage
    })
    const table = useReactTable({
        data: data.data,
        columns,
        rowCount: data.meta.total,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: (updater) => {
            const newSorting = typeof updater === "function" ? updater(sorting) : updater
            setSorting(newSorting)
            if (newSorting.length > 0) {
                setParams({
                    sortBy: newSorting[0].id as 'id' | 'name' | 'username' | 'email',
                    sortOrder: newSorting[0].desc ? 'desc' : 'asc',
                })
            }
        },
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === "function" ? updater(pagination) : updater
            setPagination(newPagination)

            setParams({
                page: newPagination.pageIndex + 1,
                perPage: newPagination.pageSize
            })
        },
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            pagination
        },
        manualPagination: true,
        manualSorting: true,
    })

    useEffect(() => {
        if (data && params.page > data.meta.last_page) {
            table.setPageIndex(data.meta.last_page - 1)
        }
    }, [data])

    return (
        <>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="hover:bg-background!" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-end mt-10 md:mt-15" >
                <Pagination meta={data.meta} table={table} />
            </div>
        </>
    )
}