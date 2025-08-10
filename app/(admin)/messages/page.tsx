"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTruncate } from "@/hooks/use-truncate";
import { CheckCheck, Inbox, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/*
 * Komponen untuk menampilkan pesan
 * Terdiri dari dua bagian: Inbox dan Read
 */

/*
 * Variable messages data dummy
 * Nextnya messages diambil dari backend 
 */
const messages = [
  {
    uuid : 1,
    email: "user1@email.com",
    content: "Halo, saya ingin bertanya tentang portfolio Anda.",
    time: "2025-08-10 10:00",
  },
  {
    uuid : 2,
    email: "user2@email.com",
    content: "Bagaimana cara menghubungi Anda?",
    time: "2025-08-10 11:15",
  },
  {
    uuid : 3,
    email: "user3@email.com",
    content: "Proyek Anda sangat menarik!",
    time: "2025-08-10 12:30",
  },
  {
    uuid : 4,
    email: "user3@email.com",
    content: "Proyek Anda sangat menarik!",
    time: "2025-08-10 12:30",
  },
];

export default function Messages() {

  const searchParams = useSearchParams()
  const searchMsg = searchParams.get("msg")
  /*
   * Mendapatkan pesan yang dipilih
   */
  const selectedMessage = messages.find(msg => msg.uuid === parseInt(searchMsg || "0"))
  // console.log(selectedMessage)
  return (
    <div className="bg-card border rounded-lg min-h-[calc(100vh-6rem)]">
      <div className="bg-card">
        <div className="p-4 flex justify-between gap-10">
          <h1 className="text-lg my-auto font-semibold">Messages</h1>
          
          {/*Belum butuh input search nextnya mungkin*/}
          {/* <Input className="w-[400px]" placeholder="Search message.." /> */}
          
          <div className="space-x-2">
            <Button className="cursor-pointer">
              <CheckCheck /> Mark all as read
            </Button>
            <Button className="cursor-pointer" variant="destructive">
              <Trash2 /> Delete all messages
            </Button>
          </div>
        </div>
        <Separator />
      </div>

      {/* 
        body
      */}
      <div className="flex flex-1 p-2 gap-4">
          {/* Inbox */}
          <div className="flex flex-col w-[30%] min-w-[220px] max-w-[350px] min-h-[calc(100vh-12rem)] border rounded-lg">
            <div className="p-4">
              <h2 className="text-lg font-semibold">Inbox</h2>
            </div>
            <Separator />
            {/* List message scrollable */}
              <div className="flex-1 overflow-auto p-2 space-y-4 max-h-[calc(100vh-16rem)]">
                {messages.map((msg, idx) => (
                  <div key={idx} className="rounded p-2 bg-muted flex justify-between">
                    <Link href={`?msg=${msg.uuid}`} className="flex-1 ">
                      <div className="text-xs text-gray-500">{msg.time}</div>
                      <div className="font-semibold">{msg.email}</div>
                      <div className="text-sm">{useTruncate(msg.content, 30)}</div>
                    </Link>
                    <Button variant="destructive" className="cursor-pointer" size="sm">
                      <Trash2/>
                    </Button>
                  </div>
                ))}
              </div>
          </div>

          {/* Read Message */}
          <div className="flex-1 h-full">
            <div className="border rounded-lg overflow-auto flex flex-col h-full">
              <div className="p-4">
                <h2 className="text-lg font-semibold">Read Message</h2>
              </div>
              <Separator />
              <div className="p-4 flex-1">
                {selectedMessage ? (
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <div className=" py-2 px-4 bg-card rounded-full">
                          {selectedMessage.email.split('')[0]}
                        </div>
                        <div>
                          <div className="font-semibold">{selectedMessage.email}</div>
                          <div className="text-xs text-gray-500">{selectedMessage.time}</div>
                        </div>
                      </div>
                      <Button variant="destructive" className="cursor-pointer">
                        <Trash2/>
                        Delete
                      </Button>
                    </div>
                    <Separator className="my-4"/>
                    <div className="mt-2">{selectedMessage.content}</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Inbox className="text-gray-600"/>
                    <p className="text-sm text-gray-600">
                      Select a message to read
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
