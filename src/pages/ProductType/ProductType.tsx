import { productTypeColumn } from "./ProductTypeColumn"
import type { AxiosResponse } from "axios"
import type { ProductTypesData, FetchProductTypesParams } from "@/types/product-type.type"
import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useQueryStates, parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs'
import { ProductTypeFilter } from "./ProductTypeFilter"
import { CustomDataTable } from "@/components/CustomDataTable"
import { ProductTypeCreate } from "./ProductTypeCreate"

export function ProductType() {

    const [{ page, search, perPage, sortBy, sortOrder }, setParams] = useQueryStates(
        {
            page: parseAsInteger.withDefault(1),
            perPage: parseAsInteger.withDefault(12),
            sortBy: parseAsStringLiteral(['id', 'name', 'username', 'email']).withDefault('id'),
            sortOrder: parseAsStringLiteral(['asc', 'desc']).withDefault('asc'),
            search: parseAsString.withDefault(''),
        },
        { history: 'push' }
    )

    const fetchProductTypes = async ({ page, search, perPage, sortBy, sortOrder }: FetchProductTypesParams) => {
        const response: AxiosResponse<ProductTypesData> = await api.get('/api/product-types', {
            params: { per_page: perPage, page, search, sort_by: sortBy, sort_order: sortOrder }
        })
        return response.data
    }

    const { data, isError, isFetched } = useQuery({
        queryKey: ['ProductTypesTable', page, search, perPage, sortBy, sortOrder],
        queryFn: () => fetchProductTypes({ page, search, perPage, sortBy, sortOrder }),
        placeholderData: (previousData) => previousData,
    })

    return (

        <div className="container mx-auto">

            <h2 className="font-bold text-2xl mb-5 px-2" >รายการ Product Types</h2>

            <div className="flex mb-10 md:mb-5 justify-between flex-wrap gap-y-8" >
                <ProductTypeCreate />

                <div className="w-full md:max-w-58" >
                    <ProductTypeFilter params={{ page, search, perPage, sortBy, sortOrder }} setParams={setParams} />
                </div>
            </div>

            {isError && (
                <p className="text-destructive text-center py-10">* เกิดข้อผิดพลาด ไม่สามารถโหลดข้อมูลได้</p>
            )}

            {!isError && data && isFetched && (
                <CustomDataTable columns={productTypeColumn} data={data} params={{ page, search, perPage, sortBy, sortOrder }} setParams={setParams} />
            )}
        </div>
    )
}