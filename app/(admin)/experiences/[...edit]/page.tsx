"use client"

import { useGetExperienceById } from "@/api/experiences"
import { useParams } from "next/navigation"
import FormExperience from "../components/form"
import { FormData } from "../components/validation"

export default function ExperienceDetail(){
    const params = useParams()
    const id = params?.edit?.[1]

    const { data , isLoading, isError, isSuccess, error } = useGetExperienceById(id!)
   
    const onSubmit = (data : FormData) => {
            // mutate(data)
    }

    return <FormExperience onSubmit={onSubmit} isPending={isLoading} isSuccess={isSuccess} experience={data} />
}