import { type AxiosResponse } from "axios"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { useEffect, useState } from "react"
import { TableSkeleton } from "@/components/skeletons/TableSkeleton"
import { handleApiError } from "@/utils/utils"
import type { ColumnDef } from "@/types/util.type"
import { ProductTypeDatatable } from "./ProductTypeDataTable"
import { Pagination } from "@/components/Pagination"
import { ProductTypeCreate } from "./ProductTypeCreate"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"
import api from "@/lib/api"
import type { ProductTypesData } from "@/types/product-type"

export function ProductType() {
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

    const fetchProductTypes = async () => {
        try {
            const response: AxiosResponse<ProductTypesData> = await api.get('/api/product-types', {
                params: { per_page: perPage, page, search, sort_by: sortBy, sort_order: sortOrder }
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['ProductTypesTable', page, search, perPage, sortBy, sortOrder],
        queryFn: () => fetchProductTypes(),
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
                    <h2 className="font-bold text-2xl mb-5 px-2" >รายการ Product Type</h2>

                    <div className="flex mb-10 md:mb-5 justify-between flex-wrap gap-y-8" >
                        <ProductTypeCreate />

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
                        <ProductTypeDatatable columnDefs={columDefs} data={data} />
                    </div>

                    <div className="flex justify-end mt-10 md:mt-15" >
                        <Pagination meta={data.meta} setParams={setParams} params={params} />
                    </div>
                </>
            )}
        </>
    )
}