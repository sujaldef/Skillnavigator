import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaChartLine, FaLaptopCode } from "react-icons/fa";

const Career = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] font-sans text-white selection:bg-[#00FF88] selection:text-[#0B1221]">
      <Navbar />
      
      <div className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1A2A44_1px,transparent_1px),linear-gradient(to_bottom,#1A2A44_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        {/* Header with Glitch-like Reveal */}
        <div className="relative z-10 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-xs font-mono uppercase tracking-widest"
          >
            System: Online
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Architect Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
              Future
            </span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A data-driven ecosystem designed to accelerate professional velocity.
          </p>
        </div>

        {/* Spotlight Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <SpotlightCard>
            <div className="relative h-full flex flex-col items-start gap-6 p-8">
              <div className="w-12 h-12 rounded-xl bg-[#00FF88]/10 flex items-center justify-center border border-[#00FF88]/20 text-[#00FF88]">
                <FaChartLine size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Market Intelligence</h3>
                <p className="text-gray-400 leading-relaxed">
                  Real-time analysis of job market trends. We decode the signals so you can target high-value roles with precision.
                </p>
              </div>
              <div className="mt-auto pt-6 w-full">
                <div className="h-[1px] w-full bg-gradient-to-r from-[#00FF88]/50 to-transparent mb-4" />
                <span className="text-xs font-mono text-[#00FF88] uppercase tracking-wider flex items-center gap-2">
                  Initialize Protocol <span className="text-lg">→</span>
                </span>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard>
            <div className="relative h-full flex flex-col items-start gap-6 p-8">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500">
                <FaLaptopCode size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Skill Acquisition</h3>
                <p className="text-gray-400 leading-relaxed">
                  Deploy structured learning paths. From syntax to system design, bridge the gap between theory and production.
                </p>
              </div>
              <div className="mt-auto pt-6 w-full">
                <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mb-4" />
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  Execute Module <span className="text-lg">→</span>
                </span>
              </div>
            </div>
          </SpotlightCard>

        </div>
      </div>
      <Footer />
    </div>
  );
};

// --- The "Crazy" Spotlight Component ---
function SpotlightCard({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative border border-[#1E293B] bg-[#0F172A] overflow-hidden rounded-3xl"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 255, 136, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div>{children}</div>
    </div>
  );
}

export default Career;