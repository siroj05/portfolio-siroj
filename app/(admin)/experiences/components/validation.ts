import { z } from "zod";

export const formSchema = z
  .object({
    id : z.string().optional(),
    position: z.string().min(1, "Position is required"),
    office: z.string().min(1, "Office is required"),
    start: z.string().min(1, "Start From is required"),
    end: z.string().optional(),
    present: z.boolean(),
    description: z.string().min(1, "Description is required"),
  })
  .superRefine((data, ctx) => {
    if (!data.present && !data.end) {
      ctx.addIssue({
        path: ["end"],
        code: z.ZodIssueCode.custom,
        message: "To is required",
      });
    }
    
    // validasi range date
    if (data.end && data.start > data.end) {
      ctx.addIssue({
        path: ["end"],
        code: z.ZodIssueCode.custom,
        message: "To date cannot be earlier than start from",
      });
    }
  });

export type FormData = z.infer<typeof formSchema>;
