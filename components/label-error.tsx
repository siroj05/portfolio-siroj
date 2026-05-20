import { ReactNode } from "react"

export const LabelError = ({children}:{children:ReactNode}) => {
    return <p className="text-red-500 text-[11px]">{children}</p> 
}