import { z } from "zod";

export const formSchema = z.object({
    id: z.string().optional(),
    userId : z.number().optional(),
    image: z.any().optional()
        .refine((files) => !files || files.length === 0 || files?.size <= 5 * 1024 * 1024, "Maks image size 5MB")
        .refine((files) => !files || files.length === 0 || ["image/jpeg", "image/png"].includes(files?.type), "Format should be JPG or PNG"),
    fullName : z.string().min(1, "Full name is required").max(50, "Cannot exceed 50 character"),
    jobTitle : z.string().min(1, "Job title is required").max(50, "Cannot exceed 50 character"),
    email : z.email().min(1, "Email is required").max(50, "Cannot exceed 50 character"),
    linkedin : z.string().min(1, "Linkedin is required").max(50, "Cannot exceed 50 character"),
    repository : z.string().min(1, "Repository is required").max(50, "Cannot exceed 50 character"),
    about : z.string().min(1, "About is required").max(50, "Cannot exceed 50 character"),
    phoneNumber : z.string().min(1, "Phone number is required").max(15, "Cannot exceed 15 character"),
    location : z.string().min(1, "Location is required").max(50, "Cannot exceed 50 character")
})

export type FormData = z.infer<typeof formSchema>