"use client"

import { useGetExperienceById, useUpdateExperience } from "@/api/experiences"
import { useParams } from "next/navigation"
import FormExperience from "../components/form"
import { FormData } from "../components/validation"
import LoadingSkeleton from "./loading"
import IsErrorFetch from "./isError"

export default function ExperienceDetail(){
    const params = useParams()
    const id = params?.edit?.[1]

    const { data , isLoading, isError, isSuccess, error } = useGetExperienceById(id!)
    const { mutate, isPending } = useUpdateExperience()
   
    const onSubmit = (data : FormData) => {
        mutate(data)
    }

    if (isLoading) return <LoadingSkeleton/>
    if (isSuccess) return <FormExperience onSubmit={onSubmit} isPending={isLoading || isPending} isSuccess={isLoading} experience={data} />
    if (isError) return <IsErrorFetch message={error}/>
}