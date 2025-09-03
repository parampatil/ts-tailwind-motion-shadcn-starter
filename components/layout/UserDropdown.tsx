"use client";

import { useRouter } from "next/navigation";
import { LogOut, Settings, Shield, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/authStore";
import { signOutUser } from "@/lib/auth";

export default function UserDropdown() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOutUser();
    logout();
    router.push("/");
  };

  const navigateToProfile = () => {
    router.push("/profile");
  };

  const navigateToSettings = () => {
    router.push("/settings");
  };

  const navigateToAdmin = () => {
    router.push("/admin");
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return "U";
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-600 dark:text-red-400";
      case "moderator":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-green-600 dark:text-green-400";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user.photoURL}
                alt={user.displayName || user.email}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(user.displayName, user.email)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <p
              className={`text-xs leading-none font-medium ${getRoleBadgeColor(
                user.role
              )}`}
            >
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={navigateToProfile}
          className="cursor-pointer"
        >
          <UserCircle className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={navigateToSettings}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        {(user.role === "admin" || user.role === "moderator") && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={navigateToAdmin}
              className="cursor-pointer"
            >
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Panel</span>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
