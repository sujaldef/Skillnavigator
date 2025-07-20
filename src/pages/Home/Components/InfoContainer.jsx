import React from "react";
import { motion } from "framer-motion";

const InfoContainer = ({ containerData }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delayChildren: 0.2,
        staggerChildren: 0.3,
      },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-12 bg-[#1A2A44] mt-[70px]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {containerData.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="bg-[#2E4057] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative group z-10"
          >
            <div className="flex flex-col h-full">
              {/* Text Section */}
              <div className="text-white text-lg md:text-xl font-semibold mb-4">
                {item.text}
              </div>

              {/* Image Section */}
              <div className="flex-grow mb-4">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-56  rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay */}
              <div className="text-white text-sm md:text-base opacity-0 group-hover:opacity-90 transition-opacity duration-300 bg-[#2E4057]/70 p-4 rounded-b-xl absolute inset-0 flex flex-col justify-end pointer-events-none group-hover:pointer-events-auto">
                <p className="mb-4">
                  {index === 0 && "Evaluate your skills with a comprehensive assessment."}
                  {index === 1 && "Customize your learning journey with ease."}
                  {index === 2 && "Utilize curated resources for skill development."}
                  {index === 3 && "Track your advancement with detailed analytics."}
                </p>
                <button className="bg-[#00FF88] text-[#1A2A44] px-4 py-2 rounded-md hover:bg-[#00CC70] transition-colors duration-200 w-full md:w-auto">
                  Explore Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InfoContainer;