"use client"

import ThemeToggleButton from "@/components/themeToggleBtn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"

const formSchema = z.object({
    email : z.email().min(1, "Email required"),
    password : z.string().min(1, "Password required")
})

type formData = z.infer<typeof formSchema>

export default function Login(){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<formData>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = (data : formData) => {
        console.log(data)
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
                            <Label htmlFor="email">Email</Label>
                            <div>
                                <Input {...register("email")} id="email" type="email" className="dark:bg-black bg-white"/>
                                <p className="text-red-500 text-sm">{errors.email?.message}</p>    
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div>
                                <Input {...register("password")} id="password" type="password" className="dark:bg-black bg-white"/>
                                <p className="text-red-500 text-sm">{errors.password?.message}</p>
                            </div>
                        </div>
                        <Button className="w-full mt-5 cursor-pointer">Login</Button>
                    </form>
                </div>
            </div>
        </>
    )
}