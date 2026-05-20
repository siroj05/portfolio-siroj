import { FormLayout } from "@/components/layout/form-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
    return (
        <FormLayout>
            <div className="flex flex-col space-y-5">
                <div className="space-y-5">
                    <Skeleton className="h-8 w-[150px]" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <Skeleton className="h-[150px] w-full rounded-xl" />
            </div>
        </FormLayout>
    )
}