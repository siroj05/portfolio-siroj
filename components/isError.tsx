"use client"
import { FormLayout } from "@/components/layout/form-layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function IsErrorFetch(
    {
        message
    }:{
        message: Error
    }
){
    const router = useRouter()
    return(
        <FormLayout>
            <div className="space-y-5">
                <div className="text-center">
                    {message.message}
                </div>
                <div className="flex justify-center">
                    <Button variant="secondary" className="cursor-pointer" onClick={() => router.back()} >Back</Button>
                </div>
            </div>
        </FormLayout>
    )
}