"use client";

import {
  Briefcase,
} from "lucide-react";

export const EXPERIENCE = [
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

export default function ExperienceSection(){
    return(
        <section id="#experience">
          <div className="space-y-10">
            <h1 className="text-center font-bold text-4xl max-[426px]:text-3xl">Work Experience</h1>
            <div className="max-w-6xl max-[1240px]:max-w-4xl mx-auto">
              {EXPERIENCE.map((exp) => (
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
                    <p className="text-sm dark:text-slate-300 text-slate-500">{exp.year}</p>
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
    )
}