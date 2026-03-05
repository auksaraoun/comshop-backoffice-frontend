import { useAlertStore } from "@/store/useAlertStore"
import type { ErrorMessage } from "@/types/util.type"
import axios from "axios"

export function handleApiError(error: unknown) {
    if (axios.isAxiosError(error)) {
        const errors: ErrorMessage = {
            exception: error?.response?.data.exception,
            file: error?.response?.data.file,
            line: error?.response?.data.line,
            message: error?.response?.data.message,
        }
        useAlertStore.setState((state) => ({
            alertOption: {
                ...state.alertOption,
                open: true,
                type: 'fail',
                title: 'ขออภัย',
                message: `กรุณาถ่ายรูปนี้ ให้ผู้ดูแลระบบดู: ${JSON.stringify(errors)}`
            }
        }))
    } else {
        useAlertStore.setState((state) => ({
            alertOption: {
                ...state.alertOption,
                open: true,
                type: 'fail',
                title: 'ขออภัย',
                message: `เกิดข้อผิดพลาดไม่คลาดคิด กรุณาลองใหม่อีกครั้ง`
            }
        }))
    }
}