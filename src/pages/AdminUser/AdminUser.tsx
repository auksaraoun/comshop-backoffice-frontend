import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { TableSkeleton } from "@/components/skeletons/TableSkeleton"
import type { AdminUser, AdminUsersData } from "@/types/admn-user.type"
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
import { Button } from "@/components/ui/button"
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"
import { SearchIcon } from "lucide-react"

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
    const perPage = 10

    const handleSearch = useDebouncedCallback((value: string) => {
        console.log(value);

        setParams({
            'search': value
        })
    }, 500)

    useEffect(() => {
        const fetchAdminUsers = () => {

            const page = params.get('page') || '1'
            const search = params.get('search') || ''
            axios.get(`/api/admin-users?per_page=${perPage}&page=${page}&search=${search}`)
                .then((response: AxiosResponse<AdminUsersData>) => {
                    setAdminUserDatas(response.data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false)
                })
        }
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
                        <Button variant="secondary" size="sm" className="bg-blue-600 cursor-pointer hover:bg-blue-800 w-full md:max-w-29" >
                            <IconPlus />Admin User
                        </Button>

                        <div className="w-full md:max-w-58" >
                            <InputGroup>
                                <InputGroupInput onChange={(e) => handleSearch(e.target.value)} value={String(params.get('search') || '')} placeholder="Search..." />
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
                                        <TableCell>{((Number(params.get('page') || 1) - 1) * perPage) + (key + 1)}</TableCell>
                                        <TableCell>{adminUser.name}</TableCell>
                                        <TableCell>{adminUser.email}</TableCell>
                                        <TableCell>{adminUser.username}</TableCell>
                                        <TableCell className="flex justify-center gap-4">
                                            <Button variant="secondary" size="sm" className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 px-1" >
                                                <IconEdit />แก้ไข
                                            </Button>
                                            <Button variant="secondary" size="sm" className="bg-red-500 cursor-pointer hover:bg-red-600 px-1" >
                                                <IconTrash />ลบ
                                            </Button>
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