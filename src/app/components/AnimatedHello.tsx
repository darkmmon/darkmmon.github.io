'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedHello() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.svg
      width="300"
      height="100"
      viewBox="-50 0 300 100"
      className="mx-auto mt-8"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {/* H */}
      <motion.g variants={pathVariants}>
        <path
          d="M 20 80 L 20 20"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 20 50 L 40 50"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 40 80 L 40 20"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      {/* E */}
      <motion.g variants={pathVariants}>
        <path
          d="M 70 20 L 50 20 L 50 80 L 70 80"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 50 50 L 70 50"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      {/* L */}
      <motion.g variants={pathVariants}>
        <path
          d="M 80 20 L 80 80 L 100 80"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* L */}
      <motion.g variants={pathVariants}>
        <path
          d="M 110 20 L 110 80 L 130 80"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* O */}
      <motion.g variants={pathVariants}>
        <path
          d="M 136 50 A 18 30 0 1 0 172 50 A 18 30 0 1 0 136 50"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </motion.svg>
  );
}
