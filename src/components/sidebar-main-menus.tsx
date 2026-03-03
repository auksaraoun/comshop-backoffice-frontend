import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { type Menu } from "@/types/auth.type"
import { NavLink } from "react-router-dom"
import { Fragment } from "react"
import { SideBarGroupMenus } from "./sidebar-group-menus"

export function SideBarMainMenus({ menus }: { menus: Menu[] }) {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                {menus.map((item) => {
                    return (
                        <Fragment key={item.id} >
                            {
                                !item.subMenus || item.subMenus.length == 0
                                    ? (
                                        <SidebarMenuItem >
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className="cursor-pointer"
                                                asChild
                                            >
                                                <NavLink to={item.url ? item.url : ''} >
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                    : <SideBarGroupMenus menu={item} />
                            }
                        </Fragment>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup >
    )
}
