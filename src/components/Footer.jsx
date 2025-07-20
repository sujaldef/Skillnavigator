import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1A2A44] text-white py-6 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        <div className="col-span-1">
          <p className="text-xl font-semibold text-[#00FF88] mb-2">SKILL NAVIGATOR</p>
          <p className="text-sm text-gray-400">
            Your comprehensive platform for professional skill development and career growth.
          </p>
        </div>
        <div className="col-span-1">
          <p className="text-sm font-semibold text-gray-300 mb-2">Platform</p>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><a href="#assessment" className="hover:text-[#00FF88] transition duration-300">Assessment</a></li>
            <li><a href="#learning-path" className="hover:text-[#00FF88] transition duration-300">Learning Path</a></li>
            <li><a href="#resources" className="hover:text-[#00FF88] transition duration-300">Resources</a></li>
            <li><a href="#community" className="hover:text-[#00FF88] transition duration-300">Community</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <p className="text-sm font-semibold text-gray-300 mb-2">Company</p>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><a href="#about-us" className="hover:text-[#00FF88] transition duration-300">About Us</a></li>
            <li><a href="#careers" className="hover:text-[#00FF88] transition duration-300">Careers</a></li>
            <li><a href="#blog" className="hover:text-[#00FF88] transition duration-300">Blog</a></li>
            <li><a href="#contact" className="hover:text-[#00FF88] transition duration-300">Contact</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <p className="text-sm font-semibold text-gray-300 mb-2">Legal</p>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><a href="#terms" className="hover:text-[#00FF88] transition duration-300">Terms</a></li>
            <li><a href="#privacy" className="hover:text-[#00FF88] transition duration-300">Privacy</a></li>
            <li><a href="#cookies" className="hover:text-[#00FF88] transition duration-300">Cookies</a></li>
            <li><a href="#licenses" className="hover:text-[#00FF88] transition duration-300">Licenses</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4 px-4 md:px-0">
        <p>© 2025 Skill Navigator. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF88] transition duration-300">
            <FaTwitter size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF88] transition duration-300">
            <FaLinkedin size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00FF88] transition duration-300">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;