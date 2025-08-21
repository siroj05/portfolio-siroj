import { Briefcase } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    title: string
    desc: string
    link: string
    labelBtn: string
    total: number
    icon: ReactNode
}

export default function CardDashboard({ title, desc, link, labelBtn, total, icon }: Props) {
    return (
        <div className="bg-card border rounded-sm w-[300px] p-2 flex flex-col gap-3">
            <div className="flex justify-between">
                <h3 className="text-sm dark:text-zinc-300 text-zinc-700 font-semibold">
                    {title}
                </h3>
                {icon}
            </div>
            <p className="dark:text-zinc-300 text-zinc-700 text-3xl">{total}</p>
            <p className="text-[11px] dark:text-zinc-400 text-zinc-700">{desc}</p>
            <div>
                <Button size="sm" asChild>
                    <Link href={link}>
                        {labelBtn}
                    </Link>
                </Button>
            </div>
        </div>
    )
}