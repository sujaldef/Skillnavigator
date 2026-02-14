import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'CAREER', path: '/career' },
    { name: 'ABOUT', path: '/about' },
    
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${
        scrolled ? 'bg-[#182c4d]/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="group flex flex-col font-montserrat font-bold text-2xl">
          <span className="text-white group-hover:text-[#00FF88] transition-colors duration-300">
            SKILL
          </span>
          <span className="text-[#00FF88] text-lg -mt-1 tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
            NAVIGATOR.
          </span>
        </Link>

        {/* Links*/}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-white font-medium text-sm tracking-wide hover:text-[#00FF88] transition-colors duration-300 py-2"
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-[#00FF88]"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;