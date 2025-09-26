"use client";

import { useGetAllCategories } from "@/api/skills";
import Image from "next/image";
import { LoadingDots } from "../loading/loadings";

export default function SkillsSection() {
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetAllCategories();

  return (
    <section id="skills">
      <div className="space-y-10">
        <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Technologies</h1>
        <div className="max-w-6xl max-[1240px]:max-w-4xl max-[1024px]:max-w-2xl mx-auto">
          {
            isLoading ?
              <LoadingDots />
              : isSuccess ?
                (categories.data.length > 0 ?
                  <div className="grid justify-items-center gap-2 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">

                    {
                      categories.data.map((skill) => (
                        <div key={skill.category} className=" border rounded-xl py-3 w-[270px] max-[1240px]:w-full hover:ring-2 hover:ring-blue-500 transition-all duration-200 p-5 space-y-4">
                          <h1 className="my-5 font-bold text-xl">{skill.category}</h1>
                          <div className="space-y-4 max-[590px]:grid max-[470px]:grid-cols-2 gap-2 max-[410px]:grid-cols-1">
                            {skill.skills.map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-2 border py-1 px-2 rounded-xl hover:dark:bg-slate-800 hover:bg-slate-100"
                              >
                                <Image
                                  src={item.icon}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                />
                                <p className="my-auto font-black">{item.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    }

                  </div>
                  : <p className="text-center">
                    No Technologies Found
                  </p>
                )
                : isError &&
                <p className="text-red-500 text-xs text-center">{error.message}</p>
          }
        </div>
      </div>
    </section>
  )
}