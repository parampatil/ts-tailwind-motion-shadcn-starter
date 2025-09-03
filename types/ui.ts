// UI Component types
import { ReactNode } from "react";

export interface MenuItem {
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: string | number;
  roles?: string[];
}

export interface NavbarProps {
  menuItems: MenuItem[];
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

export interface CardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export interface ButtonVariant {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}
