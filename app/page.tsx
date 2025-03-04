// @/app/page.tsx
'use client'
import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

export default function Home() {
  return (
      <motion.div 
      className="min-h-screen h-[200vh] mt-16 bg-white dark:bg-gray-800 text-black dark:text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <main className="container m-auto px-4 py-16">
        <motion.h1 
          className="text-4xl font-bold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome to Our Website
        </motion.h1>
        <motion.p 
          className="text-lg mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          We&apos;re excited to showcase our innovative solutions and cutting-edge technology.
        </motion.p>
        <motion.div 
          className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            To revolutionize the industry with our forward-thinking approach and dedication to excellence.
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
}
