import { type AxiosResponse } from "axios"
import { useQuery } from "@tanstack/react-query"
import type { AdminUsersData } from "@/types/admin-user.type"
import { useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { useEffect, useState } from "react"
import { TableSkeleton } from "@/components/skeletons/TableSkeleton"
import { handleApiError } from "@/utils/utils"
import type { ColumnDef } from "@/types/util.type"
import { AdminUserDataTable } from "./AdminUserDataTable"
import { Pagination } from "@/components/Pagination"
import { AdminUserCreate } from "./AdminUserCreate"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"
import api from "@/lib/api"

export function AdminUser() {
    const [params, setParams] = useSearchParams()
    const [valueSearch, setValueSearch] = useState(params.get('search') || '')

    const page = params.get('page') || '1'
    const search = params.get('search') || ''
    const perPage = params.get('per_page') || '12'
    const sortBy = params.get('sort_by') || 'id'
    const sortOrder = params.get('sort_order') || 'asc'
    const handleSearch = useDebouncedCallback((value: string) => {
        setParams({
            ...Object.fromEntries(params),
            'search': value,
            'page': '1'
        })
    }, 500)

    const fetchAdminUsers = async () => {
        try {
            const response: AxiosResponse<AdminUsersData> = await api.get(`/api/admin-users?per_page=${perPage}&page=${page}&search=${search}&sort_by=${sortBy}&sort_order=${sortOrder}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['AdminUsersTable', page, search, perPage, sortBy, sortOrder],
        queryFn: () => fetchAdminUsers(),
        placeholderData: (previousData) => previousData,
    })

    useEffect(() => {
        setValueSearch(params.get('search') || '')
        if (data && String(data.meta.current_page) !== page) {
            setParams(prev => ({
                ...Object.fromEntries(prev),
                'page': String(data.meta.current_page),
            }))
        }
    }, [data])

    const columDefs: ColumnDef[] = [
        {
            accessorKey: "rowIndex",
            header: "#",
            isSortable: false,
            className: "w-[15%]"
        },
        {
            accessorKey: "name",
            header: "ชื่อ",
            isSortable: true,
            className: "w-[25%]"
        },
        {
            accessorKey: "email",
            header: "อีเมล์",
            isSortable: true,
            className: "w-[20%]"
        },
        {
            accessorKey: "username",
            header: "Username",
            isSortable: true,
            className: "w-[20%]"
        },
        {
            accessorKey: "action",
            header: "",
            isSortable: false,
            className: "w-[20%]"
        },
    ]

    return (
        <>
            {isLoading && (
                <TableSkeleton />
            )}
            {!isLoading && !isError && data && (
                <>
                    <h2 className="font-bold text-2xl mb-5 px-2" >รายการ Admin Users</h2>

                    <div className="flex mb-10 md:mb-5 justify-between flex-wrap gap-y-8" >
                        <AdminUserCreate />

                        <div className="w-full md:max-w-58" >
                            <InputGroup>
                                <InputGroupInput onChange={(e) => {
                                    handleSearch(e.target.value)
                                    setValueSearch(e.target.value)
                                }} value={valueSearch} placeholder="Search..." />
                                <InputGroupAddon align="inline-end">
                                    <SearchIcon />
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div>

                    <div className="min-h-132.5" >
                        <AdminUserDataTable columnDefs={columDefs} data={data} />
                    </div>

                    <div className="flex justify-end mt-10 md:mt-15" >
                        <Pagination meta={data.meta} setParams={setParams} params={params} />
                    </div>
                </>
            )}
        </>
    )
}