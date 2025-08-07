import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
    id ? : string
    category : string
    option : string[]
}

export function Cards(
    {id, category, option}:Props
) {
  return (
    <Card className="w-full max-w-sm">
        {/* 
            @Note
            - Card bisa di delete, tambahin btn delete 
        */}
      <CardHeader>
        {/* Kategory nya */}
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {/* 
            @Note looping data skill disini akan ada btn edit / delete buat data
        */}
        
        {
            option.map((o) => (
                <div key={o} className="border rounded-lg p-2">
                    {o}
                </div>
            ))
        }
       
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {/* 
            @NOTE
            - Disini buat add kalau ada skill baru next dibuat button Add
        */}
      </CardFooter>
    </Card>
  )
}