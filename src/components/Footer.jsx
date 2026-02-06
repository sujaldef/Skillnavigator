import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#152238] text-white pt-16 pb-8 px-6 border-t border-[#2E4057]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* Brand Column */}
        <div>
          <h3 className="text-2xl font-bold text-[#00FF88] mb-4">SKILL NAVIGATOR.</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Empowering professionals to navigate their careers through personalized learning paths, assessments, and community support.
          </p>
          <div className="flex space-x-4">
            <SocialIcon icon={<FaTwitter />} href="#" />
            <SocialIcon icon={<FaLinkedin />} href="#" />
            <SocialIcon icon={<FaInstagram />} href="#" />
            <SocialIcon icon={<FaGithub />} href="#" />
          </div>
        </div>

        {/* Links Columns */}
        <FooterColumn 
          title="Platform" 
          links={['Assessment', 'Learning Path', 'Resources', 'Community']} 
        />
        <FooterColumn 
          title="Company" 
          links={['About Us', 'Careers', 'Blog', 'Contact']} 
        />
        <FooterColumn 
          title="Legal" 
          links={['Terms of Service', 'Privacy Policy', 'Cookies', 'Licenses']} 
        />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#2E4057] flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2025 Skill Navigator. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="text-white font-semibold text-lg mb-4">{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link}>
          <a href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-gray-400 hover:text-[#00FF88] text-sm transition-colors duration-200">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 bg-[#2E4057] rounded-full flex items-center justify-center hover:bg-[#00FF88] hover:text-[#1A2A44] transition-all duration-300 transform hover:-translate-y-1"
  >
    {icon}
  </a>
);

export default Footer;