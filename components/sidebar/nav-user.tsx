"use client"

import { GetMeModel, useGetMe, useLogout } from "@/api/auth"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { CircleUserRound, EllipsisVertical, Power } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "../ui/skeleton"
import { useGetProfile } from "@/api/profile"

export function NavUser({
  userData,
}: {
  userData : GetMeModel
}) {
  const { isMobile } = useSidebar()

  // pendingnya manfaatin
  const { mutate, isPending } = useLogout()
  const onLogout = () => {
    mutate()
  }

  const { data:user, isLoading, isFetched, isFetching } = useGetProfile(userData.id)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user?.data.imagePath} alt={user?.data.fullName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.data.fullName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.data.email}
                </span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.data.imagePath} alt={user?.data.fullName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.data.fullName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.data.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {isLoading ?
                <DropdownMenuItem>
                  <Skeleton className="h-[20px] w-full"/>
                </DropdownMenuItem>
                :
                <Link href={`/profile/${userData?.id}`} >
                  <DropdownMenuItem className="cursor-pointer">
                    <CircleUserRound />
                    Profile
                  </DropdownMenuItem>
                </Link>
              }
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
              <Power />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
