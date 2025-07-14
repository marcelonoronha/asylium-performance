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
      url: "/home",
      icon: House,
      items: [
        {
          title: "Tirar submenu",
          url: "/home",
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
          url: "/performance/overview",
        },
        {
          title: "Parâmetros",
          url: "/performance/parameters",
        },
      ],
    },
    {
      title: "Players",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Overview",
          url: "#/players/overview",
        },
        {
          title: "Players Edit",
          url: "/players/playersedit",
        },
      ],
    },
    {
      title: "Itens",
      url: "#",
      icon: Sword,
      items: [
        {
          title: "Trinkets",
          url: "/itens/trinkets",
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
