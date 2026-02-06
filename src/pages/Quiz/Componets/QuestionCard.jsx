import React from "react";
import { motion } from "framer-motion";

const QuestionCard = ({ question, index, selectedAnswer, onAnswer }) => {
  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Question Text */}
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
        {question.question}
      </h3>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <button
              key={idx}
              onClick={() => onAnswer(question.id, option)}
              className={`
                group relative w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4
                ${isSelected 
                  ? "bg-[#00FF88]/10 border-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.15)]" 
                  : "bg-[#1A2A44] border-transparent hover:border-[#2E4057] hover:bg-[#1E293B]"}
              `}
            >
              {/* Option Letter Box */}
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors
                ${isSelected ? "bg-[#00FF88] text-[#0B1221]" : "bg-[#2A3B4D] text-gray-400 group-hover:text-white"}
              `}>
                {letter}
              </div>

              {/* Text */}
              <span className={`text-lg font-medium transition-colors ${isSelected ? "text-[#00FF88]" : "text-gray-300 group-hover:text-white"}`}>
                {option}
              </span>

              {/* Checkmark Indicator */}
              {isSelected && (
                <motion.div 
                  layoutId="checkmark"
                  className="absolute right-5 w-3 h-3 bg-[#00FF88] rounded-full shadow-[0_0_10px_#00FF88]"
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionCard;