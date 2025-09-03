"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { canAccessRoute } from "@/lib/auth";
import { motion } from "framer-motion";
import { RouteGuardProps, User as AuthUser } from "@/types/auth";

export default function RouteGuard({
  children,
  requiredRoles,
  fallbackPath = "/auth/login",
  showLoading = true,
}: RouteGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackPath);
        return;
      }

      if (!canAccessRoute(user, requiredRoles)) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [user, isAuthenticated, isLoading, requiredRoles, router, fallbackPath]);

  if (isLoading && showLoading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </motion.div>
    );
  }

  if (
    !isLoading &&
    (!isAuthenticated || !canAccessRoute(user, requiredRoles))
  ) {
    return null;
  }

  return <>{children}</>;
}

// Higher-order component for page-level protection
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles?: AuthUser["role"][]
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <RouteGuard requiredRoles={requiredRoles}>
        <Component {...props} />
      </RouteGuard>
    );
  };
}

// Hook for checking permissions in components
export function usePermissions() {
  const { user } = useAuthStore();

  return {
    canAccess: (roles?: AuthUser["role"][]) => canAccessRoute(user, roles),
    isAdmin: () => user?.role === "admin",
    isModerator: () => user?.role === "admin" || user?.role === "moderator",
    isUser: () => !!user,
  };
}
