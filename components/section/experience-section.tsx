"use client";

import { useGetAllExperiences } from "@/api/experiences";
import { formatDateName } from "@/lib/format-date";
import { Briefcase } from "lucide-react";
import { LoadingDots } from "../loading/loadings";

export default function ExperienceSection() {
  const {
    data: experiences,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllExperiences(true);
  return (
    <section id="#experience">
      <div className="space-y-10">
        <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">
          Work Experience
        </h1>
        <div className="max-w-6xl max-[1240px]:max-w-4xl mx-auto">
          {
            isLoading? 
            <LoadingDots/>
            : isSuccess ?
          experiences && experiences?.data.length>0 ? 
            experiences?.data.map((exp) => (
            <div
              key={exp.office}
              className="border dark:bg-zinc-800 bg-zinc-100 p-4 rounded-lg flex gap-2 my-3"
            >
              <div className="flex justify-start">
                <Briefcase className="bg-blue-500 rounded-full w-10 h-10 p-2" />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-semibold">{exp.position}</h1>
                <p className="text-sm text-blue-400">{exp.office}</p>
                <p className="text-sm dark:text-slate-300 text-slate-500">
                  {formatDateName(exp?.start.toString())} -{" "}
                  {formatDateName(exp?.end?.toString())}
                </p>
                <div
                  className="description-content text-sm space-y-1 mt-3"
                  dangerouslySetInnerHTML={{
                    __html: JSON.parse(exp.description!),
                  }}
                />
              </div>
            </div>
          )) : <p className="text-center">No Experience Found</p>
          : isError && <p className="text-center">Something went wrong</p>
        }
        </div>
      </div>
    </section>
  );
}
