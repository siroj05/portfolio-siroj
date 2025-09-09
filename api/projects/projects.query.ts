import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CreateProject, DeleteProject, GetAllProjects, GetProjectById } from "./projects.api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ResponseApi } from "../type"
import { Projects } from "./type"

// create project
export const useCreateProject = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: CreateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Success to create project")
      router.push("/projects")
    },
    onError: (err) => {
      toast.success(`Failed to create project : ${err.message}`)
    }
  })
}

export const useGetAllProjects = () => {
  return useQuery<ResponseApi<Projects[]>>({
    queryKey: ["projects"],
    queryFn: GetAllProjects
  })
}

export const useDeleteProject = (options?: {
  onSuccess?: () => void
  onError?: (err: any) => void
}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: DeleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      options?.onSuccess?.()
    },
    onError: options?.onError
  })
}

export const useGetProjectById = (id : string) => {
  return useQuery<ResponseApi<Projects>>({
    queryKey : ["projects", id],
    queryFn : () => GetProjectById(id)
  })
}