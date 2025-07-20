import { motion } from "framer-motion";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BrowserRouter as Router, Routes, Route, useNavigate,  Link } from "react-router-dom";
const Career = () => {
  return (
    <div className="min-h-screen  bg-[#1A2A44] font-montserrat">
     <Navbar/>
    <div className="min-h-screen bg-[#1A2A44] text-white py-16 pt-[10%] px-8 md:px-16 lg:px-32">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Career Growth with SkillNavigator
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Explore career opportunities and prepare for your dream job with personalized skill assessments, industry insights, and expert guidance.
      </motion.p>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-center ">
            <img src="/Job_Role_Insights.jpg" alt="" className="w-[80%] h-[60%]  rounded-[45px] mb-6   " />
          </div>
          <h2 className="text-2xl font-semibold mb-3"> Job Role Insights</h2>
          <p className="text-gray-400">
            Learn about trending job roles and the skills required to excel in them.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex justify-center ">
            <img src="/Skill_Based_Learning.jpg" alt="" className="w-[80%] h-[60%]  rounded-[45px] mb-6   " />
          </div>
          <h2 className="text-2xl font-semibold mb-3"> Skill-Based Learning</h2>
          <p className="text-gray-400">
            Upgrade your skills through expert-curated courses and assessments.
          </p>
        </motion.div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Career;
