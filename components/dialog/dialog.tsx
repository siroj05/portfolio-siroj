import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

interface DialogsProps {
    open : boolean
    onOpenChange : (value : boolean) => void
    trigger? : ReactNode
    title? : string
    description? : string
    children? : ReactNode
    footer? : ReactNode
}

export function Dialogs(
    {
        open,
        onOpenChange,
        trigger,
        title,
        description,
        children,
        footer
    }:DialogsProps
) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger}
        <DialogContent className="sm:max-w-[425px]">
            {(title || description) && (
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {
                        description && (
                            <DialogDescription>{description}</DialogDescription>
                        )
                    }
                </DialogHeader>
            )}
            {children}
            {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
    </Dialog>
  )
}
