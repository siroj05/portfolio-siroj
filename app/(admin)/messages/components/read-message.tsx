"use client"
import { Messages } from "@/api/messages/type";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Inbox, Trash2 } from "lucide-react";

interface Props {
  selectedMessage: Messages | undefined
  setOpen: (open: boolean) => void
  setGetId: (id: number) => void
}

export default function ReadMessage({ 
  selectedMessage,
  setOpen,
  setGetId
}: Props) {
  return (
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
                    {selectedMessage.email.split("")[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{selectedMessage.email}</div>
                    <div className="text-xs text-gray-500">
                      {selectedMessage.createdAt}
                    </div>
                  </div>
                </div>
                <Button onClick={() => {
                  setOpen(true);
                  setGetId(selectedMessage.id!);
                }} variant="destructive" className="cursor-pointer">
                  <Trash2 />
                  Delete
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="mt-2">{selectedMessage.message}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Inbox className="text-gray-600" />
              <p className="text-sm text-gray-600">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
