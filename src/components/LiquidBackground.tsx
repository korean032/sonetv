'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LiquidBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
      {/* 玻璃态遮罩 - 增强模糊感 */}
      <div className='absolute inset-0 backdrop-blur-3xl bg-white/30 dark:bg-black/20' />

      {/* 顶部主光晕 - 蓝色 */}
      <motion.div
        className='absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 dark:opacity-20 dark:mix-blend-screen'
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 右侧副光晕 - 紫色 */}
      <motion.div
        className='absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 dark:opacity-20 dark:mix-blend-screen'
        style={{
          background:
            'radial-gradient(circle, rgba(147,51,234,0.8) 0%, rgba(147,51,234,0) 70%)',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* 底部光晕 - 粉色 */}
      <motion.div
        className='absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-40 dark:opacity-20 dark:mix-blend-screen'
        style={{
          background:
            'radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(236,72,153,0) 70%)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />
    </div>
  );
};
