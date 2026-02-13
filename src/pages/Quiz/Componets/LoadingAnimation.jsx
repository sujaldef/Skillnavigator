import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] flex flex-col items-center justify-center text-[#00FF88]">
      <div className="relative w-24 h-24 mb-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-0 border-4 border-[#00FF88]/20 border-t-[#00FF88] rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-4 border-4 border-blue-500/20 border-b-blue-500 rounded-full"
        />
      </div>
      
      <motion.h2 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-xl font-mono tracking-widest uppercase"
      >
        Generating Assessment
      </motion.h2>
      <p className="text-gray-500 text-sm mt-2 font-mono">Calibrating difficulty vectors...</p>
    </div>
  );
};

export default LoadingAnimation;