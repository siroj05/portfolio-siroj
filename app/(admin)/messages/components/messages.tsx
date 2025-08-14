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
import {ReadMessage, ReadMessageMobile} from "./read-message";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const clearParams = () => {
    router.push("/messages")
  }

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
      clearParams()
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
