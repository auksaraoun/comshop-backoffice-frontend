import api from '@/lib/api'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IconEdit } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { adminUserSchemaUpdate, type AdminUser, type AdminUserUpdate } from "@/types/admin-user.type"
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import type { ResponseError } from '@/types/util.type';
import { AlertError } from '@/components/AlertError';
import { toast } from 'sonner';
import { handleApiError } from '@/utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export function AdminUserEdit({ adminUser }: { adminUser: AdminUser }) {
    const [serverErrors, setServerErrors] = useState<ResponseError | undefined>()
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<AdminUserUpdate>({
        resolver: zodResolver(adminUserSchemaUpdate),
        defaultValues: {
            name: adminUser.name,
            username: adminUser.username,
            email: adminUser.email
        }
    })

    const handleCloseDialog = () => {
        setOpenDialog(false)
        reset()
        setServerErrors(undefined)
    }

    const handleOpenDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()  // ✅ เอา focus ออกจากปุ่มก่อน
        setOpenDialog(true)
    }

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: AdminUserUpdate) => {
            await api.put(`/api/admin-users/${adminUser.id}`, data)
        },
        onSuccess: () => {
            handleCloseDialog()
            toast.success("แก้ไข Admin Users สำเร็จ!", { position: "top-center" })
            queryClient.invalidateQueries({ queryKey: ['AdminUsersTable'] })
        },
        onError: (errors) => {
            handleApiError(errors)
        }
    })

    return (
        <Dialog open={openDialog} >
            <DialogTrigger asChild>
                <Button onClick={handleOpenDialog} variant="secondary" size="sm" className="bg-warning cursor-pointer hover:bg-warning/90 px-1" >
                    <IconEdit />แก้ไข
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-sm"
                showCloseButton={false}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className='flex' >
                        แก้ไข Admin User
                    </DialogTitle>
                    <DialogDescription>
                        แก้ไข Admin User ในระบบ
                    </DialogDescription>
                </DialogHeader>

                {serverErrors && serverErrors.errors && <AlertError errors={serverErrors.errors} />}

                <form className='grid gap-y-4' onSubmit={handleSubmit((data) => mutate(data))} >
                    <FieldGroup className='gap-4' >
                        <Field>
                            <Label className='gap-1' htmlFor="name-add">ชื่อ<div className='text-destructive' >*</div></Label>
                            <Input
                                {...register("name")}
                                id="name-add"
                            />
                            {errors.name && <FieldError errors={[errors.name]} />}
                        </Field>
                        <Field>
                            <Label className='gap-1' htmlFor="username-add">Username<div className='text-destructive' >*</div></Label>
                            <Input
                                {...register("username")}
                                id="username-add"
                            />
                            {errors.username && <FieldError errors={[errors.username]} />}
                        </Field>
                        <Field>
                            <Label className='gap-1' htmlFor="email-add">Email<div className='text-destructive' >*</div></Label>
                            <Input

                                {...register("email")}
                                id="email-add"
                            />
                            {errors.email && <FieldError errors={[errors.email]} />}
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={handleCloseDialog} disabled={isPending} variant="outline">ยกเลิก</Button>
                        </DialogClose>
                        <Button disabled={isPending} className="cursor-pointer" type="submit">
                            {isPending
                                ? (
                                    <>
                                        <Spinner />
                                        กำลังบันทึก...
                                    </>
                                )
                                : 'บันทึก'
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}