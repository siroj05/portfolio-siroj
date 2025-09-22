import { useMutation } from "@tanstack/react-query"
import { CreateProfile } from "./profile.api"
import { toast } from "sonner"

export const useCreateProfile = () => {
    return useMutation({
        mutationFn : CreateProfile,
        onSuccess : () => {
            toast.success("Success to updating profile")
        },
        onError : (err) => {
            toast.error(`Failed to updating profile, ${err.message}`)
        }
    })
}