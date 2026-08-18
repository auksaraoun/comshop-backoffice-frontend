import { Button } from "@/components/ui/button"
import { type Column } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

export function SortableHeader<T>({ column, label }: { column: Column<T>, label: string }) {
  const sorted = column.getIsSorted()
  return (
    <Button
      className="cursor-pointer"
      variant="ghost"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> :
        sorted === "desc" ? <ArrowDown className="ml-2 h-4 w-4" /> :
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />}
    </Button>
  )
}