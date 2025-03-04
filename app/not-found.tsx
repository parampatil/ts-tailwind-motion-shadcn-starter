// app/not-found.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

export default function NotFound() {
  return (
    <motion.div 
    initial="hidden"
      animate="visible"
      variants={fadeIn}
    className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">Page Not Found</h2>
        </motion.div>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link 
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
