"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const PROJECTS = [
  {
    src: "/hoyolab-clone.png",
    title: "Hoyolab Clone",
    desc: "A Hoyolab-inspired clone with user registration, login, posting, and comment features.",
    tech: ["React", "Tailwind CSS", "TypeScript", "Redux", "Vite"],
    demo: "https://siroj-hoyolab-clone.netlify.app/home",
    code: "https://github.com/siroj05/hoyolab-clone",
  },
  {
    src: "/nodejs240.png",
    title: "Hoyolab Clone Backend",
    desc: "A hoyolab clone backend.",
    tech: ["Express.js", "MongoDB"],
    demo: "",
    code: "https://github.com/siroj05/express-mongo",
  },
  {
    src: "/compro.png",
    title: "Roxy Square Company Profile",
    desc: "A company profile website for Roxy Square. Built to showcase their retail tenants, location info, and customer services.",
    tech: ["React", "Vite", "Ant Design", "Tailwind CSS"],
    demo: "https://roxysquarejakarta.com/",
    code: "",
  },
  {
    src: "/pokedex.png",
    title: "Pokedex",
    desc: "A simple Pokédex web application built using Next.js and the PokeAPI. Users can search for Pokémon, view detailed information, and explore different types and stats.",
    tech: ["Next.js", "Zustand", "Tailwind CSS", "Shadcn UI", "Typescript"],
    demo: "https://siroj-pokedex.netlify.app/list-pokemon",
    code: "https://github.com/siroj05/pokemon",
  },
  {
    src: "/remix-run.png",
    title: "ERP Project",
    desc: " A financial ERP system developed for PT Arthamas Solusindo, designed to manage transactions, budgeting, and generate financial reports efficiently.",
    tech: ["Remix.js", "Zustand", "Tailwind CSS", "Shadcn UI", "Typescript"],
    demo: "",
    code: "",
  },
  {
    src: "/post-web.png",
    title: "Post Web",
    desc: "A simple blog-like post web built with React that fetches and displays post data from the DummyJSON API. Users can view a list of posts and navigate to individual post details.",
    tech: ["Next.js", "Tailwind CSS"],
    demo: "https://posts-test-site.netlify.app/",
    code: "https://github.com/siroj05/Posts",
  },
];

export default function ProjectSection(){
    return(
        <section id="project">
          <div className="space-y-10">
            <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Projects</h1>
            <div className="max-w-6xl max-[1240px]:max-w-4xl max-[1024px]:max-w-2xl mx-auto">
              <div className="grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-[1240px]:gap-5 max-[691px]:grid-cols-2 max-[426px]:grid-cols-1">
                {PROJECTS.map((project) => (
                  <div
                    key={project.title}
                    className="border dark:bg-zinc-800 bg-zinc-100  w-[280px] max-[1240px]:w-full rounded-xl hover:scale-105 duration-150"
                  >
                    <Image
                      src={project.src}
                      alt={project.title}
                      className="w-full rounded-t-xl bg-zinc-800"
                      width={300}
                      height={300}
                    />
                    <div className="p-3 space-y-5">
                      {/* title */}
                      <h1 className="font-semibold text-lg">{project.title}</h1>

                      {/* description */}
                      <p className="text-sm">{project.desc}</p>

                      {/* technologies */}
                      <div className="space-x-1">
                        {project.tech.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>

                      {/* action */}
                      <div className="flex gap-2 max-[590px]:flex-col">
                        {project.demo.length > 0 && (
                          <Button
                            className="bg-blue-500 cursor-pointer dark:text-white hover:bg-blue-400 "
                            asChild
                          >
                            <Link href={project.demo} target="_blank">
                              <ExternalLink /> Demo
                            </Link>
                          </Button>
                        )}
                        {project.code.length > 0 && (
                          <Button className="cursor-pointer" asChild>
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
        </section>
    )
}