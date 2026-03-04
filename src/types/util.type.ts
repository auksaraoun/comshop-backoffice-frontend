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