"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UseFormSetValue } from "react-hook-form"
import { format } from "date-fns"

interface DateProps {
  setValue: UseFormSetValue<any>
  value?: string
  state: string
  readonly?: boolean
}

export function DatePicker({
  setValue,
  value,
  state,
  readonly = false
}: DateProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
            disabled={readonly}
          >
            {value ? format(value, "dd/MM/yyyy") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : new Date()}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (date) {
                const formatted = format(date, "yyyy-MM-dd") // simpan sebagai string
                setValue(state, formatted)
                setOpen(false)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
