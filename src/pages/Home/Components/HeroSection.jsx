import React from 'react';

const HeroSection = () => {
  return (
    <div className="h-[600px] w-full bg-[#1A2A44] flex items-center justify-between px-8 md:px-16">
      {/* Left Section */}
      <div className="text-white font-bold text-[48px] md:text-[70px] text-left">
        <div className="block">LEARN</div>
        <div className="block">PRACTICE</div>
        <div className="block">ACCOMPLISH</div>
      </div>

      {/* Right Section (Image) */}
      <div className="flex justify-end w-1/2">
        <img
          src="/computer.jpg"
          alt="Learning Setup"
          className="max-w-[400px] md:max-w-[500px] mt-20 rounded-[30px] shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;