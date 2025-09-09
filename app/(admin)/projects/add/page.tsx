"use client"

import { FormData } from "../components/validation";
import { useCreateProject } from "@/api/projects";
import FormProject from "../components/form";

export default function AddProjects() {

    const { mutate, isPending, isSuccess } = useCreateProject()

    // @note hit api save difungsi ini
    const onSubmit = (data: FormData) => {
        mutate(data)
    }

    return (
       <FormProject onSubmit={onSubmit} isPending={isPending} isSuccess={isSuccess} />
    )
}