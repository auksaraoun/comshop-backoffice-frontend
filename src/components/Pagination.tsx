import {
    Pagination as ThemePagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { PaginationFirst, PaginationLast } from "@/components/ui/pagination-extended"
import type { Meta } from "@/types/util.type"
import type { SetURLSearchParams } from "react-router-dom"

export function Pagination({ meta, setParams, params }: { meta: Meta, setParams: SetURLSearchParams, params: URLSearchParams }) {

    const changePage = (e: React.MouseEvent<HTMLAnchorElement>, targetPage: number) => {
        setParams({
            ...Object.fromEntries(params),
            'page': String(targetPage),
        })
        e.preventDefault()
    }
    return (
        <ThemePagination >
            <PaginationContent>
                <PaginationItem>
                    <PaginationFirst
                        className={meta.current_page > 1 ? 'cursor-pointer' : 'pointer-events-none opacity-50 hover:bg-transparent'}
                        onClick={(e) => meta.current_page > 1 ? changePage(e, 1) : e.preventDefault()}
                    >
                    </PaginationFirst>
                </PaginationItem>
                <PaginationItem>
                    <PaginationPrevious
                        className={meta.current_page > 1 ? 'cursor-pointer' : 'pointer-events-none opacity-50 hover:bg-transparent'}
                        onClick={(e) => meta.current_page > 1 ? changePage(e, meta.current_page - 1) : e.preventDefault()}
                    />
                </PaginationItem>

                {meta.current_page - 3 >= 1 && (
                    <PaginationItem className="hidden sm:block" >
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {meta.current_page - 2 >= 1 && (
                    <PaginationItem>
                        <PaginationLink className="cursor-pointer" onClick={(e) => changePage(e, meta.current_page - 2)}>
                            {meta.current_page - 2}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {meta.current_page - 1 >= 1 && (
                    <PaginationItem>
                        <PaginationLink className="cursor-pointer" onClick={(e) => changePage(e, meta.current_page - 1)}>
                            {meta.current_page - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationLink isActive={true} >{meta.current_page}</PaginationLink>
                </PaginationItem>

                {meta.current_page + 1 <= meta.last_page && (
                    <PaginationItem>
                        <PaginationLink className="cursor-pointer" onClick={(e) => changePage(e, meta.current_page + 1)} >
                            {meta.current_page + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {meta.current_page + 2 <= meta.last_page && (
                    <PaginationItem>
                        <PaginationLink className="cursor-pointer" onClick={(e) => changePage(e, meta.current_page + 2)}>
                            {meta.current_page + 2}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {meta.current_page + 3 <= meta.last_page && (
                    <PaginationItem className="hidden sm:block" >
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        className={meta.current_page < meta.last_page ? 'cursor-pointer' : 'pointer-events-none opacity-50 hover:bg-transparent'}
                        onClick={(e) => meta.current_page < meta.last_page ? changePage(e, meta.current_page + 1) : e.preventDefault()}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLast
                        className={meta.current_page < meta.last_page ? 'cursor-pointer' : 'pointer-events-none opacity-50 hover:bg-transparent'}
                        onClick={(e) => meta.current_page < meta.last_page ? changePage(e, meta.last_page) : e.preventDefault()}
                    />
                </PaginationItem>
            </PaginationContent>
        </ThemePagination >
    )
}