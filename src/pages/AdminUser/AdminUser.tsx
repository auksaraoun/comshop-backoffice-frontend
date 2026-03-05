import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { TableSkeleton } from "@/components/skeletons/TableSkeleton"
import type { AdminUser, AdminUsersData } from "@/types/admin-user.type"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Pagination } from "@/components/Pagination"
import { SearchIcon } from "lucide-react"
import { AdminUserCreate } from "./AdminUserCreate"
import { AdminUserEdit } from "./AdminUserEdit"
import { AdminUserDelete } from "./AdminUserDelete"
import { handleApiError } from "@/utils/utils"

export function AdminUser() {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [adminUserDatas, setAdminUserDatas] = useState<AdminUsersData>({
        data: [],
        message: "",
        meta: {
            current_page: 0,
            last_page: 0,
            per_page: 0,
            total: 0
        }
    })

    const [params, setParams] = useSearchParams()

    const [valueSearch, setValueSearch] = useState(params.get('search') || '')
    const perPage = 12

    const handleSearch = useDebouncedCallback((value: string) => {
        setParams({
            'search': value
        })
    }, 500)

    const fetchAdminUsers = () => {
        const page = params.get('page') || '1'
        const search = params.get('search') || ''
        axios.get(`/api/admin-users?per_page=${perPage}&page=${page}&search=${search}`)
            .then((response: AxiosResponse<AdminUsersData>) => {
                setAdminUserDatas(response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                handleApiError(error)
            })
    }

    useEffect(() => {
        fetchAdminUsers()
    }, [params])

    return (
        <>
            <title>AdminUser</title>

            {isLoading && (
                <TableSkeleton />
            )}

            {isLoading == false && (
                <>
                    <h2 className="font-bold text-2xl mb-5 px-2" >รายการ Admin Users</h2>

                    <div className="flex mb-10 md:mb-5 justify-between flex-wrap gap-y-8" >
                        <AdminUserCreate onSuccess={fetchAdminUsers} />

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

                    <div className="min-h-132.5"  >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[15%]">ลำดับ</TableHead>
                                    <TableHead className="w-[25%]" >ชื่อ</TableHead>
                                    <TableHead className="w-[20%]" >อีเมล์</TableHead>
                                    <TableHead className="w-[20%]" >Username</TableHead>
                                    <TableHead className="w-[20%]" ></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {adminUserDatas.data.map((adminUser, key) => (
                                    <TableRow key={adminUser.id}>
                                        <TableCell>{((adminUserDatas.meta.current_page - 1) * perPage) + (key + 1)}</TableCell>
                                        <TableCell>{adminUser.name}</TableCell>
                                        <TableCell>{adminUser.email}</TableCell>
                                        <TableCell>{adminUser.username}</TableCell>
                                        <TableCell className="flex justify-center gap-4">

                                            <AdminUserEdit adminUser={adminUser} onSuccess={fetchAdminUsers} />
                                            <AdminUserDelete adminUser={adminUser} onSuccess={fetchAdminUsers} />

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-end mt-10 md:mt-15" >
                        <Pagination meta={adminUserDatas.meta} setParams={setParams} params={params} />
                    </div>
                </>
            )}

        </>
    )
}