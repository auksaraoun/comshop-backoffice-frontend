import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { LoginCredentials } from '@/types/auth.type'
import Swal from 'sweetalert2'

export function Login() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
        try {
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/api/login', data)
            navigate('/')
        } catch (error) {
            if (axios.isAxiosError(error) && error.status == 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: "ชื่อหรอรัสผ่านไม่ถูกต้อง",
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อผิดพลาด',
                    text: "Internal Server error",
                })
            }
        }
    }

    return (
        <>
            <title>Login</title>
            <div className='' >
                {errors.root &&
                    <Alert variant="destructive" className="max-w-sm mx-auto text-left">
                        <AlertCircleIcon />
                        <AlertTitle>Authenthicate</AlertTitle>
                        <AlertDescription>
                            ชื่อหรือรหัสผ่านไม่ถูกต้อง
                        </AlertDescription>
                    </Alert>
                }
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Card className="mx-auto w-full max-w-sm mt-5">
                        <CardHeader>
                            <CardTitle>Comshop BackOffice</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup className='gap-5'>
                                <Field>
                                    <FieldLabel htmlFor="fieldgroup-name">Username</FieldLabel>
                                    <Input
                                        {...register('username', {
                                            required: "จำเป็นต้องระบุ Username"
                                        })}
                                        placeholder="Enter Username"
                                        disabled={isSubmitting}
                                    />
                                    {errors.username && <FieldError errors={[errors.username]} />}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
                                    <Input
                                        {...register('password', {
                                            required: "จำเป็นต้องระบุ Password"
                                        })}
                                        type='password'
                                        placeholder="Enter Password"
                                        disabled={isSubmitting}
                                    />
                                    {errors.password && <FieldError errors={[errors.password]} />}
                                </Field>
                            </FieldGroup>
                        </CardContent>
                        <CardFooter>
                            <Button type='submit' variant="outline" size="sm" className="w-full" disabled={isSubmitting} >
                                {isSubmitting ? (<><Spinner /> กรุณารอสักครู่....</>) : 'เข้าสู่ระบบ'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form >
            </div>
        </>
    )
}
