"use client"
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface Props {
  children : ReactNode
}


export default function Layout({children}:Props) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset >
                <SiteHeader/>
                <main className="p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}