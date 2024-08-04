import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Group,
  AreaChartIcon,

  Settings2
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
  ];
}

export function getMenuListAdmin(pathname: string): Group[] {
  return [
    {
      groupLabel: "Admin",
      menus: [
        {
          href: "/admin/users",
          label: "Users",
          active: pathname.includes("/admin/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/admin/areas",
          label: "Areas",
          active: pathname.includes("/admin/areas"),
          icon: AreaChartIcon,
          submenus: [],
        },

        {
          href: "/admin/inventory",
          label: "Inventory",
          active: pathname.includes('/admin/inventory'),
          icon: Settings,
          submenus: [],
        }
      ],
    },
  ];
}
