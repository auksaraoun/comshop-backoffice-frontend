"use client"

import { type ComponentType } from "react"
import {
    IconUsersGroup,
    IconDeviceDesktop,
    IconSettings
} from "@tabler/icons-react"

import { NavUser } from "@/components/NavUser"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent
} from "@/components/ui/sidebar"

import { type Menu, type Auth } from "@/types/auth.type"


const user: Auth = {
    name: "string",
    username: "string",
    email: "string",
    created_at: "string",
    updated_at: "string"
}

const menus: Array<Menu> = [
    {
        title: "AdminUsers",
        url: "#",
        icon: IconUsersGroup,
        subMenus: []
    },
    {
        title: "Products",
        url: "#",
        icon: IconDeviceDesktop,
        subMenus: [
            {
                title: "Product Stocks",
                url: "#",
            },
            {
                title: "Add Product Stocks",
                url: "#",
            },
        ]
    },
    {
        title: "Master Data",
        url: "#",
        icon: IconSettings,
        subMenus: [
            {
                title: "Product Types",
                url: "#",
            },
        ]
    },
]

interface MenuIconProps {
    icon: ComponentType<{ size?: number; color?: string }> | null
}

const MenuIcon = ({ icon: Icon }: MenuIconProps) => {
    if (!Icon) return null
    return <Icon />
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="sidebar" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <span className="text-base font-semibold">Comshop BackOffice</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupContent>

                        {menus.map((menu, index) => {
                            return (
                                <SidebarMenuItem key={index} >
                                    <SidebarMenuButton asChild>
                                        <a href={menu.url}>
                                            <MenuIcon icon={menu.icon} />
                                            <span>{menu.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}

                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
