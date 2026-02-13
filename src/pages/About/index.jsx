import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { BiTargetLock, BiChip, BiData, BiNetworkChart } from 'react-icons/bi';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0B1221] font-sans text-white overflow-hidden selection:bg-[#00FF88] selection:text-[#0B1221]">
      <Navbar />

      <div className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Section 1: The Mission (HUD Style) */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              We Don't Just Teach. <br />
              <span className="text-[#00FF88]">We Calibrate.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed border-l-2 border-[#1E293B] pl-6">
              SkillNavigator is a precision engine for career development. We strip away the noise and focus on the data points that actually matter for your professional trajectory.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureBox icon={<BiTargetLock />} title="Precision Roadmaps" />
              <FeatureBox icon={<BiChip />} title="Adaptive Testing" />
              <FeatureBox icon={<BiData />} title="Live Analytics" />
              <FeatureBox icon={<BiNetworkChart />} title="Role Matching" />
            </div>
          </div>

          {/* Section 2: The Architect (3D Tilt Card) */}
          <div className="flex justify-center lg:justify-end perspective-1000">
             <TiltCard />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

// --- Sub-Component: HUD Feature Box ---
const FeatureBox = ({ icon, title }) => (
  <div className="flex items-center gap-3 p-4 border border-[#1E293B] bg-[#0F172A]/50 rounded-lg hover:border-[#00FF88] transition-colors group">
    <div className="text-gray-500 group-hover:text-[#00FF88] transition-colors text-xl">
      {icon}
    </div>
    <span className="font-mono text-sm tracking-wide text-gray-300 group-hover:text-white">{title}</span>
  </div>
);

// --- The "Crazy" 3D Tilt Card Component ---
const TiltCard = () => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;

    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-[500px] w-[380px] rounded-3xl bg-[#1A2A44]"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-[#0B1221] shadow-2xl border border-[#1E293B]"
      >
        {/* Creator Image Area */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-[#00FF88] border-dashed animate-spin-slow opacity-30"></div>
          <img 
            src="/creator.jpg" 
            alt="Creator" 
            className="w-full h-full object-cover rounded-full border-4 border-[#0B1221] shadow-2xl relative z-10"
          />
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#00FF88] rounded-full border-4 border-[#0B1221] z-20" />
        </div>

        {/* Text Content */}
        <div className="text-center px-8">
          <h2 className="text-3xl font-bold text-white mb-1">Sujal Koshta</h2>
          <p className="text-[#00FF88] font-mono text-xs uppercase tracking-[0.2em] mb-6">Lead Architect</p>
          
          <div className="flex justify-center gap-4 text-gray-400">
             <SocialLink href="#" icon={<FaTwitter />} />
             <SocialLink href="#" icon={<FaLinkedin />} />
             <SocialLink href="#" icon={<FaGithub />} />
             <SocialLink href="#" icon={<FaEnvelope />} />
          </div>

          <div className="mt-8 pt-6 border-t border-[#1E293B]">
             <p className="text-gray-500 text-xs font-mono">
               ID: SK-8109331808
               <br />
               STATUS: DEPLOYED
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    className="hover:text-[#00FF88] transition-colors transform hover:scale-110"
  >
    {icon}
  </a>
);

export default About;