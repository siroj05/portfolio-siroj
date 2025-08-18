"use client"

import ThemeToggleButton from "@/components/themeToggleBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthLogin } from "@/api/auth";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
    name : z.string().min(1, "Name required"),
    password : z.string().min(1, "Password required")
})

type formData = z.infer<typeof formSchema>

export default function Login(){
    const router = useRouter();
    const [serverError, setServerError] = useState("");
    const [loading, setIsLoading] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<formData>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (data : formData) => {
        setIsLoading(true)
        setIsDisable(true)
        try {
            await AuthLogin(data)
            toast.success("Login success")
            router.push("/admin")
        } catch (error : any) {
            toast.error(`Login failed : ${error}`)
            setServerError(error.message)
            setIsDisable(false)
        } finally{
            setIsLoading(false)
        }   
    }

    return(
        <>
            <nav className="w-full flex justify-end top-0 fixed">
                <div className="mx-10 mt-2">
                    <ThemeToggleButton/>
                </div>
            </nav>
            <div className="w-full h-screen flex justify-center items-center border">
                <div className="border p-5 w-[350px] rounded-lg dark:bg-zinc-900 bg-zinc-100 space-y-10 shadow-xl">
                    <h1 className="text-center font-bold text-3xl mt-3">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div>
                                <Input {...register("name")} id="username" type="username" className="dark:bg-black bg-white"/>
                                <p className="text-red-500 text-sm">{errors.name?.message}</p>    
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div>
                                <Input {...register("password")} id="password" type="password" className="dark:bg-black bg-white"/>
                                <p className="text-red-500 text-sm">{errors.password?.message}</p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Button className="w-full mt-5 cursor-pointer transition duration-300" disabled={isDisable}>
                                {   loading?
                                    <LoaderCircle className="animate-spin"/>:
                                    "Login"    
                                }
                            </Button>
                            <p className="text-xs text-red-500">
                                {serverError}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}