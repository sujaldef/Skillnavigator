import React from "react";

const ProgressCircle = ({ score, total, strokeDashArray, circumference, displayScore, completionStatus }) => {
  return (
    <div className="relative size-60">
      <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          stroke="#00ff88"
          fill="#d1ffdd"
          strokeWidth="1"
          strokeDasharray="75 100"
          strokeLinecap="round"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          stroke="#009e52"
          fill="none"
          strokeWidth="2"
          strokeDasharray={`${strokeDashArray} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-4xl font-bold text-[#009e52]">{displayScore}</span>
        <span className="text-[#009e52] block">Score</span>
        <span className="text-sm text-[#009e52] block mt-2">{completionStatus}</span>
      </div>
    </div>
  );
};

export default ProgressCircle;