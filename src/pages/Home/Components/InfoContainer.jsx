import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaLayerGroup, FaRoad, FaUserCheck } from "react-icons/fa";

const InfoContainer = () => {
  const features = [
    {
      title: "Skill Assessment",
      desc: "Comprehensive testing to benchmark your current level.",
      icon: <FaUserCheck size={22} />,
      colSpan: "col-span-1 md:col-span-2",
    },
    {
      title: "Smart Segmentation",
      desc: "We categorize your profile instantly based on results.",
      icon: <FaLayerGroup size={22} />,
      colSpan: "col-span-1",
    },
    {
      title: "Custom Roadmaps",
      desc: "Tailored PDFs, YouTube playlists, and practice sets.",
      icon: <FaRoad size={22} />,
      highlight: true, // Special flag for the green card
      colSpan: "col-span-1",
    },
    {
      title: "Progress Tracking",
      desc: "Visualize growth with detailed analytics and milestones.",
      icon: <FaChartLine size={22} />,
      colSpan: "col-span-1 md:col-span-2",
    },
  ];

  return (
    <div className="w-full py-24 px-6 bg-[#1A2A44]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              System Capabilities
            </h2>
            <p className="text-gray-400 text-lg">
              Engineered to take you from beginner to job-ready without the friction.
            </p>
          </div>
          {/* Decorative Line */}
          <div className="hidden md:block h-[1px] flex-grow bg-gradient-to-r from-[#2E4057] to-transparent mb-4 ml-8" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <BentoCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Extracted Card Component for cleaner code
const BentoCard = ({ item, index }) => {
  const isHighlight = item.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className={`
        ${item.colSpan} relative rounded-[32px] p-8 overflow-hidden group transition-all duration-300
        ${isHighlight ? 'bg-[#00FF88]' : 'bg-[#20314d] hover:bg-[#253a59]'}
      `}
    >
      {/* 1. Top Border Highlight (The "Light Catch" effect) */}
      {!isHighlight && (
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      )}

      {/* 2. Content Wrapper */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        
        {/* Header Part */}
        <div>
          <div className={`
            w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-xl shadow-lg transition-transform group-hover:scale-110
            ${isHighlight ? 'bg-[#1A2A44] text-[#00FF88]' : 'bg-[#1A2A44] text-white border border-[#2E4057]'}
          `}>
            {item.icon}
          </div>

          <h3 className={`text-2xl font-bold mb-3 ${isHighlight ? 'text-[#1A2A44]' : 'text-white'}`}>
            {item.title}
          </h3>
          
          <p className={`text-sm leading-relaxed ${isHighlight ? 'text-[#1A2A44]/80 font-medium' : 'text-gray-400'}`}>
            {item.desc}
          </p>
        </div>

        {/* Footer Part (Number & Arrow) */}
        <div className="flex justify-between items-end mt-8">
           <span className={`text-4xl font-bold opacity-10 ${isHighlight ? 'text-black' : 'text-white'}`}>
             0{index + 1}
           </span>
           
           {/* Arrow icon that  appears on hover */}
           <motion.div 
             initial={{ x: -10, opacity: 0 }}
             whileHover={{ x: 0, opacity: 1 }}
             className={`text-xl ${isHighlight ? 'text-[#1A2A44]' : 'text-[#00FF88]'}`}
           >
             →
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoContainer;