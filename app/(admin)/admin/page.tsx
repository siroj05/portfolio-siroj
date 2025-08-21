"use client"
import { useGetAllMessages } from "@/api/messages";
import CardDashboard from "@/components/card/card-dashboard";
import { Briefcase, Inbox, UserStar } from "lucide-react";

export default function Admin() {
    const { data, isError, isLoading } = useGetAllMessages()
    const countMsg = !isError ? data?.data.length : isLoading ? 0 : data?.data.length

    return (
        <div>
            <h1 className="font-bold text-xl">Admin Dashboard</h1>

            {/* Total projects */}

            <div className="my-5 flex gap-2">
                <CardDashboard
                    title="Total Projects"
                    desc="Manage projects on the Projects page."
                    link="/projects"
                    labelBtn="Manage Project"
                    total={0}
                    icon={
                        <Briefcase className="w-4 h-4 my-auto text-zinc-500" />
                    }
                />
                <CardDashboard
                    title="Inbox"
                    desc="Manage messages on the messages page."
                    link="/messages"
                    labelBtn="View Messages"
                    total={countMsg!}
                    icon={
                        <Inbox className="w-4 h-4 my-auto text-zinc-500" />
                    }
                />
                <CardDashboard
                    title="Experiences"
                    desc="Manage experiences on the experiences page."
                    link="/experiences"
                    labelBtn="Manage Experiences"
                    total={0}
                    icon={
                        <UserStar className="w-4 h-4 my-auto text-zinc-500" />
                    }
                />
            </div>
        </div>
    )
}