import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { item } from "@/api/skills";
import { Trash2 } from "lucide-react";

interface Props {
  id?: string;
  category: string;
  option: item[];
  setGetId: (id: string) => void;
  setOpenAlert: (open: boolean) => void;
}

export function Cards({ id, category, option, setGetId, setOpenAlert }: Props) {
  return (
    <Card className="w-full max-w-sm">
      {/* 
            @Note
            - Card bisa di delete, tambahin btn delete 
        */}
      <CardHeader className="flex justify-between relative">
        {/* Kategory nya */}
        <CardTitle>{category}</CardTitle>
        <div className="bg-muted rounded-full p-1 absolute -right-2 -top-8">
          <Trash2
            onClick={() => {
              setGetId(id!);
              setOpenAlert(true);
            }}
            className=" cursor-pointer text-red-500 hover:scale-105 "
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {/* 
            @Note looping data skill disini akan ada btn edit / delete buat data
        */}

        {option.map((o) => (
          <div key={o.id} className="border rounded-lg p-2 flex gap-1">
            <Image src={o.icon} alt={o.name} width={25} height={25} />
            <p>{o.name}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {/* 
            @NOTE
            - Disini buat add kalau ada skill baru next dibuat button Add
        */}
      </CardFooter>
    </Card>
  );
}
