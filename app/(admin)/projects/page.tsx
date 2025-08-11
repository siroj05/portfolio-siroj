"use client"

import { PROJECTS } from "@/components/section/project-section"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Github, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function Projects(){
    return(
        <div className="bg-card border rounded-lg">
            <div className="flex justify-end py-3 px-10">
                <Button asChild>
                    <Link href={"/projects/add"}>
                        <Plus/>Add Projects
                    </Link>
                </Button>
            </div>
            <Separator/>

            <div className="py-5 max-w-5xl max-[1240px]:max-w-4xl max-[1024px]:max-w-2xl mx-auto">
              <div className="grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-[1240px]:gap-5 max-[691px]:grid-cols-2 max-[426px]:grid-cols-1">
                {PROJECTS.map((project) => (
                  <div
                    key={project.title}
                    className="border dark:bg-zinc-800 bg-zinc-100  w-[230px] max-[1240px]:w-full rounded-xl hover:scale-105 duration-150"
                  >
                    <Image
                      src={project.src}
                      alt={project.title}
                      className="w-full rounded-t-xl bg-zinc-800"
                      width={300}
                      height={300}
                    />
                    <div className="p-3 space-y-1">
                      {/* title */}
                      <h1 className="font-semibold text-sm">{project.title}</h1>

                      {/* description */}
                      <p className="text-[12px]">{project.desc}</p>

                      {/* technologies */}
                      <div className="space-x-1">
                        {project.tech.map((t) => (
                          <Badge className="text-[9px]" key={t}>{t}</Badge>
                        ))}
                      </div>

                      {/* action */}
                      <div className="flex gap-2 max-[590px]:flex-col">
                        {project.demo.length > 0 && (
                          <Button
                            className="bg-blue-500 cursor-pointer dark:text-white hover:bg-blue-400"
                            size="sm"
                            asChild
                          >
                            <Link href={project.demo} target="_blank">
                              <ExternalLink /> Demo
                            </Link>
                          </Button>
                        )}
                        {project.code.length > 0 && (
                          <Button className="cursor-pointer" size="sm" asChild>
                            <Link href={project.code} target="_blank">
                              <Github /> Code
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
    )
}