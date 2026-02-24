import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";


export function MainLayout(){
    return (
        <>
            <SidebarProvider>
                <main>
                    <AppSidebar/>
                    <Outlet/>
                </main>
            </SidebarProvider>
        </>
    )
}