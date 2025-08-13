"use client";
import { DeleteMessage, GetAllMessages } from "@/api/messages/messages";
import { Messages } from "@/api/messages/type";
import { ResponseApi } from "@/api/type";
import { AlertDialogDelete } from "@/components/dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCheck, LoaderCircle, Trash2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import InboxList from "./inbox-list";
import ReadMessage from "./read-message";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/*
 * Komponen untuk menampilkan pesan
 * Terdiri dari dua bagian: Inbox dan Read
 */

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const searchMsg = searchParams.get("msg");
  const [open, setOpen] = useState(false);
  const [getId, setGetId] = useState(0);
  const queryClient = useQueryClient();
  const router = useRouter();
  const isMobile = useIsMobile(769);
  const [mobileOpen, setMobileOpen] = useState(false);
  // hit api get all message
  const { data, isError, isLoading } = useQuery<ResponseApi<Messages[]>>({
    queryKey: ["messages"],
    queryFn: GetAllMessages,
  });

  // hit api delete message
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id: number) => DeleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setOpen(false);
      toast.success("Message Deleted");
      router.push("/messages");
    },
    onError: (err) => {
      toast.error(`Error : ${err.message}`);
    },
  });

  const onDelete = (id: number) => {
    mutate(id);
  };

  /*
   * Mendapatkan pesan yang dipilih
   * Next nya penerapan isError & isLoading
   */
  const selectedMessage = data?.data.find(
    (msg) => msg.id === parseInt(searchMsg || "0")
  );

  return (
    <>
      <div className="bg-card border rounded-lg min-h-[calc(100vh-6rem)]">
        <div className="bg-card">
          <div className="p-4 flex justify-between max-[537px]:flex-col gap-10">
            <h1 className="text-lg my-auto font-semibold">Messages</h1>
            <div className="space-x-2 max-[537px]:flex-col max-[537px]:flex max-[537px]:space-y-2">
              <Button className="cursor-pointer max-[537px]:w-full">
                <CheckCheck /> Mark all as read
              </Button>
              <Button className="cursor-pointer max-[537px]:w-full" variant="destructive">
                <Trash2 /> Delete all messages
              </Button>
            </div>
          </div>
          <Separator />
        </div>

        {/* Inbox and Read Message */}
        <div className="flex flex-1 p-2 gap-4">
          {/* Inbox */}
          <InboxList
            data={data}
            isMobile={isMobile}
            setMobileOpen={setMobileOpen}
          />

          {/* Read Message */}
          {isMobile ? (
            // sheet ini di refactor
            <Sheet
              open={mobileOpen && !!selectedMessage}
              onOpenChange={(e) => {
                setMobileOpen(e);
                router.push("/messages");
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
                  }} variant="outline"><Trash2 className="text-red-500"/>Delete</Button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <ReadMessage
              selectedMessage={selectedMessage}
              setOpen={setOpen}
              setGetId={setGetId}
            />
          )}
        </div>
      </div>

      <AlertDialogDelete
        open={open}
        onOpenChange={setOpen}
        footer={
          <>
            <Button className="cursor-pointer" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => onDelete(getId)}
              disabled={isPending}
              variant="destructive"
            >
              {isPending ? <LoaderCircle className="animate-spin" /> : "Delete"}
            </Button>
          </>
        }
      />
    </>
  );
}
