"use client"
import { DatePicker } from "@/components/date-picker";
import { FormLayout } from "@/components/layout/form-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MinimalTiptapEditor from "@/components/ui/minimal-tiptap/minimal-tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
    position : z.string().min(1, "Position is required"),
    office : z.string().min(1, "Office is required"),
    startFrom : z.date().min(1, "Start From is required"),
    to : z.date().optional(),
    present : z.boolean(),
    descriptionJob : z.string().optional()
}).superRefine((data, ctx) =>{
    if(!data.present && !data.to){
        ctx.addIssue({
            path : ["to"],
            code : z.ZodIssueCode.custom,
            message : "To is required"
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
    const desc = watch("descriptionJob")
    const startFrom = watch("startFrom")
    const to = watch("to")
    const present = watch("present")
    const onSubmit = (data : FormData) => {
        console.log(data)
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
                <div className="flex gap-5">
                    <div className="flex flex-col space-y-2">
                        <Label>Start From</Label>
                        <div>
                            <DatePicker
                                setValue={setValue}
                                value={startFrom}
                                state="startFrom"
                            />
                            {/* 
                                @Note
                                - Kena invalid input
                            */}
                            <p className="text-sm text-red-500 font-light">{errors.startFrom?.message}</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>To</Label>
                        <div>
                            <DatePicker
                                setValue={setValue}
                                value={to}
                                state="to"
                                readonly={present}
                            />
                            <p className="text-sm text-red-500 font-light">{errors.to?.message}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="present"
                            checked={present}
                            onCheckedChange={(checked) => {
                                setValue("present", Boolean(checked))
                                setValue("to", undefined)
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
                    onChange={(value) => setValue("descriptionJob", JSON.stringify(value))}
                    className="w-full"
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Enter your description..."
                    autofocus={false}
                    editable={true}
                    editorClassName="focus:outline-hidden"
                />
                <div className="flex justify-end">
                    <Button>Save</Button>
                </div>
            </form>
        </FormLayout>
    )
}