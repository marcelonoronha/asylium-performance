"use client";

import * as React from "react";
import {
  Users,
  House,
  ChartNoAxesCombined,
  Gamepad2,
  Sword,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Asylium",
      logo: Gamepad2,
      plan: "Azralon",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: House,
      items: [
        {
          title: "Tirar submenu",
          url: "#",
        },
      ],
    },
    {
      title: "Performance",
      url: "#",
      icon: ChartNoAxesCombined,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Parâmetros",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Rooster",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Players",
          url: "#",
        },
      ],
    },
    {
      title: "Itens",
      url: "#",
      icon: Sword,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Trinkets",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
