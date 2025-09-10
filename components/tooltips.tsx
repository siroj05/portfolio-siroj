import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ReactNode } from "react"

interface Props {
    trigger : ReactNode
    content? : ReactNode
}

export function Tooltips({trigger, content}:Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {trigger}
      </TooltipTrigger>
      <TooltipContent className="w-[200px]">
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
