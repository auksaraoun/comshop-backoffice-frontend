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
import { IconKey } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { adminUserSchemaUpdatePassword, type AdminUser, type AdminUserSchemaUpdatePassword } from "@/types/admin-user.type"
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import type { ResponseError } from '@/types/util.type';
import { AlertError } from '@/components/AlertError';
import { toast } from 'sonner';
import { handleApiError } from '@/utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


export function AdminUserChangePassword({ adminUser }: { adminUser: AdminUser }) {
    const [serverErrors, setServerErrors] = useState<ResponseError | undefined>()
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<AdminUserSchemaUpdatePassword>({
        resolver: zodResolver(adminUserSchemaUpdatePassword),
        defaultValues: {
            password: '',
            password_confirmation: ''
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
        mutationFn: async (data: AdminUserSchemaUpdatePassword) => {
            await api.patch(`/api/admin-users/${adminUser.id}/password`, data)
        },
        onSuccess: () => {
            handleCloseDialog()
            toast.success("แก้ไข Password สำเร็จ!", { position: "top-center" })
            queryClient.invalidateQueries({ queryKey: ['AdminUsersTable'] })
        },
        onError: (errors) => {
            if (axios.isAxiosError(errors)) {
                if (errors.response?.status === 422) {
                    setServerErrors(errors.response.data)  // ใช้ .data แทน .response
                } else {
                    handleApiError(errors)
                }
            } else {
                handleApiError(errors)
            }
        }
    })

    return (
        <Dialog open={openDialog} >
            <DialogTrigger asChild>
                <Button onClick={handleOpenDialog} variant="secondary" size="sm" className="bg-destructive cursor-pointer hover:bg-destructive/80 px-1" >
                    <IconKey />แก้ไข Password
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
                        แก้ไข Admin User Password
                    </DialogTitle>
                    <DialogDescription>
                        แก้ไข Admin User Password ในระบบ
                    </DialogDescription>
                </DialogHeader>

                {serverErrors && serverErrors.errors && <AlertError errors={serverErrors.errors} />}

                <form className='grid gap-y-4' onSubmit={handleSubmit((data) => mutate(data))} >
                    <FieldGroup className='gap-4' >
                        <Field>
                            <Label className='gap-1' htmlFor="password-reset">Password<div className='text-destructive' >*</div></Label>
                            <Input
                                type='password'
                                {...register("password")}
                                id="password-reset"
                            />
                            {errors.password && <FieldError errors={[errors.password]} />}
                        </Field>
                        <Field>
                            <Label className='gap-1' htmlFor="password-confirmation-reset">Password Confirmation<div className='text-destructive' >*</div></Label>
                            <Input
                                type='password'
                                {...register("password_confirmation")}
                                id="password-confirmation-reset"
                            />
                            {errors.password_confirmation && <FieldError errors={[errors.password_confirmation]} />}
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