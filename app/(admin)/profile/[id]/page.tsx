"use client"

import { FormLayout } from "@/components/layout/form-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, MapPin, X } from "lucide-react";
import ResizeToolsDialog from "../components/resize-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, formSchema } from "../components/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCreateProfile, useGetProfile } from "@/api/profile";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingForm } from "../components/loading";
import { PhoneInput } from "@/components/ui/phone-input";

export default function ProfileUser() {
    const param = useParams()
    const [cropped, setCropped] = useState<File>()
    const {mutate, isPending} = useCreateProfile()
    const { data:profile, isLoading, error } = useGetProfile(parseInt(param.id!.toString()))

    const [defaultImg, setDefaultImg] = useState<string>()
    const handleRemove = () => {
        setCropped(undefined)
        setDefaultImg(undefined)
    }
    const {
        setValue,
        register,
        handleSubmit,
        reset,
        watch,
        formState : { errors }
    } = useForm<FormData>({
        resolver : zodResolver(formSchema)
    })

    useEffect(() => {
        setValue("image", cropped)
    },[cropped])

    useEffect(() => {
        reset({
            id : profile?.data.id,
            userId : profile?.data.userId,
            fullName : profile?.data.fullName,
            jobTitle : profile?.data.jobTitle,
            email : profile?.data.email,
            linkedin : profile?.data.linkedin,
            repository : profile?.data.repository,
            about : profile?.data.about,
            location : profile?.data.location,
            phoneNumber: profile?.data.phoneNumber
        })
        setDefaultImg(profile?.data.imagePath)
    },[profile?.data])

    const onSubmit = (data : FormData) => {
        data.userId = parseInt(param!.id!.toString())
        mutate(data)
        setCropped(undefined)
    } 

    if(isLoading) {
        return <LoadingForm/>
    }

    return (
        <FormLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {isPending ?
                    <Skeleton className="w-[150px] h-[150px]"/> :
                <>
                    {(!cropped && !defaultImg) && <ResizeToolsDialog setCropped={setCropped} />}
                    {/* hasil crop gambar tampilkan disini */}
                    {cropped &&
                        <div className="w-[150px] relative">
                            <img
                                src={defaultImg? defaultImg : URL.createObjectURL(cropped)}
                                alt={"picture"}
                                className="w-[150px] h-[150px] rounded-xl border bg-zinc-800 "
                            />
                            <button type="button" onClick={handleRemove}>
                                <X className="absolute -top-2 -right-2 dark:bg-zinc-800 bg-zinc-100 rounded-full cursor-pointer hover:scale-105 border" />
                            </button>
                        </div>
                    }
                    {
                        defaultImg &&
                        <div className="w-[150px] relative">
                            <img
                                src={defaultImg}
                                alt={"picture"}
                                className="w-[150px] h-[150px] rounded-xl border bg-zinc-800 "
                            />
                            <button type="button" onClick={handleRemove}>
                                <X className="absolute -top-2 -right-2 dark:bg-zinc-800 bg-zinc-100 rounded-full cursor-pointer hover:scale-105 border" />
                            </button>
                        </div>
                    }                
                </>}

                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div>
                        <Input {...register("fullName")} id="fullName" placeholder="Enter your full name" />
                        <p className="text-sm text-red-500 font-light">{errors.fullName?.message}</p>
                    </div>
                </div>

                
                <div className="space-y-2">
                    <Label htmlFor="job">Job Title</Label>
                    <div>
                        <Input {...register("jobTitle")} id="job" placeholder="Enter your job title" />
                        <p className="text-sm text-red-500 font-light">{errors.jobTitle?.message}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div>
                        <Input {...register("location")} id="location" placeholder="Enter your location" />
                        {/* <p className="text-sm text-red-500 font-light">{errors.jobTitle?.message}</p> */}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="flex gap-1">
                        <PhoneInput value={watch("phoneNumber")} onChange={(e) => setValue("phoneNumber", e.toString())} className="w-[280px]" maxLength={15} defaultCountry="ID" international={false} />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <div>
                            <Input {...register("email")} id="email" type="email" placeholder="Enter your email" />
                            <p className="text-sm text-red-500 font-light">{errors.email?.message}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">Your LinkedIn</Label>
                        <div>
                            <Input {...register("linkedin")} id="linkedin" type="url" placeholder="Enter your LinkedIn profile" />
                            <p className="text-sm text-red-500 font-light">{errors.linkedin?.message}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="repository">Your Repository</Label>
                        <div>
                            <Input {...register("repository")} id="repository" type="url" placeholder="Enter your repository URL" />
                            <p className="text-sm text-red-500 font-light">{errors.repository?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about">About</Label>
                    <div>
                        <Textarea {...register("about")} id="about" placeholder="Tell us about yourself" />
                        <p className="text-sm text-red-500 font-light">{errors.about?.message}</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button variant="default" className="cursor-pointer transition duration-400">
                        {
                            isPending &&
                            <LoaderCircle className="animate-spin"/>
                        }
                        Save
                    </Button>
                </div>
            </form>
        </FormLayout>
    )
}