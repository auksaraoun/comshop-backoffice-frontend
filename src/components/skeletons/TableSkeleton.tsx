import { Skeleton } from "@/components/ui/skeleton"

export function TableSkeleton() {
    return (
        <>
            <div className="flex w-full max-w flex-col gap-2">

                <div className="flex justify-end gap-4" >
                    <Skeleton className="h-7 w-[29%]" />
                </div>

                {Array.from({ length: 15 }).map((_, index) => (
                    <div className="flex gap-4" key={index}>
                        <Skeleton className="h-7 w-[10%]" />
                        <Skeleton className="h-7 w-[30%]" />
                        <Skeleton className="h-7 w-[30%]" />
                        <Skeleton className="h-7 w-[30%]" />
                    </div>
                ))}
            </div>
        </>
    )
}