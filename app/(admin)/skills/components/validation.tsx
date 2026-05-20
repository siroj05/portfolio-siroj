import { z } from "zod"

export const ItemSchema = z.object({
  id : z.string().min(1, "id required"),
  name: z.string().min(1, "Option required"),
  icon: z.any(),
})

export const formSchema = z.object({
  category: z.string().min(1, "Category required"),
  skills: z.array(ItemSchema).min(1, "Minimum 1 option"),
})

export type FormData = z.infer<typeof formSchema>