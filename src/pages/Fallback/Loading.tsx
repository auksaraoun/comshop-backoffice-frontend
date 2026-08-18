import { Spinner } from "@/components/ui/spinner";

export function Loading() {
    return (
        <div>
            <div className="flex justify-center items-center h-dvh">
                <Spinner className="size-12" />
            </div>
        </div>
    )
}