import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"
import type { useQueryStates } from "nuqs"
import { useDebouncedCallback } from "use-debounce"

export function AdminUserFilter({ params, setParams }: { params: ReturnType<typeof useQueryStates>[0], setParams: ReturnType<typeof useQueryStates>[1] }) {
    const handleSearch = useDebouncedCallback((value: string) => {
        setParams({
            search: value
        })
    }, 500)

    return (
        <InputGroup>
            <InputGroupInput
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={params.search}
                key={params.search}
                placeholder="Search..."
            />
            <InputGroupAddon align="inline-end">
                <SearchIcon />
            </InputGroupAddon>
        </InputGroup>
    )
}