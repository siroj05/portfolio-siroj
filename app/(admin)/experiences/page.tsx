import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Experiences(){
    return(
        <div className="bg-card border rounded-lg h-screen">
            <div className="flex justify-end py-3 px-10">
                <Button asChild>
                    <Link href={"/experiences/add"}>
                        <Plus/>Experience
                    </Link>
                </Button>
            </div>
            <Separator/>
        </div>
    )
}