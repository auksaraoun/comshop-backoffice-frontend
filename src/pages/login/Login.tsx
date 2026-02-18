import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
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

type FormLogin = {
    username: string
    password: string
}

export function Login() {
    const navigate = useNavigate()

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormLogin>({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FormLogin> = (data) => {
        return axios.post('/api/login', data).then((response) => {
            if (response.data.success == true) {
                localStorage.setItem("bearer_token", response.data.token)
                navigate('/')
            }
        }).catch(() => {
            setError('root', { message: 'username หรือ password ไม่ถูกต้อง' })
        })
    }

    return (
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
                                {errors.username && <div className='text-red-500 text-left text-xs' >*{errors.username?.message}</div>}
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
                                {errors.password && <div className='text-red-500 text-left text-xs' >*{errors.password?.message}</div>}
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
    )
}
