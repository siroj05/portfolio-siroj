"use client"
import { FormLayout } from "@/components/layout/form-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
    image: z.any().optional()
        .refine((files) => !files || files.length === 0 || files?.[0]?.size <= 2 * 1024 * 1024, "Maks image size 2MB")
        .refine((files) => !files || files.length === 0 || ["image/jpeg", "image/png"].includes(files?.[0]?.type), "Format should be JPG or PNG"),
    title: z.string().min(1, "Title required"),
    description: z.string().min(1, "Description required"),
    techStack: z.string().min(1, "Tech Stack required"),
    demoUrl: z.string().optional(),
    githubUrl: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

export default function AddProjects() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    })

    // @note hit api save difungsi ini
    const onSubmit = (data: FormData) => {
        console.log(data)
    }

    return (
        <FormLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor="file" >Picture</Label>
                    <div>
                        <Input {...register("image")} className="w-[300px]" id="file" type="file" accept="image/*" />
                        <p className="text-sm text-red-500 font-light">{errors.image?.message as string}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title" >Title</Label>
                    <div>
                        <Input {...register("title")} id="title" type="text" placeholder="Title.." />
                        <p className="text-sm text-red-500 font-light">{errors.title?.message}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description" >Description</Label>
                    <div>
                        <Textarea {...register("description")} id="description" placeholder="Description.." />
                        <p className="text-sm text-red-500 font-light">{errors.description?.message}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stack" >Tech Stack</Label>
                    <div>
                        <Input {...register("techStack")} id="stack" type="text" placeholder="React, Tailwind, Zustand.." />
                        <p className="text-sm text-red-500 font-light">{errors.techStack?.message}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="demo" >Demo Url</Label>
                    <Input {...register("demoUrl")} id="demo" type="text" placeholder="Demo url.." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="git" >Github Url</Label>
                    <Input {...register("githubUrl")} id="git" type="text" placeholder="Github url.." />
                </div>

                <div className="flex justify-end">
                    <Button>Save</Button>
                </div>
            </form>
        </FormLayout>
    )
}