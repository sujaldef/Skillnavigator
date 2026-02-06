import { motion } from "framer-motion";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Program = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[#1A2A44] font-montserrat flex flex-col">
      <Navbar />
      
      {/* Decorative Background Blob */}
      <div className="fixed top-20 left-0 w-[500px] h-[500px] bg-[#00FF88]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-grow text-white pt-[120px] pb-16 px-6 md:px-16 lg:px-32 relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-emerald-500">Programs</span>
          </motion.h1>

          <motion.p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Curated learning paths designed to take you from novice to expert. Choose your difficulty level and start building.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Beginner Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, boxShadow: "0px 10px 30px -10px rgba(0, 255, 136, 0.3)" }}
            className="group bg-[#233554]/80 backdrop-blur-md border border-[#2E4057] p-8 rounded-[30px] transition-all duration-300"
          >
            <div className="h-64 overflow-hidden rounded-[20px] mb-6 relative">
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44] to-transparent opacity-60 z-10" />
               <img 
                 src="/begginerlvl.jpg" 
                 alt="Beginner" 
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
               />
               <div className="absolute bottom-4 left-4 z-20 bg-[#00FF88] text-[#1A2A44] text-xs font-bold px-3 py-1 rounded-full uppercase">
                 Entry Level
               </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-3 group-hover:text-[#00FF88] transition-colors">📖 Beginner Programs</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Get started with foundational skills. Perfect for those taking their first step into the tech world.
            </p>
            <button className="w-full py-3 rounded-xl border border-[#00FF88] text-[#00FF88] font-bold hover:bg-[#00FF88] hover:text-[#1A2A44] transition-all">
              Start Basics
            </button>
          </motion.div>

          {/* Expert Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, boxShadow: "0px 10px 30px -10px rgba(59, 130, 246, 0.3)" }}
            className="group bg-[#233554]/80 backdrop-blur-md border border-[#2E4057] p-8 rounded-[30px] transition-all duration-300"
          >
            <div className="h-64 overflow-hidden rounded-[20px] mb-6 relative">
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A44] to-transparent opacity-60 z-10" />
               <img 
                 src="/expertlvl.jpg" 
                 alt="Expert" 
                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
               />
               <div className="absolute bottom-4 left-4 z-20 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                 Professional
               </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-3 group-hover:text-blue-400 transition-colors">🎓 Advanced Learning</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Deep dive into complex topics. Enhancement programs tailored for experienced professionals.
            </p>
            <button className="w-full py-3 rounded-xl border border-blue-500 text-blue-400 font-bold hover:bg-blue-500 hover:text-white transition-all">
              Go Advanced
            </button>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Program;