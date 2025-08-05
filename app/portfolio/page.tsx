"use client";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const coreTech = [
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
];

const frontend = [
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
];

const stylingDesign = [
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
];
const databases = [
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
];

const projects = [
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

const experience = [
  {
    position: "Frontend Developer",
    office: "PT. Arthamas Solusindo",
    year: "January 2023 - Present",
    desc: [
      `Developed and maintained ERP web applications to streamline business operations and improve efficiency.`,
      `Built and optimized responsive user interfaces using React.js, TypeScript, and Tailwind CSS.`,
      ` Worked closely with backend developers to integrate
                      RESTful APIs for real-time data processing.`,
      `Improved application performance and usability, reducing
                      load time and enhancing user experience.`,
      `Collaborated with cross-functional teams to deliver
                      scalable and maintainable solutions aligned with business
                      requirements.`,
    ],
  },
  {
    position: "Frontend Developer",
    office: "Indonesian Institute of Science (LIPI) - Internship",
    year: "July 2021 - August 2021",
    desc: [
      `Built a responsive user interface (UI) using Vue.js and CSS, ensuring accessibility across
different devices.`,
      `Collaborated with the backend team to ensure seamless data synchronization between the
roasting machine and the dashboard.`,
      ` Developed an interactive dashboard to monitor an automated coffee roasting machine.`,
    ],
  },
  {
    position: "Laboratory Assistant",
    office: "Software Engineering and Application (SEA)",
    year: "August 2020 - September 2021",
    desc: [
      `Conducted C and C++ programming classes, guiding students in fundamental programming
concepts and problem-solving techniques.`,
      `Taught web development, covering HTML, CSS, and JavaScript to help students build
interactive websites.`,
      `Assisted in debugging and troubleshooting students code, ensuring they understood best
practices in software development.`,
      `Provided one-on-one mentoring and practical sessions to reinforce theoretical knowledge with
hands-on coding exercises.`,
      `Collaborated with fellow assistants and lecturers to improve learning materials and teaching
methods.`,
    ],
  },
];

export default function Portfolio() {
  return (
    <div>
      {/* navbar */}
      <Navbar />

      <div className="space-y-20 my-10 max-[691px]:mx-10">
        {/* hero section */}
        <section id="home">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              {/* foto profile */}
              <Image
                src={"/test.jpg"}
                alt={"avatar"}
                width={200}
                height={200}
                // layout="responsive" // Enables responsive layout
                // sizes="(max-width: 200px) 200px"
                className="rounded-full mx-auto mb-8 border-4 border-white shadow-xl"
              />

              <div className="space-y-6">
                {/* full name */}
                <h1 className="font-bold text-6xl max-[691px]:text-5xl max-[426px]:text-3xl">Siroojuddin Apendi</h1>

                {/* passion */}
                <h1 className="text-blue-500 text-4xl max-[691px]:text-3xl max-[426px]:text-xl">Frontend Developer</h1>

                {/* kontak & view work */}
                <div className="flex justify-center gap-2">
                  <Button size="lg" asChild>
                    <Link href={"#mail"}>
                      <Mail />
                      Get In Touch
                    </Link>
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
                  <Github />
                  <Linkedin />
                  <Mail />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* about section*/}
        <section id="about">
          <div className="space-y-10">
            <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">About Me</h1>
            <div className="max-w-4xl  max-[1024px]:max-w-2xl max-[691px] mx-auto">
              <p className="text-justify max-[426px]:text-[13px]">
                Passionate Frontend Developer with over 2 years of experience in
                developing scalable, high-performance web applications. Skilled
                in React.js, TypeScript, and Tailwind CSS, with a strong
                emphasis on clean, maintainable code and efficient user
                interactions. Enthusiastic about learning new technologies,
                tackling complex challenges, and staying up to date with
                industry advancements. Highly adaptable and always eager to
                explore new programming languages and frameworks to build
                innovative digital solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills">
          <div className="space-y-10">
            <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Technologies</h1>
            <div className="max-w-6xl max-[1240px]:max-w-4xl max-[1024px]:max-w-2xl mx-auto">
              <div className="grid grid-cols-4 gap-5 max-[1240px]:grid-cols-2 max-[1240px]:gap-3 max-[590px]:grid-cols-1">
                {/* languages */}
                <div className=" border rounded-xl py-3 w-[270px] max-[1240px]:w-full hover:ring-2 hover:ring-blue-500 transition-all duration-200 p-5 space-y-4">
                  <h1 className="my-5 font-bold text-xl">Languages</h1>
                  <div className="space-y-4 max-[590px]:grid max-[470px]:grid-cols-2 gap-2 max-[410px]:grid-cols-1">
                    {coreTech.map((item) => (
                      <div
                        key={item.logo}
                        className="flex gap-2 border py-1 px-2 rounded-xl hover:bg-slate-800"
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

                {/* Frontend frameworks */}
                <div className="border rounded-xl py-3 w-[270px] max-[1240px]:w-full hover:ring-2 hover:ring-blue-500 transition-all duration-200 p-5 space-y-4">
                  <h1 className="my-5 font-bold text-xl">
                    Frontend Frameworks
                  </h1>
                  <div className="space-y-4 max-[590px]:grid max-[470px]:grid-cols-2 gap-2 max-[410px]:grid-cols-1">
                    {frontend.map((item) => (
                      <div
                        key={item.logo}
                        className="flex gap-2 border py-1 px-2 rounded-xl hover:bg-slate-800"
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

                {/* styling */}
                <div className="border rounded-xl py-3 w-[270px] max-[1240px]:w-full hover:ring-2 hover:ring-blue-500 transition-all duration-200 p-5 space-y-4">
                  <h1 className="my-5 font-bold text-xl">Styling & Design</h1>
                  <div className="space-y-4 max-[590px]:grid max-[470px]:grid-cols-2 gap-2 max-[410px]:grid-cols-1">
                    {stylingDesign.map((item) => (
                      <div
                        key={item.logo}
                        className="flex gap-2 border py-1 px-2 rounded-xl hover:bg-slate-800"
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

                {/* other tools */}
                <div className="border rounded-xl py-3 w-[270px] max-[1240px]:w-full hover:ring-2 hover:ring-blue-500 transition-all duration-200 p-5 space-y-4">
                  <h1 className="my-5 font-bold text-xl">
                    Backend & Databases
                  </h1>
                  <div className="space-y-4 max-[590px]:grid max-[470px]:grid-cols-2 gap-2 max-[410px]:grid-cols-1">
                    {databases.map((item) => (
                      <div
                        key={item.logo}
                        className="flex gap-2 border py-1 px-2 rounded-xl hover:bg-slate-800"
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
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="project">
          <div className="space-y-10">
            <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Projects</h1>
            <div className="max-w-6xl max-[1240px]:max-w-4xl max-[1024px]:max-w-2xl mx-auto">
              <div className="grid grid-cols-4 gap-4 max-[1240px]:grid-cols-3 max-[1240px]:gap-5 max-[691px]:grid-cols-2 max-[426px]:grid-cols-1">
                {projects.map((project) => (
                  <div
                    key={project.title}
                    className="border bg-zinc-800 w-[280px] max-[1240px]:w-full rounded-xl hover:scale-105 duration-150"
                  >
                    <Image
                      src={project.src}
                      alt={project.title}
                      className="w-full rounded-t-xl"
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

        {/* Work Experience */}
        <section id="#experience">
          <div className="space-y-10">
            <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Work Experience</h1>
            <div className="max-w-6xl max-[1240px]:max-w-4xl mx-auto">
              {experience.map((exp) => (
                <div
                  key={exp.office}
                  className="border dark:bg-zinc-800 p-4 rounded-lg flex gap-2 my-3"
                >
                  <div className="flex justify-start">
                    <Briefcase className="bg-blue-500 rounded-full w-10 h-10 p-2" />
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-xl font-semibold">{exp.position}</h1>
                    <p className="text-sm text-blue-400">{exp.office}</p>
                    <p className="text-sm text-slate-300">{exp.year}</p>
                    <ul className="list-disc text-sm space-y-1 mt-3">
                      {exp.desc.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* contact */}
        <section id="#contact">
          <div className="space-y-10">
            <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Contact Me</h1>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-row max-[590px]:flex-col justify-center gap-3">
                <div className="dark:bg-zinc-800 border p-2 rounded-xl flex gap-2">
                  <Mail className="my-auto w-12 h-12" />
                  <div className="">
                    <p className="font-semibold">Email</p>
                    <p className="text-sm dark:text-slate-200">
                      rojudin123@gmail.com
                    </p>
                  </div>
                </div>
                <div className="dark:bg-zinc-800 border p-2 rounded-xl flex gap-2">
                  <MapPin className="my-auto w-12 h-12" />
                  <div className="">
                    <p className="font-semibold">Location</p>
                    <p className="text-sm dark:text-slate-200">
                      Tangerang, Indonesia
                    </p>
                  </div>
                </div>
                <div className="dark:bg-zinc-800 border p-2 rounded-xl flex gap-2">
                  <Phone className="my-auto w-12 h-12" />
                  <div className="">
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm dark:text-slate-200">
                      +62 81383304270
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="bg-zinc-800 h-[100px] flex justify-center items-center">
        <p className="text-center">
          © 2025 Siroojuddin Apendi. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
