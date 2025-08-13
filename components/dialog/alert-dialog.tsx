import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ReactNode } from "react"

interface AlertDialogsProps {
    open : boolean
    onOpenChange : (value : boolean) => void
    footer : ReactNode
}

export function AlertDialogDelete({
    open,
    onOpenChange,
    footer
}:AlertDialogsProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your message.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {footer}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
