import React from "react";

const PerformanceSummary = ({ skillStats }) => {
  return (
    <div className="h-[70%] bg-white rounded-lg shadow-lg p-6 flex flex-col items-center overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Performance Summary</h2>
      <div className="w-full flex flex-col gap-4">
        {Object.entries(skillStats).map(([skill, { correct, total }]) => (
          <div key={skill} className="flex justify-between bg-gray-100 p-3 rounded-lg shadow">
            <span className="text-lg font-medium text-gray-700">{skill}</span>
            <span className="text-lg font-semibold text-[#009e52]">
              {correct}/{total} Correct
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceSummary;