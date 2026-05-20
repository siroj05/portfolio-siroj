import { z } from "zod"

export const formSchema = z.object({
    id : z.string().optional(),
    image: z.any().optional()
        .refine((files) => !files || files.length === 0 || files?.[0]?.size <= 2 * 1024 * 1024, "Maks image size 2MB")
        .refine((files) => !files || files.length === 0 || ["image/jpeg", "image/png"].includes(files?.[0]?.type), "Format should be JPG or PNG"),
    title: z.string().min(1, "Title required"),
    description: z.string().min(1, "Description required"),
    techStack: z.string().min(1, "Tech Stack required"),
    demoUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    filePath : z.string().optional()
})

export type FormData = z.infer<typeof formSchema>;