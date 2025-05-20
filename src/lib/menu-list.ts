import {
  LucideIcon,
  User2,
  FolderKanban,
  UserPen,
  Hammer,
  FileText,
  Briefcase,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(role: string): Group[] {
  const adminMenus = [
    {
      groupLabel: "Admin Controls",
      menus: [
        {
          href: "/dashboard/admin/projects",
          label: "Projects",
          icon: FolderKanban,
        },

        {
          href: "/dashboard/admin/blogs",
          label: "Blogs",
          icon: UserPen,
        },
        {
          href: "/dashboard/admin/skills",
          label: "Skills",
          icon: Hammer,
        },
        {
          href: "/dashboard/admin/resume",
          label: "Resume",
          icon: FileText,
        },
        {
          href: "/dashboard/admin/experience",
          label: "Experience",
          icon: Briefcase,
        },
        {
          href: "/dashboard/admin/education",
          label: "Education",
          icon: GraduationCap,
        },
        {
          href: "/dashboard/admin/messages",
          label: "Messages",
          icon: MessageCircle,
        },
      ],
    },
    {
      groupLabel: "SETTINGS",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profile",
          icon: User2,
        },
      ],
    },
  ];

  const userMenus = [
    {
      groupLabel: "USER CONTROLS",
      menus: [
        {
          href: "/dashboard/user/my-blogs",
          label: "My Blogs",
          icon: UserPen,
        },
      ],
    },
    {
      groupLabel: "SETTINGS",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profile",
          icon: User2,
        },
      ],
    },
  ];

  return role === "ADMIN" ? [...adminMenus] : [...userMenus];
}
