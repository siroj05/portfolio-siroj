"use client";

import { useGetAllProjects } from "@/api/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LoadingDots } from "../loading/loadings";

export default function ProjectSection() {
  const { data: projects, isLoading, isError, isSuccess } = useGetAllProjects()
  return (
    <section id="project">
      <div className="space-y-10">
        <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Projects</h1>
        <div className="max-w-6xl max-[1240px]:max-w-4xl max-[1024px]:max-w-2xl mx-auto">
          {
            isLoading ?
              <div className="py-10">
                <LoadingDots />
              </div> :
              isSuccess ?
                (projects.data.length > 0 ?
                  <div className="grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-[1240px]:gap-5 max-[691px]:grid-cols-2 max-[426px]:grid-cols-1">
                    {projects?.data.map((project) => {
                      const techStack = project?.techStack?.replace(/\s/g, "").split(',')
                      return (
                        <div
                          key={project.title}
                          className="border dark:bg-zinc-800 bg-zinc-100  w-[280px] max-[1240px]:w-full rounded-xl hover:scale-105 duration-150"
                        >
                          <Image
                            src={project.FilePath!}
                            alt={project.title}
                            className="w-full rounded-t-xl bg-zinc-800"
                            width={300}
                            height={300}
                          />
                          <div className="p-3 space-y-5">
                            {/* title */}
                            <h1 className="font-semibold text-lg">{project.title}</h1>

                            {/* description */}
                            <p className="text-sm">{project.description}</p>

                            {/* technologies */}
                            <div className="space-x-1">
                              {techStack.map((t) => (
                                <Badge key={t}>{t}</Badge>
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
                    })}
                  </div> :
                  <div className="flex items-center justify-center py-4">
                    <p className="text-center">No Projects Found</p>
                  </div>
                ) : isError &&
                <div className="flex items-center justify-center py-4">
                  <p className="text-sm text-red-500">Failed to get projects</p>
                </div>
          }
        </div>
      </div>
    </section>
  )
}