"use client";

import { AlertDialogDelete } from "@/components/dialog/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCheck, LoaderCircle, Trash2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import InboxList from "./inbox-list";
import {ReadMessage, ReadMessageMobile} from "./read-message";
import { useIsMobile } from "@/hooks/use-mobile";
import { Mark, useDeleteMessage, useGetAllMessages, useMarkAllMessages, useMarkMessage } from "@/api/messages";
import { Spinner } from "@/components/ui/minimal-tiptap/components/spinner";

/*
 * Komponen untuk menampilkan pesan
 * Terdiri dari dua bagian: Inbox dan Read
 */

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const searchMsg = searchParams.get("msg");
  const [open, setOpen] = useState(false);
  const [getId, setGetId] = useState(0);
  const router = useRouter();
  const isMobile = useIsMobile(769);
  const [mobileOpen, setMobileOpen] = useState(false);

  // clear params query setelah action
  const clearParams = () => {
    router.push("/messages")
  }

  // hit api get all message
  const { data, isError, isLoading } = useGetAllMessages()
  // find data which isread false
  const findIsRead = data?.data.find((msg) => msg.isRead == false)

  // hit api delete message
  const { mutate, isPending } = useDeleteMessage({
    onSuccess: () => {
      setOpen(false);
      toast.success("Message Deleted");
      clearParams()
    },
    onError: (err) => {
      toast.error(`Error : ${err.message}`);
    },
  })

  // handle delete function
  const onDelete = (id: number) => {
    mutate(id);
  };

  // hit api mark message
  const {mutate:mark} = useMarkMessage({
    onError: (err) => {
      toast.error(`Error : ${err.message}`)
    }
  })

  // handle mark message
  const onMark = (markMessage:Mark) => {
    mark(markMessage)
  }

  // hit api marked all messages
  const {mutate:markAll, isPending:markPending} = useMarkAllMessages()

  // handle marked all messages
  const onMarkAll = () => {
    markAll()
  }

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
              <Button onClick={onMarkAll} disabled={!!!findIsRead? true : markPending} className="cursor-pointer max-[537px]:w-full">
                {
                  markPending? 
                  <Spinner className="animate-spine"/> :
                  <CheckCheck /> 
                }
                Mark all as read
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
            onMark={onMark}
            currentMessage={Number(searchMsg)}
          />

          {/* Read Message */}
          {isMobile ? (
            <ReadMessageMobile
              selectedMessage={selectedMessage}
              setOpen={setOpen}
              setGetId={setGetId}
              setMobileOpen={setMobileOpen}
              mobileOpen={mobileOpen}
              clearParams={clearParams}
            />
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
