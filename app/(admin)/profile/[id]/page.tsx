"use client"

import { FormLayout } from "@/components/layout/form-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import ResizeToolsDialog from "../components/resize-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, formSchema } from "../components/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCreateProfile } from "@/api/profile";

export default function ProfileUser() {
    const param = useParams()
    const [cropped, setCropped] = useState<File>()
    const {mutate, isPending} = useCreateProfile()
    const handleRemove = () => {
        setCropped(undefined)
    }
    const {
        setValue,
        register,
        handleSubmit,
        reset,
        resetField,
        watch,
        formState : { errors }
    } = useForm<FormData>({
        resolver : zodResolver(formSchema)
    })

    useEffect(() => {
        setValue("image", cropped)
    },[cropped])

    const onSubmit = (data : FormData) => {
        data.userId = parseInt(param!.id!.toString())
        console.log(data)
        mutate(data)
    } 
    return (
        <FormLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {!cropped && <ResizeToolsDialog setCropped={setCropped} />}
                {/* hasil crop gambar tampilkan disini */}
                {cropped &&
                    <div className="w-[300px] relative">
                        <img
                            src={URL.createObjectURL(cropped)}
                            alt={"picture"}
                            className="w-full rounded-t-xl bg-zinc-800"
                        />
                        <button type="button" onClick={handleRemove}>
                            <X className="absolute -top-2 -right-2 dark:bg-zinc-800 bg-zinc-100 rounded-full cursor-pointer hover:scale-105 border" />
                        </button>
                    </div>
                }

                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div>
                        <Input {...register("fullName")} id="fullName" placeholder="Enter your full name" />
                    </div>
                </div>

                
                <div className="space-y-2">
                    <Label htmlFor="job">Job Title</Label>
                    <div>
                        <Input {...register("jobTitle")} id="job" placeholder="Enter your job title" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <div>
                            <Input {...register("email")} id="email" type="email" placeholder="Enter your email" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">Your LinkedIn</Label>
                        <div>
                            <Input {...register("linkedin")} id="linkedin" type="url" placeholder="Enter your LinkedIn profile" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="repository">Your Repository</Label>
                        <div>
                            <Input {...register("repository")} id="repository" type="url" placeholder="Enter your repository URL" />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about">About</Label>
                    <div>
                        <Textarea {...register("about")} id="about" placeholder="Tell us about yourself" />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button variant="default" className="cursor-pointer">Save</Button>
                </div>
            </form>
        </FormLayout>
    )
}