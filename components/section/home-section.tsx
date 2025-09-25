"use client";

import { ProfileModel, useGetProfileMe } from "@/api/profile";
import { Button } from "@/components/ui/button";
import {
    Briefcase,
    Github,
    Linkedin,
    Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LoadingDots } from "../loading/loadings";

interface Props {
    data : ProfileModel
    isLoading : boolean
    isError : boolean
    isSuccess : boolean
}

export default function HomeSection({
    data,
    isLoading,
    isError,
    isSuccess
}:Props) {
    return(
        <section id="home">
            <div className="container mx-auto text-center">
                {
                    isLoading?
                    <LoadingDots/>
                    :isSuccess?    
                    <div className="max-w-4xl mx-auto">
                    {/* foto profile */}
                    <div className="w-[200px] h-[200px] mx-auto mb-10">
                        <Image
                            src={data?.imagePath!}
                            alt={"avatar"}
                            width={100}
                            height={100}
                            layout="responsive" // Enables responsive layout
                            // sizes="(max-width: 200px) 200px"
                            className="rounded-full mx-auto mb-8 border-4 border-white shadow-xl"
                        />
                    </div>

                    <div className="space-y-6">
                        {/* full name */}
                        <h1 className="font-bold text-6xl max-[691px]:text-5xl max-[426px]:text-3xl">{data?.fullName}</h1>

                        {/* passion */}
                        <h1 className="text-blue-500 text-4xl max-[691px]:text-3xl max-[426px]:text-xl">{data?.jobTitle}</h1>

                        {/* kontak & view work */}
                        <div className="flex justify-center gap-2">
                            <Button size="lg" asChild>
                                <a href={`mailto:${data?.email}`}>
                                    <Mail />
                                    Get In Touch
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href={"#project"}>
                                    <Briefcase />
                                    View Work
                                </Link>
                            </Button>
                        </div>

                        {/* sosial media */}
                        <div className="flex justify-center gap-4">
                            <Link href={`${data?.repository}`} target="_blank">
                                <Github />
                            </Link>
                            <Link href={`${data?.linkedin}`} target="_blank">
                                <Linkedin />
                            </Link>
                            <a href={`mailto:${data?.email}`}>
                                <Mail />
                            </a>
                        </div>
                    </div>
                    </div>:isError&&
                    <p className="text-center">Something went wrong</p>
                }
            </div>
        </section>
    )
}