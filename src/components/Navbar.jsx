import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed bg-[#182c4d] shadow-lg h-[70px] w-full  z-[1000] ">
      <div className="w-full">
        <div className="flex justify-between">
          {/* Logo Section */}
          <div className="w-[30%] font-bold text-[#00FF88] pl-3 text-[24px] font-montserrat text-2xl p-1">
            <div className="block">SKILL</div>
            <div className="block">NAVIGATOR.</div>
          </div>

          {/* Links Section */}
          <div className="w-[70%] flex justify-between pr-10 pt-9 text-[#FFFFFF] text-[16px] font-montserrat">
            <Link to="/" className="transition duration-300">
              HOME
            </Link>
            <Link to="/program" className="transition duration-300">
              PROGRAMS
            </Link>
            <Link to="/career" className="transition duration-300">
              CAREER
            </Link>
            <Link to="/about" className="transition duration-300">
              ABOUT
            </Link>
            <Link to="/dashboard" className="transition duration-300">
              DASHBOARD
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;