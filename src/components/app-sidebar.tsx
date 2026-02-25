import * as React from "react"
import {
  IconUsersGroup,
  IconDeviceDesktop,
  IconFileInvoiceFilled
} from "@tabler/icons-react"

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
import type { Menu } from "@/types/auth.type"
import { NavUser } from "./nav-user"
import useAuthStore from "@/store/useAuthStore";

const menus: Array<Menu> = [
  {
    title: "Admin Users",
    url: "admin-users",
    icon: IconUsersGroup
  },
  {
    title: "Products",
    icon: IconDeviceDesktop,
    subMenus: [
      {
        title: "Types",
        url: "product-types",
      },
      {
        title: "Stocks",
        url: "product-stocks",
      },
    ]
  },
  {
    title: "Orders",
    url: "orders",
    icon: IconFileInvoiceFilled
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const auth = useAuthStore((state) => state.auth)

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
