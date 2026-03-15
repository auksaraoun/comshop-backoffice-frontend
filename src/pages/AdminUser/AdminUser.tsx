import { adminUserColumn } from "./AdminUserColumn"
import type { AxiosResponse } from "axios"
import type { AdminUsersData, FetchAdminUsersParams } from "@/types/admin-user.type"
import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useQueryStates, parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs'
import { AdminUserCreate } from "../AdminUser/AdminUserCreate"
import { AdminUserFilter } from "./AdminUserFilter"
import { CustomDataTable } from "@/components/CustomDataTable"

const fetchAdminUsers = async ({ page, search, perPage, sortBy, sortOrder }: FetchAdminUsersParams) => {
    const response: AxiosResponse<AdminUsersData> = await api.get('/api/admin-users', {
        params: { per_page: perPage, page, search, sort_by: sortBy, sort_order: sortOrder }
    })
    return response.data
}

export function AdminUser() {

    const [params, setParams] = useQueryStates(
        {
            page: parseAsInteger.withDefault(1),
            perPage: parseAsInteger.withDefault(12),
            sortBy: parseAsStringLiteral(['id', 'name', 'username', 'email']).withDefault('id'),
            sortOrder: parseAsStringLiteral(['asc', 'desc']).withDefault('asc'),
            search: parseAsString.withDefault(''),
        },
        { history: 'push' }
    )

    const { data, isError, isFetched } = useQuery({
        queryKey: ['AdminUsersTable', params],
        queryFn: () => fetchAdminUsers(params),
        placeholderData: (previousData) => previousData,
    })

    return (

        <div className="container mx-auto">

            <h2 className="font-bold text-2xl mb-5 px-2" >รายการ Product Types</h2>

            <div className="flex mb-10 md:mb-5 justify-between flex-wrap gap-y-8" >
                <AdminUserCreate />

                <div className="w-full md:max-w-58" >
                    <AdminUserFilter params={params} setParams={setParams} />
                </div>
            </div>

            {isError && (
                <p className="text-destructive text-center py-10">* เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้</p>
            )}

            {!isError && data && isFetched && (
                <CustomDataTable columns={adminUserColumn} data={data} params={params} setParams={setParams} />
            )}
        </div>
    )
}