import { z } from "zod";

export const formSchema = z.object({
    id: z.string().optional(),
    image: z.any().optional()
        .refine((files) => !files || files.length === 0 || files?.[0]?.size <= 2 * 1024 * 1024, "Maks image size 2MB")
        .refine((files) => !files || files.length === 0 || ["image/jpeg", "image/png"].includes(files?.[0]?.type), "Format should be JPG or PNG"),
    fullName : z.string().min(1, "Full name is required"),
    jobTitle : z.string().min(1, "Job title is required"),
    email : z.email().min(1, "Email is required"),
    linkedin : z.string().min(1, "Linkedin is required"),
    repository : z.string().min(1, "Repository is required"),
    about : z.string().min(1, "About is required")
})

export type FormData = z.infer<typeof formSchema>