// components/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
  fadeIn: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  },
}

export default function PageTransition({ children, className }: { children: React.ReactNode, className?: string }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="fadeOut"
        animate="fadeIn"

        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
