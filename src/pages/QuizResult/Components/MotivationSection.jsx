import React from "react";

const MotivationSection = ({ onStartLearning }) => {
  return (
    <div className="h-[15%] m-10 rounded-full bg-white flex gap-6 items-center justify-center">
      <div className="w-[70%] p-6 text-2xl text-center">
        <h1>Improve your performance by learning</h1>
      </div>
      <div className="w-[30%] flex items-center justify-center">
        <button
          onClick={onStartLearning}
          className="bg-[#00FF88] text-white text-xl font-bold px-6 py-3 rounded-full hover:scale-105 transition-all duration-300"
        >
          Let's Start Learning
        </button>
      </div>
    </div>
  );
};

export default MotivationSection;