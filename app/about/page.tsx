// @/app/about/page.tsx
'use client'
import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

export default function About() {
  return (
      <motion.div 
      className="min-h-screen mt-16 bg-white dark:bg-gray-800 text-black dark:text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <main className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          About Us
        </motion.h1>
        <motion.div 
          className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2023, our company has quickly grown to become a leader in innovative solutions.
          </p>
          <p>
            We&apos;re passionate about leveraging technology to solve complex problems and improve lives.
          </p>
        </motion.div>
        <motion.div 
          className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p>
            Our diverse team of experts brings a wealth of experience and creativity to every project.
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
}
