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
import { Spinner } from '@/components/ui/spinner';
import type { ResponseError } from '@/types/util.type';
import { AlertError } from '@/components/AlertError';
import { toast } from 'sonner';
import { handleApiError } from '@/utils/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';
import { ProductTypeSchemaUpdate, type ProductType, type ProductTypeData, type ProductTypeUpdate } from '@/types/product-type.type';
import { useState } from 'react';

export function ProductTypeEdit({ productType }: { productType: ProductType }) {

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [serverErrors, setServerErrors] = useState<ResponseError | undefined>()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductTypeUpdate>({
        resolver: zodResolver(ProductTypeSchemaUpdate),
    })

    const handleCloseDialog = () => {
        setOpenDialog(false)
        setServerErrors(undefined)
    }

    const handleOpenDialog = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()
        setLoading(true)
        try {
            const response: AxiosResponse<ProductTypeData> = await api.get(`/api/product-types/${productType.id}`)
            setLoading(false)
            setOpenDialog(true)
            reset({
                name: response.data.data.name,
            })
        } catch (error) {
            setLoading(false)
            handleApiError(error)
        }
    }

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ProductTypeUpdate) => {
            await api.put(`/api/product-types/${productType.id}`, data)
        },
        onSuccess: () => {
            handleCloseDialog()
            toast.success("แก้ไข Product Types สำเร็จ!", { position: "top-center" })
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
        <Dialog key={`dialog-product-type-${productType.id}`} open={openDialog} >
            <DialogTrigger asChild>
                <Button
                    disabled={loading}
                    onClick={handleOpenDialog}
                    variant="secondary"
                    size="sm"
                    className="bg-warning cursor-pointer hover:bg-warning/90 px-1 min-w-[70.1px]"
                >
                    {loading ? <Spinner /> : <><IconEdit />แก้ไข</>}
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
                        แก้ไข Product Type
                    </DialogTitle>
                    <DialogDescription>
                        แก้ไข Product Type ในระบบ
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