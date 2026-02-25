"use client"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    IconChevronRight
} from "@tabler/icons-react"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "@/components/ui/sidebar"
import { type Menu } from "@/types/auth.type"
import { Link } from "react-router-dom"
import { Fragment } from "react"

export function SideBarMainMenus({ menus }: { menus: Menu[] }) {
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                {menus.map((item, key) => {
                    return (
                        <Fragment key={key} >
                            {
                                !item.subMenus || item.subMenus.length == 0
                                    ? (
                                        <SidebarMenuItem >
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className="cursor-pointer"
                                                asChild
                                            >
                                                <Link to={item.url ? item.url : ''} >
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                    : (
                                        <Collapsible
                                            key={key}
                                            asChild
                                            defaultOpen={false}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton tooltip={item.title} className="cursor-pointer" >
                                                        {item.icon && <item.icon />}
                                                        <span>{item.title}</span>
                                                        <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.subMenus?.map((subMenu, keySubMenu) => (
                                                            <SidebarMenuSubItem key={`sub_${keySubMenu}`}>
                                                                <SidebarMenuSubButton asChild>
                                                                    <a href={subMenu.url}>
                                                                        <span>{subMenu.title}</span>
                                                                    </a>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    )
                            }
                        </Fragment>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
