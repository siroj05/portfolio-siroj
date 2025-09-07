import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateProject } from "./projects.api"

// create project
export const useCreateProject = (
    options? : {
      onSuccess? : () => void
      onError? : (err : any) => void
    }
) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn : CreateProject,
      onSuccess : () => {
        queryClient.invalidateQueries({queryKey : ["projects"]})
        options?.onSuccess?.()
      },
      onError: options?.onError
    })
}