import { Messages } from "@/api/messages/type";
import { ResponseApi } from "@/api/type";
import { Separator } from "@/components/ui/separator";
import { truncateText } from "@/hooks/use-truncate";
import Link from "next/link";

interface Props {
  data : ResponseApi<Messages[]> | undefined
  isMobile : boolean
  setMobileOpen : (open: boolean) => void
}

export default function InboxList({
  data,
  isMobile,
  setMobileOpen
}:Props) {
  return (
    <div className="flex flex-col max-[769px]:w-full min-[769px]:w-[30%] min-[769px]:min-w-[220px] min-[769px]:max-w-[350px] min-h-[calc(100vh-12rem)] border rounded-lg">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Inbox</h2>
      </div>
      <Separator />
      {/* List message scrollable */}
      <div className="flex-1 overflow-auto p-2 space-y-4 max-h-[calc(100vh-16rem)]">
        {data?.data.length? data?.data?.map((msg, idx) => {
          return (
            <div
              key={idx}
              className="rounded p-2 bg-muted flex justify-between"
            >
              <Link onClick={()=>{
                if(isMobile){
                  setMobileOpen(true);
                }
              }} href={`?msg=${msg.id}`} className="flex-1 ">
                <div className="text-xs text-gray-500">{msg.createdAt}</div>
                <div className="font-semibold">{msg.email}</div>
                <div className="text-sm">{truncateText(msg.message, 30)}</div>
              </Link>
            </div>
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
