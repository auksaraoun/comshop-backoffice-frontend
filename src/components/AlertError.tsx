import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

export function AlertError({ errors }: { errors: Record<string, string[]> }) {
    return (
        Object.entries(errors).map(([fieldName, messages]) => (

            <Alert variant="destructive" className="max-w-sm mx-auto text-left bg-transparent border-red-400">
                <AlertCircleIcon />
                <AlertTitle >{fieldName}</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc" >
                        {messages.map((message: string) => <li>{message}</li>)}
                    </ul>
                </AlertDescription>
            </Alert>

        ))
    )
}