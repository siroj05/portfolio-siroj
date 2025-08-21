import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CircleUser, CodeXml, FolderOpen, Gauge, Mail, SquareArrowOutUpRight, UserStar } from "lucide-react"
import Link from "next/link"
import { NavUser } from "./nav-user"
import { Separator } from "../ui/separator"
import { usePathname } from "next/navigation"
import { Badge } from "../ui/badge"
import { useGetAllMessages } from "@/api/messages"

const menu = [
    {
        menuItem: "Dashboard",
        icon: Gauge,
        url: "/admin"
    },
    {
        menuItem: "Skills",
        icon: CodeXml,
        url: "/skills"
    },
    {
        menuItem: "Projects",
        icon: FolderOpen,
        url: "/projects"
    },
    {
        menuItem: "Experiences",
        icon: UserStar,
        url: "/experiences"
    },
    {
        menuItem: "Messages",
        icon: Mail,
        url: "/messages"
    }
]

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const params = usePathname()
    const { data, isError, isLoading } = useGetAllMessages()
    const countUnread = !isError ? data?.data.filter((msg) => msg.isRead == false).length : isLoading ? 0 : data?.data.filter((msg) => msg.isRead == false).length

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="font-bold">
                            <CircleUser />
                            <span>Portfolio Management</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>

                            {/* menu looping disini */}
                            {
                                menu.map((item) => {
                                    if (item.menuItem == "Messages") {
                                        return (
                                            <SidebarMenuItem className={`${params.includes(item.url) && "dark:bg-zinc-800 bg-zinc-200 rounded-sm"} `} key={item.menuItem}>
                                                <SidebarMenuButton asChild>
                                                    <Link href={item.url} className="relative">
                                                        <Badge
                                                            className="absolute right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                                                            variant="destructive"
                                                        >
                                                            {countUnread}
                                                        </Badge><item.icon />
                                                        <span>{item.menuItem}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    }
                                    return (
                                        <SidebarMenuItem className={`${params.includes(item.url) && "dark:bg-zinc-800 bg-zinc-200 rounded-sm"} `} key={item.menuItem}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url}>
                                                    <item.icon />
                                                    <span>{item.menuItem}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }

                            <Separator className="my-5" />

                            {/* view portfolii */}
                            <SidebarMenuItem>
                                <SidebarMenuButton className="dark:bg-primary bg-zinc-200 hover:bg-zinc-300 dark:hover:bg-white dark:text-slate-600" asChild>
                                    <Link href={"/portfolio"} className="flex justify-between" target="_blank">
                                        View
                                        <SquareArrowOutUpRight />
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    name: "Siroojuddin Apendi",
                    email: "rojudin123@gmail.com",
                    avatar: "/siroj.png",
                }} />
            </SidebarFooter>
        </Sidebar>
    )
}