import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ResponseApi } from "../type"
import { Messages } from "./type"
import { CreateMessage, DeleteAllMessages, DeleteMessage, GetAllMessages, MarkAllMessages, MarkMessage } from "./messages.api"
import { toast } from "sonner"

/*
*buat react query untuk hit api message disini
*/

// get all messages
export const useGetAllMessages = () => {
    return useQuery<ResponseApi<Messages[]>>({
        queryKey: ["messages"],
        queryFn: GetAllMessages,
    })
}

// delete message
export const useDeleteMessage = (
    options?:{
        onSuccess?:() => void
        onError?:(err : any) => void
    }
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => DeleteMessage(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["messages"]})
            options?.onSuccess?.()
        },
        onError: options?.onError,
    })
}

// delete all messages
export const useDeleteAllMessages = (
    options?:{
        onSuccess?:() => void
    }
) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn : DeleteAllMessages,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey:["messages"]})
            toast.success("Successfully deleted all messages")
            options?.onSuccess?.()
        },
        onError : (err) =>{
            toast.error(`Failed to delete all messages, ${err}`)
        }
    })
}

// create message
export const useCreateMessage = (
    options? : {
        onSuccess? : () => void
        onError? : (err : any) => void
    }
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : CreateMessage,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["messages"]})
            options?.onSuccess?.()
        },
        onError: options?.onError
    })
}

// mark message
export const useMarkMessage = (
    options? : {
        onSuccess? : () => void
        onError? : (err : any) => void
    }
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: MarkMessage,
        onSuccess : ()=>{
            queryClient.invalidateQueries({queryKey : ["messages"]})
            options?.onSuccess?.()
        },
        onError: options?.onError
    })
}

// mark all message
export const useMarkAllMessages = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: MarkAllMessages,
        onSuccess : ()=>{
            queryClient.invalidateQueries({queryKey : ["messages"]})
            toast.success("Successfully marked all messages as read")
        },
        onError : (err) => {
            toast.error(`Failed to marked all messages, ${err}`)
        }
    })
}