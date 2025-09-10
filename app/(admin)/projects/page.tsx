"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Github, LoaderCircle, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useDeleteProject, useGetAllProjects } from "@/api/projects"
import { ActionDropdown } from "@/components/action"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { AlertDialogDelete } from "@/components/dialog/alert-dialog"
import { LoadingDots } from "@/components/loading/loadings"
import { toast } from "sonner"
import { Tooltips } from "@/components/tooltips"

export default function Projects() {

  const { data: projects, isLoading, isError, isSuccess } = useGetAllProjects()
  const [open, setOpen] = useState(false)
  const [getId, setGetId] = useState("")
  
  // delete
  const {mutate, isPending} = useDeleteProject({
    onSuccess : () => {
      setOpen(false)
      toast.success("Delete Successfully")
    },
    onError : (err) => {
      toast.error(`Error delete : ${err}`)
    }
  })

  const handleDelete = () => {
    mutate(getId)
  }

  return (
    <div className="bg-card border rounded-lg min-h-[calc(100vh-6rem)]">
      <div className="flex justify-end py-3 px-10">
        <Button asChild>
          <Link href={"/projects/add"}>
            <Plus />Add Projects
          </Link>
        </Button>
      </div>
      <Separator />

      {/* card */}

      {
        isLoading ?
          <div className="py-10">
            <LoadingDots />
          </div>
          : isSuccess ?
            (
              projects.data.length > 0 ?

                <div className="py-5 max-w-5xl max-[1240px]:max-w-4xl max-[1024px]:max-w-2xl mx-auto">
                  <div className="grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-[1240px]:gap-5 max-[691px]:grid-cols-2 max-[426px]:grid-cols-1">
                    {projects?.data.map((project) => {
                      const techStack = project?.techStack?.replace(/\s/g, "").split(',')
                      return (
                        <div
                          key={project.title}
                          className="border dark:bg-zinc-800 bg-zinc-100  w-[230px] max-[1240px]:w-full rounded-xl"
                        >
                          <div className="relative">
                            <Image
                              src={project.FilePath!}
                              alt={project.title}
                              className="w-full rounded-t-xl bg-zinc-800"
                              width={300}
                              height={300}
                            />
                            <div className="absolute right-0 top-0">
                              <ActionDropdown
                                actionNode={
                                  <>
                                    <DropdownMenuItem asChild>
                                      <Link className="cursor-pointer" href={`projects/${project.id}`}>
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                      setOpen(true)
                                      setGetId(project.id!)
                                    }} className="text-red-600 cursor-pointer">
                                      Delete
                                    </DropdownMenuItem>
                                  </>
                                }
                              />
                            </div>
                          </div>
                          <div className="p-3 space-y-1">
                            {/* title */}
                            <h1 className="font-semibold text-sm">{project.title}</h1>

                            {/* description */}
                            {
                              project.description.length > 50 ?
                              <Tooltips
                                trigger={
                                  <p className="text-[12px]">{project.description.substring(0, 50)}...</p>
                                }
                                content={
                                  <p className="text-[12px]">{project.description}</p>
                                }
                              />
                              :
                              <p className="text-[12px]">{project.description}</p>
                            }

                            {/* technologies */}
                            <div className="space-x-1">
                              {techStack?.map((t) => (
                                <Badge className="text-[9px]" key={t}>{t}</Badge>
                              ))}
                            </div>

                            {/* action */}
                            <div className="flex gap-2 max-[590px]:flex-col">
                              {project!.demoUrl!.length > 0 && (
                                <Button
                                  className="bg-blue-500 cursor-pointer dark:text-white hover:bg-blue-400"
                                  size="sm"
                                  asChild
                                >
                                  <Link href={project.demoUrl!} target="_blank">
                                    <ExternalLink /> Demo
                                  </Link>
                                </Button>
                              )}
                              {project.githubUrl!.length > 0 && (
                                <Button className="cursor-pointer" size="sm" asChild>
                                  <Link href={project.githubUrl!} target="_blank">
                                    <Github /> Code
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    }
                    )}
                  </div>
                </div>
                :
                <div className="flex items-center justify-center py-4">
                  <p className="text-center">No Projects Found</p>
                </div>
            ) : isError &&
            <div className="flex items-center justify-center py-4">
              <p className="text-sm text-red-500">Failed to get projects</p>
            </div>
      }

      {/* popup delete confirmation */}
      <AlertDialogDelete
        open={open}
        onOpenChange={setOpen}
        footer={
          <>
            <Button className="cursor-pointer" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              onClick={handleDelete}
              disabled={isPending}
              variant="destructive"
            >
              {(isPending) ? <LoaderCircle className="animate-spin" /> : "Delete"}
            </Button>
          </>
        }
      />
    </div>
  )
}