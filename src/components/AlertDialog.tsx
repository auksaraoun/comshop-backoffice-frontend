import {
    AlertDialog as ThemeAlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { IconAlertCircle, IconCircleCheck, IconXboxX } from "@tabler/icons-react"
import { useAlertStore } from "@/store/useAlertStore"
import { useState } from "react"

export function AlertDialog() {

    const alertOption = useAlertStore((state) => state.alertOption)

    const [isLoading, setIsLoading] = useState(false)

    const handleConfirm = () => {
        setIsLoading(true)
        if (alertOption.onConfirm) alertOption.onConfirm()
        setIsLoading(false)
        const newAlertOption = { ...alertOption }
        newAlertOption.open = false
        useAlertStore.setState({ alertOption: newAlertOption })
    }

    const handleCancle = () => {
        setIsLoading(true)
        if (alertOption.onCancel) alertOption.onCancel()
        setIsLoading(false)
        const newAlertOption = { ...alertOption }
        newAlertOption.open = false
        useAlertStore.setState({ alertOption: newAlertOption })
    }

    return (
        <ThemeAlertDialog open={alertOption.open} >
            <AlertDialogContent size="default">
                <AlertDialogHeader className="flex flex-col items-center!" >
                    {alertOption.type == 'warning' && (
                        <AlertDialogMedia className="bg-transparent" >
                            <IconAlertCircle className="w-16! h-16! text-warning" />
                        </AlertDialogMedia>
                    )}
                    {alertOption.type == 'success' && (
                        <AlertDialogMedia className="bg-transparent" >
                            <IconCircleCheck className="w-16! h-16! text-success" />
                        </AlertDialogMedia>
                    )}
                    {alertOption.type == 'fail' && (
                        <AlertDialogMedia className="bg-transparent" >
                            <IconXboxX className="w-16! h-16! text-danger" />
                        </AlertDialogMedia>
                    )}
                    <AlertDialogTitle className="text-2xl!" >{alertOption.title}</AlertDialogTitle>
                    <AlertDialogDescription className="dark:text-white text-center my-2 break-all" >
                        {alertOption.message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex! justify-center!" >

                    {!alertOption.showCancelButton
                        ? (
                            <>
                                <AlertDialogAction
                                    disabled={isLoading}
                                    className="cursor-pointer w-32.5"
                                    variant="secondary"
                                    onClick={handleConfirm}
                                >
                                    {alertOption.confirmButtonText}
                                </AlertDialogAction>
                            </>
                        )
                        : (
                            <>
                                <AlertDialogCancel
                                    disabled={isLoading}
                                    onClick={handleCancle}
                                    className="cursor-pointer"
                                    variant="outline"
                                >
                                    {alertOption.cancelButtonText}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    disabled={isLoading}
                                    onClick={handleConfirm}
                                    className="cursor-pointer"
                                    variant="secondary"
                                >
                                    {alertOption.confirmButtonText}
                                </AlertDialogAction>
                            </>
                        )
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </ThemeAlertDialog>
    )
}