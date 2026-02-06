import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import axios from "axios";
import { 
  FaRobot, FaBookOpen, FaFilePdf, FaYoutube, FaProjectDiagram, FaQuestionCircle, 
  FaChevronRight, FaChevronLeft, FaSearch, FaTimes, FaGraduationCap, FaFlask 
} from "react-icons/fa";
import Navbar from "../../components/Navbar"; 

// --- Sub-Component: Loading Spinner ---
const BouncingBall = () => (
  <div className="flex justify-center items-center h-full">
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="w-4 h-4 bg-[#00FF88] rounded-full mr-2"
    />
    <motion.div
      animate={{ y: [10, -10, 10] }}
      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
      className="w-4 h-4 bg-blue-500 rounded-full mr-2"
    />
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
      className="w-4 h-4 bg-purple-500 rounded-full"
    />
  </div>
);

// --- Sub-Component: AI Chat Drawer ---
const AIChatDrawer = ({ isOpen, onClose, input, setInput, response, loading, onSubmit }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40]"
          />
          {/* Drawer */}
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-[70px] bottom-0 w-full md:w-[500px] bg-[#0F172A] border-l border-[#1E293B] shadow-2xl z-[50] flex flex-col"
          >
            <div className="p-4 border-b border-[#1E293B] flex justify-between items-center bg-[#0B1221]">
              <div className="flex items-center gap-2 text-[#00FF88]">
                <FaRobot size={24} />
                <h2 className="font-bold text-lg text-white">AI Tutor</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white"><FaTimes size={20}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#0F172A]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                   <BouncingBall />
                   <p className="mt-4 text-sm font-mono">Analyzing Request...</p>
                </div>
              ) : response ? (
                <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{response}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-20">
                  <FaRobot size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Ask me anything about your course!</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#1E293B] bg-[#0B1221]">
              <form onSubmit={onSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-[#1A2A44] text-white border border-[#2E4057] rounded-full pl-6 pr-12 py-3 focus:outline-none focus:border-[#00FF88] focus:ring-1 focus:ring-[#00FF88]"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 p-2 bg-[#00FF88] text-[#0B1221] rounded-full hover:scale-105 transition-transform"
                >
                  <FaChevronRight />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Page Component ---
const StudyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State from Navigation
  const { jobRole = "Student", level = "Beginner", fieldName = "General" } = location.state || {};

  // Local State
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [activeTab, setActiveTab] = useState("Theory");
  const [studyMaterial, setStudyMaterial] = useState("");
  const [materialLoading, setMaterialLoading] = useState(false);
  
  // AI Chat State
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Sidebar Toggle
  const [expandedSkills, setExpandedSkills] = useState({});

  // 1. Fetch Skills on Load
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/jobroleskills.json");
        const data = await res.json();
        const roleData = data.filter(item => item.jobrole === jobRole).map(s => ({
            ...s,
            subtopics: s.subtopics || ["Introduction", "Core Concepts", "Advanced Usage"] // Fallback if empty
        }));
        setSkills(roleData);
      } catch (err) {
        console.error("Failed to load skills", err);
      }
    };
    if (jobRole) fetchSkills();
  }, [jobRole]);

  // 2. Fetch Content Handler
  const fetchContent = async (tab, skill, subtopic) => {
    if (!skill || !subtopic) return;
    setMaterialLoading(true);
    setStudyMaterial("");
    
    // Prompts based on tab
    const prompts = {
      Theory: `Explain "${subtopic}" in the context of "${skill}" for a "${level}" level student. Use clear markdown with headers and bullet points.`,
      PDF: `List 5 high-quality downloadable PDF resources or cheat sheets for learning "${subtopic}" in "${skill}".`,
      Lecture: `Suggest a curated list of YouTube video titles and search terms for "${subtopic}" in "${skill}".`,
      Projects: `Propose 3 hands-on mini-projects to master "${subtopic}" in "${skill}".`,
      Questions: `Generate 5 interview-style questions and answers for "${subtopic}" in "${skill}".`
    };

    try {
      const res = await axios.post("http://localhost:5000/generate", { prompt: prompts[tab] });
      setStudyMaterial(res.data.text || "No content generated. Try again.");
    } catch (error) {
      console.error(error);
      setStudyMaterial("## Error\nCould not fetch content from AI. Please check your connection.");
    } finally {
      setMaterialLoading(false);
    }
  };

  // 3. Handlers
  const handleSkillSelect = (skillName, subtopic) => {
    setSelectedSkill(skillName);
    setSelectedSubtopic(subtopic);
    fetchContent(activeTab, skillName, subtopic);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (selectedSkill && selectedSubtopic) {
        fetchContent(tab, selectedSkill, selectedSubtopic);
    }
  };

  const handleTakeQuiz = (skillName) => {
    // Navigate to the Quiz page we built earlier
    navigate("/quiz", { state: { jobRole, level, fieldName, skillName } });
  };

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    setAiLoading(true);
    try {
        const res = await axios.post("http://localhost:5000/generate", { prompt: aiInput });
        setAiResponse(res.data.text);
    } catch (e) {
        setAiResponse("AI is currently offline. Please try again later.");
    } finally {
        setAiLoading(false);
    }
  };

  // --- Render ---
  return (
    <div className="flex flex-col h-screen bg-[#0B1221] text-white font-sans overflow-hidden">
     
      
      <div className="flex flex-1  overflow-hidden">
        
        {/* === LEFT SIDEBAR: Syllabus & Roadmap === */}
        <div className="w-80 hidden md:flex flex-col border-r border-[#1E293B] bg-[#0F172A]">
            <div className="p-6 border-b border-[#1E293B]">
                <h2 className="text-xl font-bold text-white mb-1">{jobRole}</h2>
                <div className="flex items-center gap-2 text-xs text-[#00FF88] uppercase tracking-wider font-bold">
                    <FaGraduationCap /> {level} Path
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {skills.map((skill, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden border border-[#2E4057] bg-[#1A2A44]/30">
                        {/* Skill Header */}
                        <div 
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#1A2A44] transition-colors"
                            onClick={() => setExpandedSkills(prev => ({...prev, [idx]: !prev[idx]}))}
                        >
                            <span className="font-semibold text-sm">{skill.skills}</span>
                            <FaChevronRight 
                                className={`transform transition-transform text-gray-400 ${expandedSkills[idx] ? 'rotate-90' : ''}`} 
                                size={12}
                            />
                        </div>

                        {/* Subtopics List */}
                        <AnimatePresence>
                            {expandedSkills[idx] && (
                                <motion.div 
                                    initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                                    className="overflow-hidden bg-[#0B1221]"
                                >
                                    {skill.subtopics.map((sub, sIdx) => (
                                        <div 
                                            key={sIdx}
                                            onClick={() => handleSkillSelect(skill.skills, sub)}
                                            className={`
                                                pl-8 pr-4 py-3 text-xs border-l-2 cursor-pointer flex justify-between group transition-all
                                                ${selectedSubtopic === sub && selectedSkill === skill.skills
                                                    ? "border-[#00FF88] bg-[#00FF88]/10 text-[#00FF88]" 
                                                    : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"}
                                            `}
                                        >
                                            <span>{sub}</span>
                                            <FaChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                    {/* Action Footer for Skill */}
                                    <div className="p-3 bg-[#1A2A44]/50 flex justify-center">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleTakeQuiz(skill.skills); }}
                                            className="w-full py-2 text-xs font-bold text-[#0B1221] bg-[#00FF88] rounded-lg hover:bg-[#00CC70] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaFlask /> Take {skill.skills} Quiz
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>

        {/* === CENTER: Study Content === */}
        <div className="flex-1 flex flex-col relative bg-[#0B1221]">
            
            {/* Top Bar: Tabs & AI Trigger */}
            <div className="h-16 border-b border-[#1E293B] bg-[#0B1221]/95 backdrop-blur flex items-center justify-between px-6">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {[
                        { id: "Theory", icon: FaBookOpen },
                        { id: "PDF", icon: FaFilePdf },
                        { id: "Lecture", icon: FaYoutube },
                        { id: "Projects", icon: FaProjectDiagram },
                        { id: "Questions", icon: FaQuestionCircle }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap
                                ${activeTab === tab.id 
                                    ? "bg-[#00FF88] text-[#0B1221] shadow-[0_0_15px_rgba(0,255,136,0.3)]" 
                                    : "bg-[#1A2A44] text-gray-400 hover:text-white hover:bg-[#2E4057]"}
                            `}
                        >
                            <tab.icon /> {tab.id}
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={() => setIsAIChatOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/50 rounded-full hover:bg-blue-600 hover:text-white transition-all ml-4"
                >
                    <FaRobot /> <span className="hidden sm:inline">Ask AI</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-8 relative">
                {!selectedSkill ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
                        <FaBookOpen size={64} className="mb-4" />
                        <h3 className="text-xl font-bold">Select a topic from the sidebar</h3>
                        <p>Your personalized learning roadmap awaits.</p>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                             <h1 className="text-3xl font-bold text-white mb-2">{selectedSubtopic}</h1>
                             <p className="text-[#00FF88] text-sm uppercase tracking-wide font-bold">{selectedSkill} Module</p>
                        </div>
                        
                        <div className="bg-[#1A2A44]/40 border border-[#2E4057] rounded-3xl p-8 shadow-xl min-h-[400px]">
                            {materialLoading ? (
                                <div className="flex flex-col items-center justify-center h-64">
                                    <BouncingBall />
                                    <p className="mt-4 text-gray-400 animate-pulse">Generating personalized {activeTab}...</p>
                                </div>
                            ) : (
                                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-[#00FF88] prose-strong:text-[#00FF88]">
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{studyMaterial}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>

      </div>

      {/* AI Drawer Component */}
      <AIChatDrawer 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
        input={aiInput}
        setInput={setAiInput}
        response={aiResponse}
        loading={aiLoading}
        onSubmit={handleAISubmit}
      />
    </div>
  );
};

export default StudyPage;