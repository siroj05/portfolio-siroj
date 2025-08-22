import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateExperience } from "./experiences.api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const useCreateExperience = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn : CreateExperience,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ["experiences"]})
            toast.success("Success to create experience")
            router.push("/experiences")
        },
        onError : (err) => {
            toast.success(`Failed to create experience : ${err.message}`)
        }
    })
}