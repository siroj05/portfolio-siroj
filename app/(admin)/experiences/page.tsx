"use client"

import { EXPERIENCE } from "@/components/section/experience-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Plus, SquarePen } from "lucide-react";
import Link from "next/link";

export default function Experiences() {
    return (
        <div className="bg-card border rounded-lg h-screen">
            <div className="sticky top-11 z-40 bg-card">
                <div className="flex justify-end py-3 px-10">
                    <Button asChild>
                        <Link href={"/experiences/add"}>
                            <Plus />
                            Add Experience
                        </Link>
                    </Button>
                </div>
                <Separator />
            </div>
            <div className="space-y-10 mt-4">
                <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">
                    Work Experience
                </h1>
                <div className="max-w-6xl max-[1240px]:max-w-4xl mx-auto">
                    {EXPERIENCE && EXPERIENCE?.map((exp) => (
                        <div
                            key={exp.office}
                            className="border dark:bg-zinc-800 bg-zinc-100 p-4 rounded-lg flex justify-between gap-2 my-3"
                        >
                            <div className="flex gap-2">
                                <div className="flex justify-start">
                                    <Briefcase className="bg-blue-500 rounded-full w-10 h-10 p-2" />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-xl font-semibold">{exp.position}</h1>
                                    <p className="text-sm text-blue-400">{exp.office}</p>
                                    <p className="text-sm dark:text-slate-300 text-slate-500">
                                        {exp.year}
                                    </p>
                                    <ul className="list-disc text-sm space-y-1 mt-3">
                                        {exp.desc.map((i) => (
                                            <li key={i}>{i}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                {/* 
                                    @Note
                                    - ini nanti Link direct ke page edit
                                */}
                                <button className="flex mr-5 hover:bg-zinc-300 p-1 hover:dark:text-slate-700 rounded-sm cursor-pointer">
                                    <SquarePen />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
