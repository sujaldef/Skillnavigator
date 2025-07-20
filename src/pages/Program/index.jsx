import { motion } from "framer-motion";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BrowserRouter as Router, Routes, Route, useNavigate,  Link } from "react-router-dom";
const Program = () => {
  return (
    <div className="min-h-screen  bg-[#1A2A44] font-montserrat">
        <Navbar />
    <div className="min-h-screen bg-[#1A2A44] text-white pt-[10%] py-16 px-8 md:px-16 lg:px-32">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Programs
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Explore our structured programs designed to upskill individuals across various domains and expertise levels.
      </motion.p>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-center ">
            <img src="/begginerlvl.jpg" alt="" className="w-[60%] h-[60%]  rounded-[45px] mb-6   " />
          </div>
          <h2 className="text-2xl font-semibold mb-3">📖 Beginner Programs</h2>
          <p className="text-gray-400">
            Get started with foundational skills and step into the tech world with confidence.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-center ">
            <img src="/expertlvl.jpg" alt="" className="w-[60%] h-[60%]    rounded-[45px] mb-6 " />
          </div>
          <h2 className="text-2xl font-semibold mb-3">🎓 Advanced Learning</h2>
          <p className="text-gray-400">
            Enhance your expertise with specialized training programs tailored for professionals.
          </p>
        </motion.div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Program;
