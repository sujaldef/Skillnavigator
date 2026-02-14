import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaCheckCircle, FaFlag } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import QuestionCard from "./Componets/QuestionCard";
import LoadingAnimation from "./Componets/LoadingAnimation";
import FinishPopup from "./Componets/FinishPopup";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobRole, level, fieldName } = location.state || { jobRole: "", level: "", fieldName: "" };

  const [questions, setQuestions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQIndex, setCurrentQIndex] = useState(0); // Track active question
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Skills
  useEffect(() => {
    const fetchJobRoleSkills = async () => {
      try {
        const response = await fetch("/jobroleskills.json");
        if (!response.ok) throw new Error("Failed to load skills");
        const data = await response.json();
        const filteredSkills = data
          .filter((item) => item.jobrole === jobRole)
          .flatMap((item) => item.skills || []);
        setSkills(filteredSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    };
    if (jobRole) fetchJobRoleSkills();
  }, [jobRole]);

  // 2. Fetch Questions (Gemini)
  useEffect(() => {
    if (skills.length === 0) return;

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const prompt = `
          Generate 30 multiple-choice questions for "${jobRole}".
          Skills: ${JSON.stringify(skills)}
          Rules: 4 options, 1 correct answer, unique IDs.
       Return ONLY valid JSON.

DO NOT include explanations.
DO NOT include markdown.
DO NOT include text before or after.

Return strictly:

{
  "questions": [
    {
      "id": 1,
      "question": "...",
      "options": ["A","B","C","D"],
      "answer": "..."
    }
  ]
}
 `;

        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();

        if (!data.json || !data.json.questions) {
          console.error("Bad AI response:", data);
          setQuestions([]);   // prevents crash
          return;
        }
        
        setQuestions(data.json.questions);
        
      
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [skills, jobRole]);

  // Handlers
  const handleAnswerSelection = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  const handleConfirmFinish = () => {
    const results = questions.map((q) => ({
      skill: q.skill,
      question: q.question,
      userAnswer: answers[q.id],
      correctAnswer: q.answer,
      isCorrect: answers[q.id] === q.answer,
    }));
    navigate("/result", { state: { results, jobRole, level, fieldName } });
    setShowPopup(false);
  };

  if (loading) return <LoadingAnimation />;

  return (
    <div className="min-h-screen bg-[#0B1221] text-white font-sans overflow-hidden flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-[70px] h-screen overflow-hidden">

        {/* Left: Navigation Matrix (Hidden on mobile, usable on desktop) */}
        <div className="hidden lg:flex w-80 bg-[#0F172A] border-r border-[#1E293B] flex-col p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-1">{jobRole}</h2>
            <p className="text-[#00FF88] text-sm font-medium uppercase tracking-wider">Exam In Progress</p>
          </div>

          <div className="mb-4 text-xs text-gray-400 flex justify-between">
            <span>Progress</span>
            <span>{Math.round((Object.keys(answers).length / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-[#1E293B] h-2 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-[#00FF88] transition-all duration-500"
              style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
            />
          </div>

          <h3 className="text-sm text-gray-400 mb-4 font-bold uppercase">Question Matrix</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isActive = currentQIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(idx)}
                  className={`
                    h-10 rounded-md text-xs font-bold transition-all duration-200 border
                    ${isActive
                      ? "bg-[#00FF88] text-[#0B1221] border-[#00FF88] shadow-[0_0_10px_rgba(0,255,136,0.4)] scale-110 z-10"
                      : isAnswered
                        ? "bg-[#1A2A44] text-[#00FF88] border-[#00FF88]/30"
                        : "bg-[#1E293B] text-gray-500 border-transparent hover:bg-[#2A3B4D]"}
                  `}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowPopup(true)}
            className="mt-auto w-full py-4 bg-red-500/10 text-red-500 border border-red-500/50 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all"
          >
            Finish Exam
          </button>
        </div>

        {/* Right: Active Question Area */}
        <div className="flex-1 relative flex flex-col">
          {/* Top Bar (Mobile Nav + Progress) */}
          <div className="h-16 border-b border-[#1E293B] flex items-center justify-between px-6 lg:px-12 bg-[#0B1221]/95 backdrop-blur z-10">
            <span className="text-gray-400 text-sm">Question <span className="text-white font-bold text-lg">{currentQIndex + 1}</span> / {questions.length}</span>
            <div className="lg:hidden">
              <button onClick={() => setShowPopup(true)} className="text-red-500 text-sm font-bold">Finish</button>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-12 flex items-center justify-center relative">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#2E4057 1px, transparent 1px), linear-gradient(90deg, #2E4057 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="w-full max-w-3xl relative z-10">
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={currentQIndex}
                  question={questions[currentQIndex]}
                  total={questions.length}
                  index={currentQIndex}
                  selectedAnswer={answers[questions[currentQIndex]?.id]}
                  onAnswer={handleAnswerSelection}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Bar: Navigation */}
          <div className="h-20 border-t border-[#1E293B] bg-[#0F172A] px-6 lg:px-12 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${currentQIndex === 0 ? 'opacity-30 cursor-not-allowed text-gray-500' : 'text-white hover:bg-[#1E293B]'}`}
            >
              <FaChevronLeft /> Previous
            </button>

            {currentQIndex === questions.length - 1 ? (
              <button
                onClick={() => setShowPopup(true)}
                className="flex items-center gap-2 px-8 py-3 bg-[#00FF88] text-[#0B1221] rounded-full font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-all"
              >
                Submit All <FaCheckCircle />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-white text-[#0B1221] rounded-full font-bold hover:bg-[#00FF88] hover:shadow-lg transition-all"
              >
                Next Question <FaChevronRight />
              </button>
            )}
          </div>
        </div>
      </div>

      <FinishPopup
        show={showPopup}
        onConfirm={handleConfirmFinish}
        onCancel={() => setShowPopup(false)}
        answeredCount={Object.keys(answers).length}
        totalCount={questions.length}
      />
    </div>
  );
};

export default Quiz;