"use client"
import { GetAllMessages } from "@/api/messages/messages";
import { Messages } from "@/api/messages/type";
import { ResponseApi } from "@/api/type";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { truncateText } from "@/hooks/use-truncate";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck, Inbox, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/*
 * Komponen untuk menampilkan pesan
 * Terdiri dari dua bagian: Inbox dan Read
 */

export default function MessagesPage() {

  const searchParams = useSearchParams()
  const searchMsg = searchParams.get("msg")
  const { data, isError, isLoading } = useQuery<ResponseApi<Messages[]>>({queryKey : ['messages'], queryFn : GetAllMessages})
  /*
   * Mendapatkan pesan yang dipilih
   * Next nya penerapan isError & isLoading
   */
  const selectedMessage = data?.data.find(msg => msg.id === parseInt(searchMsg || "0"))
  
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
                {data?.data?.map((msg, idx) => (
                  <div key={idx} className="rounded p-2 bg-muted flex justify-between">
                    <Link href={`?msg=${msg.id}`} className="flex-1 ">
                      <div className="text-xs text-gray-500">{msg.createdAt}</div>
                      <div className="font-semibold">{msg.email}</div>
                      <div className="text-sm">{truncateText(msg.message, 30)}</div>
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
                          <div className="text-xs text-gray-500">{selectedMessage.createdAt}</div>
                        </div>
                      </div>
                      <Button variant="destructive" className="cursor-pointer">
                        <Trash2/>
                        Delete
                      </Button>
                    </div>
                    <Separator className="my-4"/>
                    <div className="mt-2">{selectedMessage.message}</div>
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
