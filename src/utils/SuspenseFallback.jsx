import React from 'react';
import { motion } from 'framer-motion';

export const SuspenseFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A2A44]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-[#00FF88]/30 border-t-[#00FF88] rounded-full mx-auto"
          />
        </div>
        <p className="text-white text-lg font-semibold">Loading...</p>
        <p className="text-gray-400 text-sm mt-2">Preparing your experience</p>
      </motion.div>
    </div>
  );
};
