
import { DatePicker } from "@/components/date-picker";
import { FormLayout } from "@/components/layout/form-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MinimalTiptapEditor from "@/components/ui/minimal-tiptap/minimal-tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormData, formSchema } from "./validation";
import { useEffect } from "react";
import { ResponseApi } from "@/api/type";
import { Experiences } from "@/api/experiences";

interface Props {
  onSubmit: (data: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  experience?: ResponseApi<Experiences>;
}

export default function FormExperience({
  onSubmit,
  isPending,
  isSuccess,
  experience
}: Props) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      present: false,
    },
  });

  const desc = watch("description");
  const startFrom = watch("start");
  const to = watch("end");
  const present = watch("present");

  useEffect(() => {
    if (experience?.data) {
      reset({
        id : experience.data.id,
        position: experience.data.position,
        office: experience.data.office,
        start: experience.data.start,
        end: experience.data.end,
        description: experience.data.description 
        ? experience.data.description 
        : JSON.stringify(null),
        present : experience.data.present
      });
    }
  }, [experience?.data, reset]);
  
  return (
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="title">Position</Label>
          <div>
            <Input
              {...register("position")}
              id="title"
              placeholder="Position..."
            />
            <p className="text-sm text-red-500 font-light">
              {errors.position?.message}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="office">Office</Label>
          <div>
            <Input
              {...register("office")}
              id="office"
              placeholder="Office..."
            />
            <p className="text-sm text-red-500 font-light">
              {errors.office?.message}
            </p>
          </div>
        </div>
        <div className="flex gap-5 max-sm:flex-col">
          <div className="flex flex-col space-y-2">
            <Label>Start From</Label>
            <div>
              <DatePicker setValue={setValue} value={startFrom} state="start" />
              {/* 
                @Note
                  - Kena invalid input
              */}
              <p className="text-sm text-red-500 font-light">
                {errors.start?.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Label>To</Label>
            <div>
              <DatePicker
                setValue={setValue}
                value={to}
                state="end"
                readonly={present}
              />
              <p className="text-sm text-red-500 font-light">
                {errors.end?.message}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="present"
              checked={present}
              onCheckedChange={(checked) => {
                setValue("present", Boolean(checked));
                setValue("end", undefined);
              }}
            />
            <Label htmlFor="present">Present</Label>
          </div>
        </div>
        {/* 
                    @Note
                    - source : https://github.com/Aslam97/shadcn-minimal-tiptap
                */}
        <MinimalTiptapEditor
          value={desc ? JSON.parse(desc) : null}
          onChange={(value) => setValue("description", JSON.stringify(value))}
          className="w-full"
          editorContentClassName="p-5"
          output="html"
          placeholder="Enter your description..."
          autofocus={false}
          editable={true}
          editorClassName="focus:outline-hidden"
        />
        <div className="flex justify-end">
          <Button className="cursor-pointer" disabled={isPending || isSuccess}>
            {isPending || isSuccess ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
