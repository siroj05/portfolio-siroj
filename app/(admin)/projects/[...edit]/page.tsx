"use client"

import { useGetProjectById, useUpdateProject } from "@/api/projects"
import { useParams } from "next/navigation"
import LoadingSkeleton from "./loading"
import { FormData } from "../components/validation"
import FormProject from "../components/form"
import IsErrorFetch from "@/components/isError"

export default function ProjectDetail(){
    const params = useParams()
    const id = params?.edit?.[0]
    const { data:project, isLoading, isError, isSuccess, error } = useGetProjectById(id!)
    const { mutate, isPending } = useUpdateProject()

    const onSubmit = (data : FormData) => {
        mutate(data)
    }

    if (isLoading) return <LoadingSkeleton/>
    if (isSuccess) return <FormProject project={project} onSubmit={onSubmit} isPending={isLoading || isPending} isSuccess={isSuccess} />
    if (isError) return <IsErrorFetch message={error} />
}