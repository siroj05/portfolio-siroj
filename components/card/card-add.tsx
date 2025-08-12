"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "../ui/input"
import { Camera, Plus, Trash, X } from "lucide-react"
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { useState } from "react"
import Image from "next/image"
/*
  @note
  - card buat nambah skill
*/

interface Props {
  setOpen : (value : boolean) => void
}

const ItemSchema = z.object({
  name: z.string().min(1, "Option required"),
  image: z
    .any()
    .refine((files) => files?.length > 0, "Image is required")
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, "Maks image size 2MB")
    .refine((files) => ["image/jpeg", "image/png"].includes(files?.[0]?.type), "Format should be JPG or PNG"),
})

const formSchema = z.object({
  category : z.string().min(1, "Category required"),
  items: z.array(ItemSchema).min(1, "Minimum 1 option"),
})

type FormData = z.infer<typeof formSchema>

export function CardsAdd({setOpen}:Props) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [{ name: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const [preview, setPreview] = useState<string | null>(null);

  /*
    @Note
    *Fungsi handle untuk upload image
  */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setValue(`items.${index}.image`, file); // simpan file ke react-hook-form
    }
  };

  /*
    @note
    - fungsi onSubmit nantinya hit ke api save category
  */
  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-sm relative">
        <button onClick={() => setOpen(false)} type="button" className="absolute -right-2 -top-2 hover:text-red-500 rounded-full bg-zinc-700 p-1 cursor-pointer"><Trash className="w-5 h-5"/></button>
        <CardHeader>
          <Input
            {...register("category")}
            placeholder="Category.."
            className="border-none outline-none bg-card text-card-foreground font-semibold"
          />
          
        </CardHeader>

        <CardContent className="space-y-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex gap-1"
            >
              <input
                id={`image-upload-${index}`}
                type="file"
                accept="image/*"
                {...register(`items.${index}.image`)}
                className="hidden"
                onChange={(e) => handleImageChange(e, index)}
              />
              <label htmlFor={`image-upload-${index}`} className=" border-2 border-dashed border-gray-300 rounded-sm flex items-center justify-center cursor-pointer overflow-hidden">
                {preview ? <Image
                  src={preview}
                  alt={preview}
                  width={25}
                  height={25}
                />
                  :
                  <Camera className="w-8 h-8 text-gray-400"/>
              }
              </label>

              <Input
                placeholder={`Option ${index + 1}`}
                {...register(`items.${index}.name`)}
              />
              <Button
                type="button"
                onClick={() => remove(index)}
                variant="destructive"
              >
                <Trash size={16} />
              </Button>
            </div>
          ))}
          {errors.items && (
            <p className="text-sm text-red-500">{errors.items.message}</p>
          )}
          <Button
            type="button"
            onClick={() => append({ name: "", image : "" })}
            variant="secondary"
            className="w-full"
          >
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button onClick={() => setOpen(false)} type="submit" className="w-full cursor-pointer">
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
