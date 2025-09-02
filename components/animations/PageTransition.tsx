// components/PageTransition.tsx
'use client'

import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'

const variants = {
  fadeIn: { opacity: 1, transition: { duration: 0.3 } },
  fadeOut: { opacity: 0, transition: { duration: 0.3 } },
}

export default function PageTransition({ children, className }: { children: React.ReactNode, className?: string }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="fadeOut"
        animate="fadeIn"
        exit="fadeOut"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
