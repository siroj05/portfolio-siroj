import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckCheck, Trash2 } from "lucide-react";

export default function Messages(){
    return(
        <div className="bg-card border rounded-lg">
            <div className="sticky top-11 z-40 bg-card">
                <div className="p-4 flex justify-between gap-10">
                    <h1 className="text-lg my-auto font-semibold">
                        Messages
                    </h1>
                    <Input className="w-[400px]" placeholder="Search message.."/>
                    <div className="space-x-2">
                        <Button className="cursor-pointer"><CheckCheck/> Mark all as read</Button>
                        <Button className="cursor-pointer" variant="destructive"><Trash2/> Delete all messages</Button>
                    </div>
                </div>
                <Separator/>
            </div>
            <div className="h-screen">

            </div>
        </div>
    )
}