import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar(){
    return (
        <Sidebar>
            <SidebarHeader>Hello</SidebarHeader>
            <SidebarContent>
            <SidebarGroup />
            <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}