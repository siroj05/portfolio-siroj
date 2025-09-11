import { z } from "zod"

export const ItemSchema = z.object({
  id : z.string().min(1, "id required"),
  name: z.string().min(1, "Option required"),
  image: z
    .any()
    .refine((files) => files?.length > 0, "Image is required")
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, "Maks image size 2MB")
    .refine((files) => ["image/jpeg", "image/png"].includes(files?.[0]?.type), "Format should be JPG or PNG"),
})

export const formSchema = z.object({
  category: z.string().min(1, "Category required"),
  items: z.array(ItemSchema).min(1, "Minimum 1 option"),
})

export type FormData = z.infer<typeof formSchema>