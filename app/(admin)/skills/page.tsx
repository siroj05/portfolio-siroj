"use client"
import { Cards } from "@/components/card/card";
import { CardsAdd } from "@/components/card/card-add";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export const techCategories = [
    {
        category: "Languages",
        options: ["JavaScript", "TypeScript", "HTML5", "Golang"],
    },
    {
        category: "Frontend Frameworks",
        options: ["React.js", "Next.js", "Vue.js", "Tanstack Query", "Zustand"],
    },
    {
        category: "Styling & Design",
        options: ["CSS3", "Tailwind CSS", "Bootstrap CSS", "Shadcn UI", "Ant Design"],
    },
    {
        category: "Backend & Databases",
        options: ["MongoDB", "MySQL", "Node.js"],
    },
];


export default function DynamicTechForm() {

    const [open,setOpen] = useState(false)

    return (
        <div className="grid grid-cols-4 gap-4 items-start ">
            {/* 
                @Note
                - List category, get dari api get all category
            */}
            {
                techCategories.map((item,i:number) => (
                    <Cards
                        key={i}
                        category={item.category}
                        option={item.options}
                    />
                ))
            }

            {/* 
                @Note
                - Btn add untuk membuka CardAdd
                - Card add terbuka untuk menambah kategori baru
                - Saat card add terbuka btn add di hide begitu sebaliknya
            */}
            {open && <CardsAdd setOpen={setOpen}/>}
            {!open &&
                <button onClick={() => setOpen(true)} className="hover:bg-zinc-700 cursor-pointer bg-card text-card-foreground rounded-xl border py-2 flex justify-center shadow-sm">
                    <CirclePlus />
                </button>
            }
        </div>
    );
}
