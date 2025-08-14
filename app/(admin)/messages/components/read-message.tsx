"use client"
import { Messages } from "@/api/messages/type";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Inbox, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
interface DesktopProps {
  selectedMessage: Messages | undefined
  setOpen: (open: boolean) => void
  setGetId: (id: number) => void
}

// desktop size
export function ReadMessage({
  selectedMessage,
  setOpen,
  setGetId
}: DesktopProps) {
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

interface MobileProps {
  selectedMessage: Messages | undefined
  setOpen: (open: boolean) => void
  setGetId: (id: number) => void
  setMobileOpen: (value: boolean) => void
  mobileOpen : boolean
  clearParams : () => void
}
// mobile size
export function ReadMessageMobile({
  selectedMessage,
  setOpen,
  setGetId,
  setMobileOpen,
  mobileOpen,
  clearParams
}: MobileProps) {
  return (
    <Sheet
      open={mobileOpen && !!selectedMessage}
      onOpenChange={(e) => {
        setMobileOpen(e);
        clearParams()
      }}
    >
      <SheetContent side="bottom" className="bg-card h-[90%] p-2">
        <div className="flex h-full flex-col">
          <SheetTitle className="text-base flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback>
                {selectedMessage?.email.split("")[0]}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">
              {selectedMessage?.email}
            </span>
          </SheetTitle>
          <Separator className="my-2" />
          <div className="p-2">
            <p className="text-sm dark:text-zinc-300">
              Received : {selectedMessage?.createdAt}
            </p>
          </div>
          <Separator className="my-2" />

          <div className="p-2">
            <p>{selectedMessage?.message}</p>
          </div>
        </div>
        <div className="sticky bottom-0 border-t p-2">
          <Button onClick={() => {
            setOpen(true);
            setGetId(selectedMessage!.id!);
          }} variant="outline"><Trash2 className="text-red-500" />Delete</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}