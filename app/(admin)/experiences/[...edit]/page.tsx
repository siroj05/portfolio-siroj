"use client"

import { useParams } from "next/navigation"

export default function ExperienceDetail(){
    const params = useParams()
    const id = params?.edit?.[1]
    console.log(id)
    return (
        <div>
            Detail
        </div>
    )
}