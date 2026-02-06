import React from "react";
import { motion } from "framer-motion";

const InfoContainer = ({ containerData }) => {
  return (
    <div className="w-full py-20 px-6 bg-[#1A2A44]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
        >
          Why Choose <span className="text-[#00FF88]">Skill Navigator?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {containerData.map((item, index) => (
            <Card key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-[#233554] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row h-auto md:h-[250px]"
    >
      {/* Image Side */}
      <div className="w-full md:w-2/5 h-[200px] md:h-full overflow-hidden relative">
        <div className="absolute inset-0 bg-[#00FF88] opacity-0 group-hover:opacity-20 transition-opacity z-10" />
        <img
          src={item.image}
          alt="Feature"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Side */}
      <div className="w-full md:w-3/5 p-6 flex flex-col justify-center relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-bold text-[#00FF88]">
          0{index + 1}
        </div>
        
        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#00FF88] transition-colors">
          Feature Highlight
        </h3>
        
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {item.text}
        </p>

        <motion.button 
          whileHover={{ x: 5 }}
          className="mt-4 flex items-center text-[#00FF88] font-semibold text-sm uppercase tracking-wide"
        >
          Learn More <span className="ml-2">→</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default InfoContainer;