"use client";

import Image from "next/image";

export const SKILLSDATA = [
  {
    category: "Languages",
    options: [
      {
        name: "JavaScript",
        logo: "/javascript.png",
      },
      {
        name: "TypeScript",
        logo: "/typescript.png",
      },
      {
        name: "HTML5",
        logo: "/html5.png",
      },

      {
        name: "Golang",
        logo: "/golang.png",
      },
    ]
  },
  {
    category: "Frontend Frameworks",
    options: [
      {
        name: "React.js",
        logo: "/react.png",
      },
      {
        name: "Next.js",
        logo: "/nextjs.png",
      },
      {
        name: "Vue.js",
        logo: "/vuejs.png",
      },
      {
        name: "Tanstack Query",
        logo: "/tanstack.png",
      },
      {
        name: "Zustand",
        logo: "/zustand.svg",
      },
    ]
  },
  {
    category: "Styling & Design",
    options: [
      {
        name: "CSS3",
        logo: "/css3.png",
      },
      {
        name: "Tailwind CSS",
        logo: "/tailwindcss.png",
      },
      {
        name: "Bootstrap CSS",
        logo: "/bootstrap.png",
      },
      {
        name: "Shadcn UI",
        logo: "/shadcn-ui.png",
      },
      {
        name: "Ant Design",
        logo: "/Ant Design.png",
      },
    ]
  },
  {
    category : "Backend & Databases",
    options : [
      {
        name: "MongoDB",
        logo: "/mongodb.png",
      },
      {
        name: "MySQL",
        logo: "/mysql.png",
      },
      {
        name: "Node.js",
        logo: "/nodejs.png",
      },
    ]
  }
]

export default function SkillsSection() {
  return (
    <section id="skills">
      <div className="space-y-10">
        <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Technologies</h1>
        <div className="max-w-6xl max-[1240px]:max-w-4xl max-[1024px]:max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-5 max-[1240px]:grid-cols-2 max-[1240px]:gap-3 max-[590px]:grid-cols-1">

            {
              SKILLSDATA && SKILLSDATA.map((skill)=>(
                <div key={skill.category} className=" border rounded-xl py-3 w-[270px] max-[1240px]:w-full hover:ring-2 hover:ring-blue-500 transition-all duration-200 p-5 space-y-4">
                  <h1 className="my-5 font-bold text-xl">{skill.category}</h1>
                  <div className="space-y-4 max-[590px]:grid max-[470px]:grid-cols-2 gap-2 max-[410px]:grid-cols-1">
                    {skill.options.map((item) => (
                      <div
                        key={item.logo}
                        className="flex gap-2 border py-1 px-2 rounded-xl hover:dark:bg-slate-800 hover:bg-slate-100"
                      >
                        <Image
                          src={item.logo}
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
        </div>
      </div>
    </section>
  )
}