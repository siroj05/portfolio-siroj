import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CreateProfile, GetProfileById, GetProfileMe } from "./profile.api"
import { toast } from "sonner"
import { ResponseApi } from "../type"
import { ProfileModel } from "./type"

export const useCreateProfile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : CreateProfile,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["profile"]})
            toast.success("Success to updating profile")
        },
        onError : (err) => {
            toast.error(`Failed to updating profile, ${err.message}`)
        }
    })
}

export const useGetProfile = (id : number) => {
    return useQuery<ResponseApi<ProfileModel>>({
        queryKey : ["profile", id],
        queryFn : () => GetProfileById(id)
    })
}

export const useGetProfileMe = () => {
    return useQuery<ResponseApi<ProfileModel[]>>({
        queryKey : ["profile"],
        queryFn : GetProfileMe
    })
}