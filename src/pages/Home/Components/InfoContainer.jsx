import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaLayerGroup, FaRoad, FaUserCheck } from "react-icons/fa";

const InfoContainer = () => {
  const features = [
    {
      title: "Skill Assessment",
      desc: "Comprehensive testing to benchmark your level.",
      icon: <FaUserCheck size={18} />, // Smaller Icon
      colSpan: "col-span-1 md:col-span-2",
    },
    {
      title: "Smart Segmentation",
      desc: "We categorize your profile instantly.",
      icon: <FaLayerGroup size={18} />,
      colSpan: "col-span-1",
    },
    {
      title: "Custom Roadmaps",
      desc: "Tailored PDFs, YouTube playlists, & practice sets.",
      icon: <FaRoad size={18} />,
      highlight: true,
      colSpan: "col-span-1",
    },
    {
      title: "Progress Tracking",
      desc: "Visualize growth with detailed analytics.",
      icon: <FaChartLine size={18} />,
      colSpan: "col-span-1 md:col-span-2",
    },
  ];

  return (
    // Reduced outer padding py-16
    <div className="w-full py-16 px-6 bg-[#1A2A44]">
      {/* Reduced max-w to 4xl (approx 75%) */}
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="max-w-lg">
            {/* Smaller fonts */}
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
              System Capabilities
            </h2>
            <p className="text-gray-400 text-base">
              Engineered to take you from beginner to job-ready.
            </p>
          </div>
          <div className="hidden md:block h-[1px] flex-grow bg-gradient-to-r from-[#2E4057] to-transparent mb-3 ml-6" />
        </div>

        {/* Bento Grid - Reduced gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((item, index) => (
            <BentoCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BentoCard = ({ item, index }) => {
  const isHighlight = item.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      // Reduced padding p-6, rounded corners reduced slightly
      className={`
        ${item.colSpan} relative rounded-[24px] p-6 overflow-hidden group transition-all duration-300
        ${isHighlight ? 'bg-[#00FF88]' : 'bg-[#20314d] hover:bg-[#253a59]'}
      `}
    >
      {!isHighlight && (
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      )}

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Smaller Icon box */}
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg shadow-lg transition-transform group-hover:scale-110
            ${isHighlight ? 'bg-[#1A2A44] text-[#00FF88]' : 'bg-[#1A2A44] text-white border border-[#2E4057]'}
          `}>
            {item.icon}
          </div>

          <h3 className={`text-xl font-bold mb-2 ${isHighlight ? 'text-[#1A2A44]' : 'text-white'}`}>
            {item.title}
          </h3>
          
          <p className={`text-xs leading-relaxed ${isHighlight ? 'text-[#1A2A44]/80 font-medium' : 'text-gray-400'}`}>
            {item.desc}
          </p>
        </div>

        <div className="flex justify-between items-end mt-6">
           <span className={`text-3xl font-bold opacity-10 ${isHighlight ? 'text-black' : 'text-white'}`}>
             0{index + 1}
           </span>
           
           <motion.div 
             initial={{ x: -10, opacity: 0 }}
             whileHover={{ x: 0, opacity: 1 }}
             className={`text-lg ${isHighlight ? 'text-[#1A2A44]' : 'text-[#00FF88]'}`}
           >
             →
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InfoContainer;