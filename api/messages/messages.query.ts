import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ResponseApi } from "../type"
import { Messages } from "./type"
import { CreateMessage, DeleteMessage, GetAllMessages, MarkMessage } from "./messages.api"

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