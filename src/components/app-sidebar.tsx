"use client"
import * as React from "react"
import {
  Icon,
  IconBlocks,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BookOpenTextIcon, CalendarDaysIcon, Layers2Icon, LayersIcon } from "lucide-react"
import Link from "next/link"
import { NavManagement } from "./nav-management"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Time Table",
      url: "/timetable-generation",
      icon: IconListDetails,
    },
    {
      title: "Schedule",
      url: "#",
      icon: CalendarDaysIcon as Icon,
    },
  ],
  management: [
    {
      title: "Faculty",
      url: "/management/faculty",
      icon: IconUsers as Icon,
    },
    {
      title: "Department",
      url: "/management/department",
      icon: Layers2Icon as Icon,
    },
    {
      title: "Subject",
      url: "/management/subject",
      icon: BookOpenTextIcon as Icon,
    },
    {
      title: "Classroom",
      url: "/management/classroom",
      icon: IconBlocks,
    },
    {
      title: "Batch",
      url: "/management/batch",
      icon: LayersIcon as Icon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      title: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      title: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">EduSchedPro</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavManagement items={data.management} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
