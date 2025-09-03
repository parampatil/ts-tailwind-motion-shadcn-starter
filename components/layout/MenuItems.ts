// components/layout/MenuItems.ts
import { MenuItem } from "@/types/ui";

export const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  // Add more menu items as needed
];

// Menu items that require authentication
export const authenticatedMenuItems: MenuItem[] = [
  { label: "Profile", href: "/profile" },
  { label: "Dashboard", href: "/dashboard" },
];

// Menu items for admin users
export const adminMenuItems: MenuItem[] = [{ label: "Admin", href: "/admin" }];
