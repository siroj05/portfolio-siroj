import { ReactNode } from "react"

export const FormLayout = ({children}:{children : ReactNode}) => {
    return(
        <div className="bg-card border rounded-lg max-md:p-2">
            <div className="max-w-2xl mx-auto my-5">
                {children}
            </div>
        </div>
    )
}