import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = ({ show, onClose, title, message, type = 'warning' }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && show) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [show, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  // Icon configuration based on type
  const iconConfig = {
    warning: {
      gradient: 'from-orange-500 to-red-500',
      path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    },
    error: {
      gradient: 'from-red-500 to-red-700',
      path: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    success: {
      gradient: 'from-green-500 to-green-600',
      path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    info: {
      gradient: 'from-blue-500 to-blue-600',
      path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  };

  const currentIcon = iconConfig[type] || iconConfig.warning;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#2E4057] to-[#1A2A44] p-6 md:p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border border-[#00FF88]/20 relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF88] opacity-5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00FF88] opacity-5 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.1, 
                    type: 'spring', 
                    stiffness: 200,
                    damping: 15
                  }}
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${currentIcon.gradient} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={currentIcon.path} />
                  </svg>
                </motion.div>

                {/* Title */}
                <motion.h2
                  id="popup-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl font-bold mb-3 text-white"
                >
                  {title}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8 text-gray-300 leading-relaxed text-sm md:text-base"
                >
                  {message}
                </motion.p>

                {/* Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#00FF88] to-[#00CC70] text-[#1A2A44] font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-[#00FF88]/30 transition-all duration-300 flex items-center justify-center gap-2 mx-auto focus:outline-none focus:ring-2 focus:ring-[#00FF88] focus:ring-offset-2 focus:ring-offset-[#1A2A44]"
                  autoFocus
                >
                  <span>Got it</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Popup;
