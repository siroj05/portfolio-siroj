import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { EllipsisVertical, SquarePen } from "lucide-react"

export default function PopoverAction() {
    return (
        <Popover>
            <PopoverTrigger><EllipsisVertical /></PopoverTrigger>
            <PopoverContent className="w-[100px]">
                <button className="flex gap-2"><SquarePen />Edit</button>
            </PopoverContent>
        </Popover>
    )
}