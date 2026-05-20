import { Experiences } from "@/api/experiences"
import { ResponseApi } from "@/api/type"
import { LoadingDots } from "@/components/loading/loadings"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatDateName } from "@/lib/format-date"
import { Briefcase, Plus, SquarePen, Trash } from "lucide-react"
import Link from "next/link"

interface Props {
    experiences? : ResponseApi<Experiences[]>
    isLoading : boolean
    isError : boolean
    isSuccess : boolean
    setGetId : (val : string) => void
    setOpen : (val : boolean) => void
}

export default function ListExperiences({
    experiences,
    isLoading,
    isError,
    isSuccess,
    setGetId,
    setOpen
} : Props) {
    return (
        <div className="bg-card border rounded-lg min-h-[calc(100vh-6rem)]">
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
            <div className="space-y-10 mt-4 ">
                <div className="max-w-6xl max-[1367px]:max-w-4xl mx-auto">
                    {isLoading ?
                        <LoadingDots/>
                    : isSuccess ?
                        experiences&& experiences?.data.length>0? experiences?.data?.map((exp) => {
                            return (
                                <div
                                    key={exp.id}
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
                                                {formatDateName(exp?.start.toString())} - {formatDateName(exp?.end?.toString())}
                                            </p>
                                            <div className="description-content text-sm space-y-1 mt-3" dangerouslySetInnerHTML={{ __html: JSON.parse(exp.description!) }} />
                                        </div>
                                    </div>
                                    <div>
                                        {/* 
                                            @Note
                                            - ini nanti Link direct ke page edit
                                        */}
                                        <div className="flex gap-1">
                                            <Button asChild className="flex hover:bg-zinc-300 p-1 hover:dark:text-slate-700 hover:shadow-white rounded-sm cursor-pointer">
                                                <Link href={`experiences/edit/${exp.id}`}>
                                                    <SquarePen />
                                                </Link>
                                            </Button>
                                            <Button onClick={() => {
                                                setOpen(true)
                                                setGetId(exp?.id??"")
                                            }} variant="destructive" size="icon" className="flex p-1 hover:shadow-red-400/80 rounded-sm cursor-pointer">
                                                <Trash />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }):
                        <div className="flex items-center justify-center py-4">
                            <p className="text-center">No Experience Found</p>
                        </div>
                    : isError &&
                        <div className="flex items-center justify-center py-4">
                            <p className="text-sm text-red-500">Failed to get experiences</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}