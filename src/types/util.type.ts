export interface Meta {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export interface ResponseError {
    data?: [] | null
    errors?: Record<string, string[]>
    message?: string | null
    success?: boolean
}

export type AlertType = 'success' | 'warning' | 'fail'

export interface AlertOption {
    open: boolean
    type: AlertType
    title: string
    message: string
    showCancelButton: boolean
    confirmButtonText: string
    cancelButtonText: string
    onConfirm?: () => void
    onCancel?: () => void
}

export interface AlertOptionStore {
    alertOption: AlertOption
    setAlertOption: (alertOption: AlertOption) => void
}

export interface ErrorMessage {
    exception: string | null
    file: string | null
    line: number | null
    message: string | null
}

export interface ColumnDef {
    accessorKey: string
    header: string
    isSortable: boolean
    className: string
}

export interface Meta {
    currentPage: number
    lastpage: number
    total: number
}

export interface ResponseFetchDatas<TData,> {
    data: TData[]
    message: string
    meta: Meta
    success: boolean
}