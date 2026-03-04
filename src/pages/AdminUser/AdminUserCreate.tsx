import api from '@/lib/api'
import axios from 'axios'
import { useForm, type SubmitHandler } from "react-hook-form";
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

import { IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { adminUserSchemaStore, type AdminUserStore } from "@/types/admn-user.type"
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import type { ResponseError } from '@/types/util.type';
import Swal from 'sweetalert2';


export function AdminUserCreate({ onSuccess }: { onSuccess: () => void }) {
    const [serverErrors, setServerErrors] = useState<ResponseError | undefined>()
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AdminUserStore>({
        resolver: zodResolver(adminUserSchemaStore)
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

    const onSubmit: SubmitHandler<AdminUserStore> = async (data) => {
        try {
            await api.post('/api/admin-users', data)
            handleCloseDialog()
            setTimeout(() => {
                Swal.fire({
                    title: "สำเร็จ!",
                    text: "เพิ่ม Admin Users",
                    icon: "success"
                });
            }, 100)
            onSuccess()
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status == 422) {
                setServerErrors(error.response.data)
            }
        }
    }

    return (
        <Dialog open={openDialog} >
            <DialogTrigger asChild>
                <Button onClick={handleOpenDialog} variant="secondary" size="sm" className="bg-blue-600 cursor-pointer hover:bg-blue-800 w-full md:max-w-29" >
                    <IconPlus />Admin User
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
                        เพิ่ม Admin User
                    </DialogTitle>
                    <DialogDescription>
                        เพิ่ม Admin User คนใหม่เข้าสู่ระบบ
                    </DialogDescription>
                </DialogHeader>

                {serverErrors && serverErrors.errors && Object.entries(serverErrors.errors).map(([fieldName, messages]) => (

                    <Alert variant="destructive" className="max-w-sm mx-auto text-left bg-transparent border-red-400">
                        <AlertCircleIcon />
                        <AlertTitle >{fieldName}</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc" >
                                {messages.map((message: string) => <li>{message}</li>)}
                            </ul>
                        </AlertDescription>
                    </Alert>

                ))}

                <form className='grid gap-y-4' onSubmit={handleSubmit(onSubmit)} >
                    <FieldGroup className='gap-4' >
                        <Field>
                            <Label htmlFor="name-add">ชื่อ</Label>
                            <Input
                                {...register("name")}
                                id="name-add"
                            />
                            {errors.name && <div className='text-red-400 text-left text-sm' >*{errors.name?.message}</div>}
                        </Field>
                        <Field>
                            <Label className='gap-1' htmlFor="username-add">Username<div className='text-red-400' >*</div></Label>
                            <Input
                                {...register("username")}
                                id="username-add"
                            />
                            {errors.username && <div className='text-red-400 text-left text-sm' >*{errors.username?.message}</div>}
                        </Field>
                        <Field>
                            <Label className='gap-1' htmlFor="email-add">Email<div className='text-red-400' >*</div></Label>
                            <Input

                                {...register("email")}
                                id="email-add"
                            />
                            {errors.email && <div className='text-red-400 text-left text-sm' >*{errors.email?.message}</div>}
                        </Field>
                        <Field>
                            <Label className='gap-1' htmlFor="email-add">รหัสผ่าน<div className='text-red-400' >*</div></Label>
                            <Input

                                {...register("password")}
                                id="password-add"
                                type='password'
                                autoComplete='off'
                            />
                            {errors.password && <div className='text-red-400 text-left text-sm' >*{errors.password?.message}</div>}
                        </Field>
                        <Field>
                            <Label className='gap-1' htmlFor="email-add">ยืนยันรหัสผ่าน<div className='text-red-400' >*</div></Label>
                            <Input

                                {...register("password_confirmation")}
                                id="password-confirmation-add"
                                type='password'
                                autoComplete='off'
                            />
                            {errors.password_confirmation && <div className='text-red-400 text-left text-sm' >*{errors.password_confirmation?.message}</div>}
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button onClick={handleCloseDialog} disabled={isSubmitting} variant="outline">ยกเลิก</Button>
                        </DialogClose>
                        <Button disabled={isSubmitting} className="cursor-pointer" type="submit">
                            {isSubmitting
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