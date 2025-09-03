// components/Navbar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserDropdown";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/types/ui";

interface NavbarProps {
  menuItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ menuItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIslandMode, setIsIslandMode] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();
  const { isAuthenticated } = useAuthStore();

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    controls.start("visible");

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsIslandMode(true);
      } else {
        setIsIslandMode(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    controls.start(isMobileMenuOpen ? "closed" : "open");
  };

  const navVariants = {
    normal: {
      width: "100%",
      borderRadius: "0px",
      y: 0,
    },
    island: {
      width: "90%",
      borderRadius: "20px",
      y: 10,
    },
  };

  const mobileMenuVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
    open: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
  };

  const hamburgerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 shadow-md mx-auto transition-colors duration-500 ${
        isIslandMode
          ? "bg-white dark:bg-gray-950/80"
          : "bg-white dark:bg-gray-950"
      }`}
      initial="normal"
      animate={isIslandMode ? "island" : "normal"}
      variants={navVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Logo
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link href={item.href} key={item.href} passHref>
                  <motion.span
                    className={`px-3 py-2 rounded-md font-medium inline-block transition-colors duration-300 ${
                      pathname === item.href
                        ? "text-blue-600"
                        : "text-gray-600 dark:text-white"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ))}{" "}
              {mounted && <ThemeToggle />}
              {mounted && isAuthenticated ? (
                <UserDropdown />
              ) : (
                <Link href="/auth/login">
                  <Button variant="default" className="px-4 py-2" asChild>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      Sign In
                    </motion.div>
                  </Button>
                </Link>
              )}
            </div>
          </div>{" "}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && <ThemeToggle />}
            {mounted && isAuthenticated && <UserDropdown />}
            <motion.button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={hamburgerVariants}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          className="md:hidden overflow-hidden"
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          exit="closed"
          variants={mobileMenuVariants}
        >
          <div ref={mobileMenuRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <motion.div key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-center text-base font-medium transition-colors duration-300 ${
                    pathname === item.href
                      ? "text-blue-600"
                      : "text-gray-600 dark:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>{" "}
              </motion.div>
            ))}
            {mounted && !isAuthenticated && (
              <motion.div className="mt-4 px-3">
                <Link href="/auth/login">
                  <Button
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
