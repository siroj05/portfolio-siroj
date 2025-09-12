import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CreateSkills, DeleteCategories, GetAllCategories } from "./skills.api"
import { toast } from "sonner"
import { ResponseApi } from "../type"
import { Categories } from "./type"

export const useCreateSkill = (
    options?: {
        onSuccess: () => void
    }
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: CreateSkills,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] })
            toast.success("Success to create skill")
            options?.onSuccess?.()
        },
        onError: (err) => {
            toast.error(`Failed to create skill, ${err.message}`)
        }
    })
}

export const useGetAllCategories = () => {
    return useQuery<ResponseApi<Categories[]>>({
        queryKey: ["skills"],
        queryFn: GetAllCategories,
        refetchOnWindowFocus: false
    })
}

export const useDeleteCategories = (
    options? :{
        onSuccess : () => void,
        onError : (err : any) => void
    }
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: DeleteCategories,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"] })
            options?.onSuccess?.()
        },
        onError: options?.onError
    })
}