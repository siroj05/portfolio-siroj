"use client"

import { FormLayout } from "@/components/layout/form-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import ResizeToolsDialog from "../components/resize-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, formSchema } from "../components/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

export default function ProfileUser() {
    const param = useParams()
    const [cropped, setCropped] = useState<File>()
    const handleRemove = () => {
        setCropped(undefined)
    }
    console.log(param.id)
    const {
        register,
        handleSubmit,
        reset,
        resetField,
        formState : { errors }
    } = useForm<FormData>({
        resolver : zodResolver(formSchema)
    })

    return (
        <FormLayout>
            <form action="" className="space-y-3">
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
                        <Input id="fullName" placeholder="Enter your full name" />
                    </div>
                </div>

                
                <div className="space-y-2">
                    <Label htmlFor="job">Job Title</Label>
                    <div>
                        <Input id="job" placeholder="Enter your job title" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <div>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">Your LinkedIn</Label>
                        <div>
                            <Input id="linkedin" type="url" placeholder="Enter your LinkedIn profile" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="repository">Your Repository</Label>
                        <div>
                            <Input id="repository" type="url" placeholder="Enter your repository URL" />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about">About</Label>
                    <div>
                        <Textarea id="about" placeholder="Tell us about yourself" />
                    </div>
                </div>
            </form>
        </FormLayout>
    )
}