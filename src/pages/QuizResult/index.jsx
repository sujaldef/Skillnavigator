import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrophy, FaChartLine, FaArrowRight, FaRedo, FaMedal, FaLayerGroup } from "react-icons/fa";
import Navbar from "../../components/Navbar";

// --- Sub-Component: Animated Circular Progress ---
const ScoreDial = ({ score, total }) => {
  const percentage = total > 0 ? (score / total) * 100 : 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let message = "Good Start";
  let icon = <FaChartLine />;
  if (percentage >= 80) { message = "Expert Level"; icon = <FaTrophy />; }
  else if (percentage >= 60) { message = "Proficient"; icon = <FaMedal />; }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#1A2A44] rounded-3xl border border-[#2E4057] shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#00FF88]/5 rounded-3xl pointer-events-none" />

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* SVG Circle */}
        <svg className="transform -rotate-90 w-full h-full">
          {/* Track */}
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="#2E4057"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Indicator */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="128"
            cy="128"
            r={radius}
            stroke="#00FF88"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center">
          <motion.span 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="text-5xl font-bold text-white"
          >
            {Math.round(percentage)}%
          </motion.span>
          <span className="text-gray-400 text-sm mt-1 uppercase tracking-widest">Accuracy</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="text-[#00FF88] text-3xl mb-2 flex justify-center">{icon}</div>
        <h3 className="text-2xl font-bold text-white">{message}</h3>
        <p className="text-gray-400 mt-2">
          You answered <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{total}</span> questions correctly.
        </p>
      </div>
    </div>
  );
};

// --- Sub-Component: Skill Bar ---
const SkillBar = ({ skill, correct, total, index }) => {
  const percentage = (correct / total) * 100;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{skill}</span>
        <span className="text-sm font-bold text-[#00FF88]">{correct}/{total}</span>
      </div>
      <div className="w-full bg-[#0B1221] rounded-full h-2.5 border border-[#2E4057]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-[#00FF88] h-2.5 rounded-full shadow-[0_0_10px_#00FF88]"
        />
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const QuizResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Destructure with default fallbacks to prevent crashes
  const { results = [], jobRole = "Unknown", level = "Beginner", fieldName = "" } = location.state || {};

  // --- Calculations ---
  // Group results by skill
  const skillStats = results.reduce((acc, { skill, isCorrect }) => {
    if (!acc[skill]) {
      acc[skill] = { correct: 0, total: 0 };
    }
    acc[skill].total += 1;
    if (isCorrect) acc[skill].correct += 1;
    return acc;
  }, {});

  const score = results.filter((r) => r.isCorrect).length;
  const total = results.length;

  // Handle Missing Data
  if (!results.length) {
    return (
      <div className="flex h-screen w-screen bg-[#0B1221] items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Quiz Data Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[#00FF88] text-[#0B1221] rounded-full font-bold"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handleStartLearning = () => {
    // Navigate to learning path
    navigate(`/level/${jobRole}/${level}`, { state: { jobRole, level, fieldName } });
  };

  const handleRetake = () => {
    navigate(-1); // Go back to quiz
  };

  return (
    <div className="min-h-screen bg-[#0B1221] text-white font-sans overflow-x-hidden selection:bg-[#00FF88] selection:text-[#0B1221]">
      <Navbar />

      {/* Ambient Background */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#00FF88]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 pt-24 pb-12 px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2">
            Assessment <span className="text-[#00FF88]">Complete</span>
          </h1>
          <p className="text-gray-400">
            Performance analysis for <span className="text-white font-semibold">{jobRole}</span> ({level})
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Score Card */}
          <div className="lg:col-span-1">
            <ScoreDial score={score} total={total} />
            
            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button 
                onClick={handleRetake}
                className="flex items-center justify-center gap-2 py-3 bg-[#1A2A44] border border-[#2E4057] text-gray-300 rounded-xl font-bold hover:bg-[#2E4057] transition-all"
              >
                <FaRedo /> Retake
              </button>
              <button 
                onClick={() => navigate('/')}
                className="py-3 bg-[#1A2A44] border border-[#2E4057] text-gray-300 rounded-xl font-bold hover:bg-[#2E4057] transition-all"
              >
                Home
              </button>
            </div>
          </div>

          {/* Right Column: Detailed Stats & CTA */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* CTA Section */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-[#00FF88] to-emerald-500 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg"
            >
              <div className="text-[#0B1221] mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Ready to Upgrade Your Skills?</h2>
                <p className="font-medium opacity-80 max-w-md">
                  Based on your results, we have generated a personalized learning path to bridge your knowledge gaps.
                </p>
              </div>
              <button 
                onClick={handleStartLearning}
                className="bg-[#0B1221] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl"
              >
                Start Learning Path <FaArrowRight />
              </button>
            </motion.div>

            {/* Performance Summary */}
            <div className="bg-[#1A2A44] border border-[#2E4057] rounded-3xl p-8 shadow-xl flex-1">
              <div className="flex items-center gap-3 mb-6 border-b border-[#2E4057] pb-4">
                <FaLayerGroup className="text-[#00FF88]" />
                <h3 className="text-xl font-bold text-white">Skill Breakdown</h3>
              </div>
              
              <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                {Object.entries(skillStats).map(([skill, { correct, total }], index) => (
                  <SkillBar 
                    key={skill} 
                    skill={skill} 
                    correct={correct} 
                    total={total}
                    index={index} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;