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

import { IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { productTypeSchemaStore, type ProductTypeStore } from "@/types/product-type"
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import type { ResponseError } from '@/types/util.type';
import { AlertError } from '@/components/AlertError';
import { toast } from "sonner"
import { handleApiError } from '@/utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


export function ProductTypeCreate() {
    const [serverErrors, setServerErrors] = useState<ResponseError | undefined>()
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductTypeStore>({
        resolver: zodResolver(productTypeSchemaStore)
    })

    const handleCloseDialog = () => {
        setOpenDialog(false)
        reset()
        setServerErrors(undefined)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ProductTypeStore) => {
            await api.post('/api/product-types', data)
        },
        onSuccess: () => {
            handleCloseDialog()
            toast.success("เพิ่มข้อมูล Product Type สำเร็จ", { position: "top-center" })
            queryClient.invalidateQueries({ queryKey: ['ProductTypesTable'] })
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
                <Button onClick={handleOpenDialog} variant="secondary" size="sm" className="bg-primary cursor-pointer hover:bg-primary/90 w-full md:max-w-29" >
                    <IconPlus />Product Type
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
                        เพิ่ม Product Type
                    </DialogTitle>
                    <DialogDescription>
                        เพิ่ม Product Type ใหม่เข้าสู่ระบบ
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