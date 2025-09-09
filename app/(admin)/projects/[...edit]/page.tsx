"use client"

import { useGetProjectById } from "@/api/projects"
import { useParams, useRouter } from "next/navigation"
import LoadingSkeleton from "./loading"
import { FormData } from "../components/validation"
import FormProject from "../components/form"
import IsErrorFetch from "@/components/isError"

export default function ProjectDetail(){
    const params = useParams()
    const id = params?.edit?.[0]
    const { data:project, isLoading, isError, isSuccess, error } = useGetProjectById(id!)
    const router = useRouter()
    const onSubmit = (data : FormData) => {
        console.log(data)
        router.push("/projects")
    }

    if (isLoading) return <LoadingSkeleton/>
    if (isSuccess) return <FormProject project={project} onSubmit={onSubmit} isPending={isLoading} isSuccess={isSuccess} />
    if (isError) return <IsErrorFetch message={error} />
}