"use client"
import { useCreateExperience } from "@/api/experiences";
import { FormData } from "../components/validation";
import FormExperience from "../components/form";

export default function AddExperience() {

    const { mutate, isPending, isSuccess } = useCreateExperience()

    const onSubmit = (data : FormData) => {
        mutate(data)
    }
    
    return <FormExperience onSubmit={onSubmit} isPending={isPending} isSuccess={isSuccess} />

}