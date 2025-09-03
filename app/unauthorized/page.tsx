"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export default function UnauthorizedPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4"
    >
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-6">
            <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-6xl font-bold text-red-600 dark:text-red-400 mb-4">
            403
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Access Denied
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          {" "}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            You don&apos;t have permission to access this resource.
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            Please contact your administrator if you believe this is an error.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4"
        >
          <Link href="/">
            <Button className="w-full" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant="outline" className="w-full" size="lg">
              View Your Profile
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
