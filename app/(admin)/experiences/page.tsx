"use client"

import { useDeleteExperience, useGetAllExperiences } from "@/api/experiences";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import ListExperiences from "./components/list-experiences";
import { AlertDialogDelete } from "@/components/dialog/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function Experiences() {

    const [open, setOpen] = useState(false)
    const [getId, setGetId] = useState("")
    
    // get all data
    const { data: experiences, isLoading, isError, isSuccess } = useGetAllExperiences(true)

    // delete data
    const { mutate, isPending } = useDeleteExperience({
        onSuccess: () => {
            toast.success("Delete success!")
            setOpen(false)
        },
        onError: (err) => {
            setOpen(false)
            toast.error("Failed to delete, error :", err.message)
        }
    })

    // handle delete
    const handleDelete = () => {
        mutate(getId)
    }

    return (
        <>
            {/* list experiences */}
            <ListExperiences
                experiences={experiences}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                setGetId={setGetId}
                setOpen={setOpen}
            />

            {/* popup delete confirmation */}
            <AlertDialogDelete
                open={open}
                onOpenChange={setOpen}
                footer={
                    <>
                        <Button className="cursor-pointer" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            className="cursor-pointer"
                            onClick={handleDelete}
                            disabled={isPending}
                            variant="destructive"
                        >
                            {(isPending) ? <LoaderCircle className="animate-spin" /> : "Delete"}
                        </Button>
                    </>
                }
            />
        </>
    );
}
