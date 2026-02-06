import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.8, type: "spring" },
    }),
  };

  return (
    <section className="relative min-h-[90vh] w-full bg-[#1A2A44] flex items-center justify-center overflow-hidden px-6 md:px-16 pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF88] opacity-5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 opacity-5 rounded-full blur-[80px]" />

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="space-y-4 z-10">
          <motion.div custom={0} initial="hidden" animate="visible" variants={textVariants}>
            <h1 className="text-white font-extrabold text-5xl md:text-7xl leading-tight font-montserrat">
              LEARN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-emerald-600">
                PRACTICE
              </span> <br />
              ACCOMPLISH
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="text-gray-300 text-lg max-w-md mt-6"
          >
            Your personalized gateway to professional mastery. Navigate your career path with precision.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-[#00FF88] text-[#1A2A44] font-bold rounded-full shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:shadow-[0_0_25px_rgba(0,255,136,0.6)] transition-shadow"
          >
            Get Started
          </motion.button>
        </div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex justify-center md:justify-end"
        >
          <motion.img
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            src="/computer.jpg"
            alt="Learning Setup"
            className="w-full max-w-[500px] rounded-3xl shadow-2xl border-2 border-[#2E4057]"
          />
          {/* Decorative Elements behind image */}
          <div className="absolute -z-10 top-10 right-10 w-full h-full border-2 border-[#00FF88] rounded-3xl opacity-20 transform translate-x-4 translate-y-4" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;