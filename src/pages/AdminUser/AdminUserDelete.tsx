import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import api from "@/lib/api"
import type { AdminUser } from "@/types/admin-user.type"
import { handleApiError } from "@/utils/utils"
import { IconTrash } from "@tabler/icons-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Trash2Icon } from "lucide-react"
import { toast } from "sonner"

export function AdminUserDelete({ adminUser }: { adminUser: AdminUser }) {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            await api.delete(`/api/admin-users/${adminUser.id}`)
        },
        onSuccess: () => {
            toast.success("ลบข้อมูลสำเร็จ!", { position: "top-center" })
            queryClient.invalidateQueries({ queryKey: ['AdminUsersTable'] })
        },
        onError: (errors) => {
            if (axios.isAxiosError(errors)) {
                handleApiError(errors)
            } else {
                handleApiError(errors)
            }
        }
    })

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="secondary" size="sm" className="bg-danger cursor-pointer hover:bg-danger/90 px-1" >
                    <IconTrash />ลบ
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>คุณต้องการลบ Admin User นี้ใช่หรือไม่?</AlertDialogTitle>
                    <AlertDialogDescription>
                        การดำเนินการนี้ไม่สามารถย้อนกลับได้
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending} className="cursor-pointer" variant="outline">ยกเลิก</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending}
                        className="bg-danger! hover:bg-danger/90! cursor-pointer"
                        onClick={() => mutate()}
                        variant="destructive"
                    >
                        {isPending
                            ? (
                                <>
                                    <Spinner />
                                    กำลังลบ...
                                </>
                            )
                            : 'ลบ'
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
