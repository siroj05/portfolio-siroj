"use client"

import { LoaderCircle, Send } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LabelError } from "../label-error"
import { toast } from "sonner"
import { useCreateMessage } from "@/api/messages"

const formSchema = z.object({
    email: z.email().min(1, "Email is required"),
    message: z.string().min(1, "Message is required")
})

type FormData = z.infer<typeof formSchema>

export default function FormContact() {

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    })

    const { mutate, isPending } = useCreateMessage({
        onSuccess: () => {
            toast.success("Succesfully sent the message")
            reset()
        },
        onError: (err) => {
            toast.error(`Failed error : ${err}`)
        }
    })

    const onSubmit = (data: FormData) => {
        mutate(data)
    }

    return (
        <div className="space-y-10 w-full">
            <div className="border dark:bg-zinc-800 p-4 rounded-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input {...register("email")} type="email" placeholder="Email.." />
                        <LabelError>{errors.email?.message}</LabelError>
                    </div>
                    <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea {...register("message")} placeholder="Message.." />
                        <LabelError>{errors.message?.message}</LabelError>
                    </div>
                    <Button className="w-full cursor-pointer" disabled={isPending}>
                        {
                            isPending ?
                                <LoaderCircle className="animate-spin" />
                                :
                                <Send />
                        }
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    )
}