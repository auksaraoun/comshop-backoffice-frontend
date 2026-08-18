import { PaginationLink } from "./pagination"
import {
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function PaginationFirst({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
            {...props}
        >
            <ChevronsLeft />
        </PaginationLink>
    )
}

export function PaginationLast({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
            {...props}
        >
            <ChevronsRight />
        </PaginationLink>
    )
}