import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "./validation"
import { FormData } from "./validation"
import { FormLayout } from "@/components/layout/form-layout"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ResponseApi } from "@/api/type"
import { Projects } from "@/api/projects"
import { useEffect, useState } from "react"
import { LoaderCircle, X } from "lucide-react"

interface Props {
    onSubmit: (data: FormData) => void
    isPending: boolean;
    isSuccess: boolean;
    project?: ResponseApi<Projects>
}

export default function FormProject(
    {
        onSubmit,
        isPending,
        isSuccess,
        project
    }: Props
) {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        resetField,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    })

    const [preview, setPreview] = useState<any>(undefined)
    useEffect(() => {
        if (project?.data) {
            reset({
                id: project.data.id,
                title: project.data.title,
                description: project.data.description,
                techStack: project.data.techStack,
                demoUrl: project.data.demoUrl,
                githubUrl: project.data.githubUrl
            })
            setPreview(project.data.FilePath)
        }
    }, [project?.data])

    const filePath = watch("filePath")

    useEffect(() => {
        if (watch("image")?.[0]){
            setPreview(URL.createObjectURL(watch("image")?.[0]))
        }
    },[watch("image")])

    const handleRemove = () => {
        resetField("image")
        setPreview(undefined)
    }

    return (
        <FormLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor="file" >Picture</Label>
                    <div>
                        {filePath && 
                            <div className="w-[300px] relative">
                                <img
                                    src={filePath}
                                    alt={"picture"}
                                    className="w-full rounded-t-xl bg-zinc-800"
                                />
                                <button type="button" onClick={handleRemove}>
                                    <X className="absolute -top-2 -right-2 dark:bg-zinc-800 bg-zinc-100 rounded-full cursor-pointer hover:scale-105 border"/>
                                </button>
                            </div>
                        }
                        {preview &&
                            <div className="w-[300px] relative">
                                <img
                                    src={(preview)}
                                    alt={'picture'}
                                    className="w-full rounded-t-xl bg-zinc-800"
                                />
                                <button type="button" onClick={handleRemove}>
                                    <X className="absolute -top-2 -right-2 dark:bg-zinc-800 bg-zinc-100 rounded-full cursor-pointer hover:scale-105 border"/>
                                </button>
                            </div>
                        }
                        { !preview && <Input {...register("image")} className="w-[300px]" id="file" type="file" accept="image/*" />}
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
                    
                    <Button className="cursor-pointer transition duration-300" disabled={isPending}>
                        {
                            isPending? 
                            <LoaderCircle className="animate-spin"/>:
                            "Save"
                        }
                    </Button>
                </div>
            </form>
        </FormLayout>
    )
}