import { motion } from "framer-motion";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
const About = () => {
  return (
    <div className="min-h-screen  bg-[#1A2A44] font-montserrat">
      <Navbar />
   
      <div className=" text-white py-16 px-8 pt-[10%] md:px-16 lg:px-32 overflow-y-auto [&::-webkit-scrollbar]:w-3 
        [&::-webkit-scrollbar-track]:bg-[#D9D9D9] 
        [&::-webkit-scrollbar-thumb]:bg-[#00FF88] 
        [&::-webkit-scrollbar-thumb]:rounded-full 
        [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70] h-[100%]">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About SkillNavigator
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SkillNavigator is an intelligent skill assessment and learning
          platform designed to help individuals identify their strengths and
          weaknesses, personalize their learning journey, and track progress
          effectively.
        </motion.p>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-center ">
            <img src="/personalizeroadmap.jpg" alt="" className="w-[60%] h-[60%]  rounded-[45px] mb-6   " />
          </div>
            <h2 className="text-2xl font-semibold mb-3">
              🎯 Personalized Roadmaps
            </h2>
            <p className="text-gray-400">
              Receive AI-driven recommendations based on your skill level and
              career goals.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-center ">
            <img src="/DynamicSkillTesting.jpg" alt="" className="w-[60%] h-[60%]  rounded-[45px] mb-6   " />
          </div>
            <h2 className="text-2xl font-semibold mb-3">
              🧠 Dynamic Skill Testing
            </h2>
            <p className="text-gray-400">
              Take tests to determine your current expertise and receive
              targeted learning materials.
            </p>
          </motion.div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-center ">
            <img src="/progresstracking.jpg" alt="" className="w-[60%] h-[60%]  rounded-[45px] mb-6   " />
          </div>
            <h2 className="text-2xl font-semibold mb-3">
              📈 Progress Tracking
            </h2>
            <p className="text-gray-400">
              Monitor your improvements with skill analytics and adaptive
              learning paths.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-center ">
            <img src="/carreroopo.jpg" alt="" className="w-[60%] h-[60%]  rounded-[45px] mb-6   " />
          </div>
            <h2 className="text-2xl font-semibold mb-3">
              💼 Career Opportunities
            </h2>
            <p className="text-gray-400">
              Connect with top recruiters and upskill for the most in-demand job
              roles.
            </p>
          </motion.div>
        </div>
      </div>
      <div className=" text-center">
        <motion.h2
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet the Creator
        </motion.h2>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center ">
          <img
            src="/creator.jpg"
            alt="Creator"
            className=" rounded-full h-[300px] mb-4 md:mb-0 md:mr-6 border-4 border-[#00FF88] object-cover"
          />

          <div className="text-left ml-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-white">Sujal Koshta</h3>
            <p className="text-gray-400">Lead Developer & Architect</p>

            <p className="text-gray-400 mt-2">
              Passionate about building intelligent skill assessment platforms
              and personalized learning experiences.
            </p>
            <p className="text-gray-400 mt-2 ">
           sujalkoshtawork@gmail.com || 8109331808
            </p>
            <div className="flex gap-6 mt-4">
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img src="twitter_icon.png" alt="Twitter" className="h-8 w-8" />
        </a>
        <a
          href="https://www.linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img src="linkedin_icon.png" alt="LinkedIn" className="h-8 w-8" />
        </a>
        <a
          href="https://www.instagram.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img src="instagram_icon.png" alt="Instagram" className="h-8 w-8" />
        </a>
      </div>
           
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
