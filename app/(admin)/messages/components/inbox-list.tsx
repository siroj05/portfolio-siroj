import { Mark, Messages } from "@/api/messages";
import { ResponseApi } from "@/api/type";
import { LoadingDots } from "@/components/loading/loadings";
import { Separator } from "@/components/ui/separator";
import { truncateText } from "@/hooks/use-truncate";
import Link from "next/link";

interface Props {
  data: ResponseApi<Messages[]> | undefined
  isMobile: boolean
  setMobileOpen: (open: boolean) => void
  onMark: (value: Mark) => void
  currentMessage: number
  isLoading: boolean
  isError: boolean
}

export default function InboxList({
  data,
  isMobile,
  setMobileOpen,
  onMark,
  currentMessage,
  isLoading,
  isError
}: Props) {
  return (
    <div className="flex flex-col max-[769px]:w-full min-[769px]:w-[30%] min-[769px]:min-w-[220px] min-[769px]:max-w-[350px] min-h-[calc(100vh-12rem)] border rounded-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Inbox</h2>
      </div>
      <Separator />
      {/* List message scrollable */}
      <div className="flex-1 overflow-auto max-h-[calc(100vh-16rem)]">
        {
          isLoading ?
            <div className="flex justify-center items-center h-[20vh]">
              <LoadingDots />
            </div> :
            isError ?
              <div className="flex items-center justify-center py-4">
                <p className="text-sm text-red-500">Failed to get messages</p>
              </div>
              :
              data?.data.length ? data?.data?.map((msg, idx) => {
                return (
                  <Link
                    key={msg.id}
                    onClick={() => {
                      if (isMobile) {
                        setMobileOpen(true);
                      }
                      if (!msg.isRead) {
                        onMark({ mark: true, id: msg.id! })
                      }
                    }}
                    href={`?msg=${msg.id}`}
                    className={`p-2 hover:dark:bg-zinc-800 hover:bg-zinc-200 border-t ${data?.data.length - 1 == idx && "border-b"} dark:border-zinc-800 ${msg.isRead ? "" : "bg-muted"} ${currentMessage == msg.id && "bg-zinc-200 dark:bg-zinc-800"} flex justify-between`}
                  >
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">{msg.createdAt}</div>
                      <div className="font-semibold">{truncateText(msg.email, 30)}</div>
                      <div className="text-sm">{truncateText(msg.message, 30)}</div>
                    </div>
                  </Link>
                );
              }) : (
                <div className="flex items-center justify-center py-4">
                  <p className="text-sm text-gray-500">No messages found</p>
                </div>
              )}
      </div>
    </div>
  );
}
