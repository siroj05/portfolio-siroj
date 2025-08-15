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
    email: z.email().min(1, "Email is required").max(50, "Email too long"),
    message: z.string().min(1, "Message is required").max(500, "Message too long")
})

type FormData = z.infer<typeof formSchema>

export default function FormContact() {

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
        watch
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

    const emailLength = watch("email")
    const messageLength = watch("message")

    return (
        <div className="space-y-10 w-full">
            <div className="border dark:bg-zinc-800 p-4 rounded-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input {...register("email")} type="email" placeholder="Email.." maxLength={50}/>
                        <div className="flex justify-between">
                            <LabelError>{errors.email?.message}</LabelError>
                            <p className="text-xs text-zinc-400">{emailLength?.length??0}/50</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea {...register("message")} placeholder="Message.." maxLength={500}/>
                        <div className="flex justify-between">
                            <LabelError>{errors.message?.message}</LabelError>
                            <p className="text-xs text-zinc-400">{messageLength?.length??0}/500</p>
                        </div>
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