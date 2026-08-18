import * as React from "react"

import { SideBarMainMenus } from "./sidebar-main-menus"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { useAuthStore, useMenuStore } from "@/store/useAuthStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const auth = useAuthStore((state) => state.auth)
  const menus = useMenuStore((state) => state.menus)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5">
              <span className="text-base font-semibold">COMSHOP BACKOFFICE</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SideBarMainMenus menus={menus} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser auth={auth} />
      </SidebarFooter>
    </Sidebar>
  )
}
