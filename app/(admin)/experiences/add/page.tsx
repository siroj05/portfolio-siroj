"use client"
import { useCreateExperience } from "@/api/experiences";
import { DatePicker } from "@/components/date-picker";
import { FormLayout } from "@/components/layout/form-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MinimalTiptapEditor from "@/components/ui/minimal-tiptap/minimal-tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
    position : z.string().min(1, "Position is required"),
    office : z.string().min(1, "Office is required"),
    start : z.date().min(1, "Start From is required"),
    end : z.date().optional(),
    present : z.boolean(),
    description : z.string().optional()
}).superRefine((data, ctx) =>{
    if(!data.present && !data.end){
        ctx.addIssue({
            path : ["to"],
            code : z.ZodIssueCode.custom,
            message : "To is required"
        })
    }

    // validasi range date
    if(data.end && data.start > data.end){
        ctx.addIssue({
            path : ["to"],
            code : z.ZodIssueCode.custom,
            message : "To date cannot be earlier than start from"
        })
    }
})

type FormData = z.infer<typeof formSchema>

export default function AddExperience() {

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState : {errors}
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            present : false
        }
    })

    const desc = watch("description")
    const startFrom = watch("start")
    const to = watch("end")
    const present = watch("present")

    const { mutate, isPending, isSuccess } = useCreateExperience()

    const onSubmit = (data : FormData) => {
        mutate(data)
    }

    return (
        <FormLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor="title">Position</Label>
                    <div>
                        <Input {...register("position")} id="title" placeholder="Position..."/>
                        <p className="text-sm text-red-500 font-light">{errors.position?.message}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="office">Office</Label>
                    <div>
                        <Input {...register("office")} id="office" placeholder="Office..."/>
                        <p className="text-sm text-red-500 font-light">{errors.office?.message}</p>
                    </div>
                </div>
                <div className="flex gap-5 max-sm:flex-col">
                    <div className="flex flex-col space-y-2">
                        <Label>Start From</Label>
                        <div>
                            <DatePicker
                                setValue={setValue}
                                value={startFrom}
                                state="start"
                            />
                            {/* 
                                @Note
                                - Kena invalid input
                            */}
                            <p className="text-sm text-red-500 font-light">{errors.start?.message}</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>To</Label>
                        <div>
                            <DatePicker
                                setValue={setValue}
                                value={to}
                                state="end"
                                readonly={present}
                            />
                            <p className="text-sm text-red-500 font-light">{errors.end?.message}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="present"
                            checked={present}
                            onCheckedChange={(checked) => {
                                setValue("present", Boolean(checked))
                                setValue("end", undefined)
                            }}
                        />
                        <Label htmlFor="present">Present</Label>
                    </div>
                </div>
                {/* 
                    @Note
                    - source : https://github.com/Aslam97/shadcn-minimal-tiptap
                */}
                <MinimalTiptapEditor
                    value={desc}
                    onChange={(value) => setValue("description", JSON.stringify(value))}
                    className="w-full"
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Enter your description..."
                    autofocus={false}
                    editable={true}
                    editorClassName="focus:outline-hidden"
                />
                <div className="flex justify-end">
                    <Button className="cursor-pointer" disabled={isPending || isSuccess}>
                        {
                            isPending || isSuccess ?
                                <LoaderCircle className="animate-spin"/> 
                            :
                                "Save"
                        }
                    </Button>
                </div>
            </form>
        </FormLayout>
    )
}