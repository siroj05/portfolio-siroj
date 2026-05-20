"use client"

import { FormLayout } from "@/components/layout/form-layout"
import { Skeleton } from "@/components/ui/skeleton"

export const LoadingForm = () => {
    return (
        <FormLayout>
            <div className="space-y-2">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
                <div className="flex justify-end">
                    <Skeleton className="h-6 w-[100px]" />
                </div>
            </div>
        </FormLayout>
    )
}