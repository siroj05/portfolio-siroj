"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Camera, LoaderCircle, Plus, Trash, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../../../components/ui/button"
import React, { useState } from "react"
import Image from "next/image"
import { v4 as uuidv4 } from 'uuid';
import { formSchema, FormData } from "./validation"
import { useCreateSkill } from "@/api/skills"
/*
  @note
  - card buat nambah skill
*/

interface Props {
  setOpen: (value: boolean) => void
}

export function CardsAdd({ setOpen }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [],
    },
  })

  const [file, setFile] = useState<any>()
  const [inputVal, setInputVal] = useState<string>()
  const { mutate, isPending } = useCreateSkill({
    onSuccess : () => {
      setOpen(false)
    }
  })

  const skills = watch("skills")
  const handleAddItem = () => {
    if (inputVal?.trim() != "" || file) {
      setValue("skills", [...skills, { id : uuidv4(), name: inputVal!, icon: file }])
      setFile(undefined)
      setInputVal("")
    }
  }

  const handleRemoveItem = (id : string) => {
    const newItem = skills.filter((item) => item.id != id)
    setValue("skills", newItem, {shouldValidate : true})
  }

  const onSubmit = (data: FormData) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-sm relative">
        <button onClick={() => setOpen(false)} type="button" className="absolute -right-2 -top-2 hover:text-red-500 rounded-full bg-zinc-700 p-1 cursor-pointer"><Trash className="w-5 h-5" /></button>
        <CardHeader>
          <Input
            {...register("category")}
            placeholder="Category.."
            className="border-none outline-none bg-card text-card-foreground font-semibold"
          />

        </CardHeader>

        <CardContent className="space-y-2 flex flex-col gap-2">
          {skills && skills.length > 0 && skills.map((item) => {
            return (
              <div className="flex w-full" key={item.id}>
                <div className="flex w-full gap-2 border py-1 px-2 rounded-xl hover:dark:bg-slate-800 hover:bg-slate-100">
                  <Image
                    src={URL.createObjectURL(item.icon)}
                    alt={"image"}
                    width={50}
                    height={50}
                  />
                  <p className="my-auto font-black">{item.name}</p>
                </div>
                <button onClick={() => handleRemoveItem(item.id)} className="hover:border rounded-lg cursor-pointer" type="button"><X/></button>
              </div>
            )
          })
          }
          <div className="flex">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="icon"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
            <label htmlFor="icon" className=" border-2 border-dashed border-gray-300 rounded-sm flex items-center justify-center cursor-pointer overflow-hidden">
              {
                file ? <Image
                  src={URL.createObjectURL(file)}
                  alt={"image"}
                  width={25}
                  height={25}
                /> :
                  <Camera className="w-8 h-8 text-gray-400" />
              }
            </label>
            <Input
              placeholder={`Add`}
              onChange={(e) => setInputVal(e.target.value)}
              value={inputVal}
            />
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={handleAddItem}
            >
              <Plus size={16} />
            </Button>
          </div>
          {errors.skills && (
            <p className="text-sm text-red-500">{errors.skills.message}</p>
          )}
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer transition duration-300" disabled={skills.length == 0 || isPending}>
            {
              isPending?
              <>
              <LoaderCircle/>
              Save 
              </>:
              "Save"
            }
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}