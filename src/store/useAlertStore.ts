import type { AlertOption, AlertOptionStore } from "@/types/util.type"
import { create } from "zustand"

export const useAlertStore = create<AlertOptionStore>((set) => ({
    alertOption: {
        open: false,
        type: 'success',
        title: '',
        message: '',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        showCancelButton: false
    },
    setAlertOption: (alertOption: AlertOption) => set({ alertOption }),
}))