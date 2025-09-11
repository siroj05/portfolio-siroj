"use client"
// import { Cards } from "@/components/card/card";
import { CardsAdd } from "@/app/(admin)/skills/components/card-add";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export default function DynamicTechForm() {

    const [open,setOpen] = useState(false)

    return (
        <div className="grid grid-cols-3 gap-3 items-start ">
            {/* 
                @Note
                - List category, get dari api get all category
            */}
            {/* {
                SKILLSDATA.map((item,i:number) => (
                    <Cards
                        key={i}
                        category={item.category}
                        option={item.options}
                    />
                ))
            } */}

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
