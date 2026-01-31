import React from 'react';
import { motion } from 'framer-motion';

interface CapsuleSwitchProps {
  options: { label: string; value: string }[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

const CapsuleSwitch: React.FC<CapsuleSwitchProps> = ({
  options,
  active,
  onChange,
  className,
}) => {
  return (
    <div
      className={`relative inline-flex bg-gray-100/50 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-full p-1 shadow-inner ${
        className || ''
      }`}
    >
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
              isActive
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            style={{
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {isActive && (
              <motion.div
                layoutId='capsule-indicator'
                className='absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-md'
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
                style={{
                  zIndex: -1,
                }}
              />
            )}
            <span className='relative z-10'>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CapsuleSwitch;
