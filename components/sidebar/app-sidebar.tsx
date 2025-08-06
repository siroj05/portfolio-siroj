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
import { CircleUser, CodeXml, FolderOpen, Gauge, Mail, UserStar } from "lucide-react"
import Link from "next/link"
import { NavUser } from "./nav-user"

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
                                menu.map((item) => (
                                    <SidebarMenuItem key={item.menuItem}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.menuItem}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    name: "Siroojuddin Apendi",
                    email: "rojudin123@gmail.com",
                    avatar: "/siroj.png",
                }}/>
            </SidebarFooter>
        </Sidebar>
    )
}