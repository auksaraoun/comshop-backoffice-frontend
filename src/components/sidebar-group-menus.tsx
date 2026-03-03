import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    IconChevronRight
} from "@tabler/icons-react"
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "@/components/ui/sidebar"
import { NavLink, useLocation } from "react-router-dom"
import { type Menu } from "@/types/auth.type";


export function SideBarGroupMenus({ menu }: { menu: Menu }) {
    const location = useLocation()
    const isOpen = menu.subMenus?.some((subMenu) => subMenu.url == location.pathname)
    return (
        <Collapsible
            asChild
            defaultOpen={isOpen}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={menu.title} className="cursor-pointer" >
                        {menu.icon && <menu.icon />}
                        <span>{menu.title}</span>
                        <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {menu.subMenus?.map((subMenu) => (
                            <SidebarMenuSubItem key={`sub_${subMenu.id}`}>
                                <SidebarMenuSubButton asChild>
                                    <NavLink to={subMenu.url} >
                                        <span>{subMenu.title}</span>
                                    </NavLink>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}