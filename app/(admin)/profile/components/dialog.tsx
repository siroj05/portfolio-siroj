import { Button } from "@/components/ui/button"
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
import { CloudUpload } from "lucide-react"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
    footer : ReactNode
    setOpenDialog : (value : boolean) => void
    openDialog : boolean
    handleCancel : () => void
}

export function ResizeImgDialog({ children, footer, openDialog, setOpenDialog, handleCancel }: Props) {
    return (
        <Dialog open={openDialog} onOpenChange={(isOpen) => {
            setOpenDialog(isOpen)
            if(!isOpen){
                handleCancel()
            }
        }}>
            <form>
                <DialogTrigger asChild>
                    <Button onClick={() => setOpenDialog(true)} type="button" variant="secondary" className="cursor-pointer bg-blue-900 border border-blue-700 hover:bg-blue-800 text-white rounded-full">
                        <CloudUpload />
                        Upload image
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    {children}

                    {/* footer */}
                    {footer}
                </DialogContent>
            </form>
        </Dialog>
    )
}
