import React from 'react';

const LeftSection = ({ handleFetchRoadmap, levels, selectedLevel, handleLevelChange, handleKnowYourLevel }) => {
  return (
    <div className="flex-1 flex flex-col gap-4 p-10">
      {/* First Section (30% height) */}
      <div className="h-[30%] rounded-[42px] bg-[#D9D9D9] flex flex-col justify-center">
        <h1 className="text-2xl font-semibold text-gray-700 flex justify-center p-6">
          Analyze your knowledge
        </h1>
        <div className="flex justify-center">
          <button
            onClick={handleFetchRoadmap}
            className="bg-[#00FF88] text-[#1A2A44] h-[50px] w-[400px] rounded-[42px] transition-all duration-300 ease-out transform hover:scale-105"
          >
            Take Test
          </button>
        </div>
      </div>

      {/* Second Section (70% height) */}
      <div className="h-[70%] rounded-[42px] bg-[#D9D9D9] flex flex-col justify-center p-10">
        <h2 className="text-2xl font-semibold text-gray-700 flex justify-center mb-4">
          Select Your Current Level
        </h2>
        <div className="space-y-2">
          {levels.map((level) => (
            <label
              key={level}
              className="flex items-center cursor-pointer space-x-2"
            >
              <div className="relative scale-75">
                <input
                  type="checkbox"
                  id={level}
                  className="peer hidden"
                  checked={selectedLevel === level}
                  onChange={() => handleLevelChange(level)}
                />
                <div
                  className="relative flex size-12 items-center justify-center overflow-hidden rounded-full 
            bg-gradient-to-tr from-[#00FF88] to-white p-2.5 duration-100 hover:p-2 scale-[80%]"
                >
                  <div
                    className={`size-full rounded-full bg-white transition-all ${
                      selectedLevel === level ? 'size-0' : 'size-full'
                    }`}
                  ></div>
                  <div
                    className={`absolute left-[1.1rem] h-[3px] w-[20px] rounded-sm bg-[#1A2A44] duration-300 
              ${
                selectedLevel === level
                  ? 'opacity-100 translate-x-0 translate-y-0 rotate-[-41deg]'
                  : 'opacity-0 translate-x-10 -translate-y-10'
              }`}
                  ></div>
                  <div
                    className={`absolute left-2.5 top-6 h-[3px] w-[12px] rounded-sm bg-[#1A2A44] duration-300 
              ${
                selectedLevel === level
                  ? 'opacity-100 translate-x-0 translate-y-0 rotate-[45deg]'
                  : 'opacity-0 -translate-x-10 -translate-y-10'
              }`}
                  ></div>
                </div>
              </div>
              <span className="text-gray-700">{level}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleKnowYourLevel}
            className="bg-[#00FF88] text-[#1A2A44] h-[50px] w-[400px] rounded-[42px] transition-all duration-300 ease-out transform hover:scale-105 text-[23px]"
          >
            Start the Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSection;