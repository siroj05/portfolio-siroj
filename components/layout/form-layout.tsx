import { ReactNode } from "react"

export const FormLayout = ({children}:{children : ReactNode}) => {
    return(
        <div className="bg-card border rounded-lg">
            <div className="max-w-2xl mx-auto my-5">
                {children}
            </div>
        </div>
    )
}