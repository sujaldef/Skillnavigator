import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from '../../components/Navbar';
import Popup from './Components/Popup';
import Footer from "../../components/Footer";

// Error Boundary Component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Error caught by boundary:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0F1C2E] to-[#1A2A44]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-4"
          >
            ⚠️
          </motion.div>
          <h1 className="text-white text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-400 mb-6">We're sorry for the inconvenience</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-[#00FF88] to-[#00CC70] text-[#1A2A44] rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Refresh Page
          </button>
        </motion.div>
      </div>
    );
  }

  return children;
};

// Main Component
const JobRole = () => {
  const { fieldName } = useParams();
  const navigate = useNavigate();

  // State Management
  const [state, setState] = useState({
    selectedLevel: "",
    jobRoles: [],
    filteredJobRoles: [],
    searchTerm: "",
    showAllRoles: false,
    loading: true,
    selectedJobRole: null,
    aiSuggestion: "",
    showPopup: false,
    showPopup1: false,
  });

  // Level Configuration
  const levels = useMemo(() => [
    { name: "Novice", description: "Just starting out", icon: "🌱" },
    { name: "Beginner", description: "Learning basics", icon: "📚" },
    { name: "Intermediate", description: "Building skills", icon: "🔧" },
    { name: "Advanced", description: "Proficient level", icon: "⚡" },
    { name: "Expert", description: "Master level", icon: "🏆" }
  ], []);

  // AI Suggestions Pool
  const aiSuggestions = useMemo(() => ({
    default: "Based on current market trends, this role is highly in demand",
    selected: "Great choice! This role offers excellent career prospects",
    expert: "Expert-level positions typically require 5+ years of experience",
    beginner: "Perfect starting point for beginners with foundational resources"
  }), []);

  // Fetch Job Roles
  useEffect(() => {
    const fetchJobRoles = async () => {
      setState(prev => ({ ...prev, loading: true }));

      try {
        const response = await fetch("/jobroleskills.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!fieldName) {
          console.warn("No fieldName provided in URL");
          setState(prev => ({ ...prev, loading: false }));
          return;
        }

        const normalizedFieldName = fieldName.toLowerCase().replace(/-/g, ' ');
        const fieldData = data
          .filter(item => item.field.toLowerCase() === normalizedFieldName)
          .map(item => item.jobrole);

        const uniqueJobRoles = [...new Set(fieldData)].sort((a, b) => a.localeCompare(b));

        setState(prev => ({
          ...prev,
          jobRoles: uniqueJobRoles,
          filteredJobRoles: uniqueJobRoles,
          loading: false,
          aiSuggestion: uniqueJobRoles.length > 0
            ? `${aiSuggestions.default} in ${fieldName.replace(/-/g, ' ')}`
            : ""
        }));
      } catch (error) {
        console.error("Error fetching job roles:", error);
        setState(prev => ({
          ...prev,
          loading: false,
          aiSuggestion: "Unable to load roles. Please try again."
        }));
      }
    };

    fetchJobRoles();
  }, [fieldName, aiSuggestions]);

  // Filter Job Roles by Search Term
  useEffect(() => {
    const filtered = state.jobRoles
      .filter(role => role.toLowerCase().includes(state.searchTerm.toLowerCase()))
      .sort((a, b) => a.localeCompare(b));

    setState(prev => ({ ...prev, filteredJobRoles: filtered }));
  }, [state.searchTerm, state.jobRoles]);

  // Handlers
  const handleFieldClick = useCallback((roleName) => {
    setState(prev => ({
      ...prev,
      selectedJobRole: roleName,
      aiSuggestion: `${aiSuggestions.selected} - ${roleName}`
    }));
  }, [aiSuggestions]);

  const handleLevelChange = useCallback((levelName) => {
    setState(prev => {
      const newLevel = prev.selectedLevel === levelName ? "" : levelName;
      const suggestion = newLevel
        ? `${levelName} level selected. ${aiSuggestions[levelName.toLowerCase()] || aiSuggestions.default}`
        : prev.aiSuggestion;

      return {
        ...prev,
        selectedLevel: newLevel,
        aiSuggestion: suggestion
      };
    });
  }, [aiSuggestions]);

  const handleSearchChange = useCallback((event) => {
    setState(prev => ({ ...prev, searchTerm: event.target.value }));
  }, []);

  const handleKnowYourLevel = useCallback((event) => {
    event.preventDefault();

    if (!state.selectedJobRole) {
      setState(prev => ({ ...prev, showPopup: true }));
      return;
    }

    if (!state.selectedLevel) {
      setState(prev => ({ ...prev, showPopup1: true }));
      return;
    }

    navigate(`/level/${fieldName}/${state.selectedLevel}`, {
      state: { jobRole: state.selectedJobRole, level: state.selectedLevel }
    });
  }, [state.selectedJobRole, state.selectedLevel, fieldName, navigate]);

  const handleFetchRoadmap = useCallback((event) => {
    event.preventDefault();

    if (!state.selectedJobRole) {
      setState(prev => ({ ...prev, showPopup: true }));
      return;
    }

    navigate(`/Quiz/${state.selectedJobRole}`, {
      state: { jobRole: state.selectedJobRole }
    });
  }, [state.selectedJobRole, navigate]);

  const toggleShowAllRoles = useCallback(() => {
    setState(prev => ({ ...prev, showAllRoles: !prev.showAllRoles }));
  }, []);

  const closePopup = useCallback(() => {
    setState(prev => ({ ...prev, showPopup: false }));
  }, []);

  const closePopup1 = useCallback(() => {
    setState(prev => ({ ...prev, showPopup1: false }));
  }, []);

  // Computed Values
  const displayedJobRoles = state.showAllRoles
    ? state.filteredJobRoles
    : state.filteredJobRoles.slice(0, 6);

  const displayFieldName = fieldName?.replace(/-/g, ' ').toUpperCase() || "CAREER PATH";

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0F1C2E] via-[#1A2A44] to-[#0F1C2E] text-white">
        <Navbar />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center pt-24 pb-16 min-h-screen w-11/12 max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 w-full"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00FF88] to-[#00CC70] bg-clip-text text-transparent">
              {displayFieldName}
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Choose your career path and start your journey
            </p>
          </motion.div>

          {/* Job Roles Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full mb-12"
          >
            <div className="bg-gradient-to-br from-[#2E4057] to-[#1A2A44] rounded-3xl p-6 md:p-8 shadow-2xl border border-[#00FF88]/10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-[#00FF88] to-[#00CC70] rounded-full" />
                  <span className="hidden sm:inline">Select Your Role</span>
                  <span className="sm:hidden">Roles</span>
                </h2>
                <div className="text-xs md:text-sm text-gray-400 bg-[#1A2A44]/50 px-3 py-1 rounded-full">
                  {state.filteredJobRoles.length} {state.filteredJobRoles.length === 1 ? 'role' : 'roles'}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={state.searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search job roles..."
                  className="w-full py-3 md:py-4 pl-12 pr-12 rounded-xl bg-[#1A2A44] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FF88] transition-all duration-300 border border-transparent hover:border-[#00FF88]/20"
                  aria-label="Search job roles"
                />
                <AnimatePresence>
                  {state.searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setState(prev => ({ ...prev, searchTerm: '' }))}
                      className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white transition-colors"
                      aria-label="Clear search"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Job Roles Grid */}
              {state.loading ? (
                <div className="flex flex-col justify-center items-center h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-[#00FF88] border-t-transparent rounded-full mb-4"
                  />
                  <p className="text-gray-400 text-sm">Loading roles...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
                    <AnimatePresence mode="popLayout">
                      {displayedJobRoles.length > 0 ? (
                        displayedJobRoles.map((role, index) => (
                          <motion.button
                            key={role}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                              delay: index * 0.03,
                              layout: { duration: 0.3 }
                            }}
                            onClick={() => handleFieldClick(role)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-4 rounded-xl font-medium transition-all duration-300 overflow-hidden group ${state.selectedJobRole === role
                                ? 'bg-gradient-to-br from-[#00FF88] to-[#00CC70] text-[#1A2A44] shadow-lg shadow-[#00FF88]/30'
                                : 'bg-[#1A2A44] text-white hover:bg-[#2A3B4D] border border-transparent hover:border-[#00FF88]/30'
                              }`}
                            aria-pressed={state.selectedJobRole === role}
                          >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                            <div className="relative flex items-center justify-between">
                              <span className="text-left text-sm md:text-base">{role}</span>
                              <AnimatePresence>
                                {state.selectedJobRole === role && (
                                  <motion.svg
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="w-5 h-5 flex-shrink-0 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </motion.svg>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.button>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="col-span-full text-center py-12"
                        >
                          <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-gray-400 text-lg font-semibold mb-2">No job roles found</p>
                          <p className="text-gray-500 text-sm">Try adjusting your search or browse all roles</p>
                          {state.searchTerm && (
                            <button
                              onClick={() => setState(prev => ({ ...prev, searchTerm: '' }))}
                              className="mt-4 text-[#00FF88] hover:text-[#00CC70] text-sm font-medium"
                            >
                              Clear search
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Show More/Less Button */}
                  {state.filteredJobRoles.length > 6 && (
                    <motion.button
                      onClick={toggleShowAllRoles}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 text-[#00FF88] hover:text-[#00CC70] font-medium text-sm transition-colors duration-300 flex items-center justify-center gap-2 group"
                      aria-expanded={state.showAllRoles}
                    >
                      <span>
                        {state.showAllRoles
                          ? 'Show Less'
                          : `Show ${state.filteredJobRoles.length - 6} More`}
                      </span>
                      <motion.svg
                        animate={{ y: state.showAllRoles ? 0 : [0, 3, 0] }}
                        transition={{ duration: 1, repeat: state.showAllRoles ? 0 : Infinity }}
                        className={`w-5 h-5 transition-transform duration-300 ${state.showAllRoles ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </motion.button>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* Path Selection Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Choose Your Path
            </h2>

            {/* Added items-stretch to ensure equal height */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
              
              {/* Assessment Card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                // Added h-full and flex flex-col to make container fill height
                className="h-full flex flex-col bg-gradient-to-br from-[#2E4057] to-[#1A2A44] rounded-3xl p-6 md:p-8 shadow-2xl border border-[#00FF88]/10 relative overflow-hidden group"
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Inner wrapper with flex-grow to push content properly */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#00FF88] to-[#00CC70] rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-[#1A2A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <div className="px-3 md:px-4 py-1 md:py-2 bg-[#00FF88]/10 text-[#00FF88] text-xs font-semibold rounded-full border border-[#00FF88]/30">
                        AI-Powered
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3">Take Assessment</h3>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                      Evaluate your current knowledge level with our AI-powered assessment. Get personalized insights and recommendations based on your performance.
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-6">
                      {['Adaptive questioning', 'Instant feedback', 'Skill gap analysis'].map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-3 text-sm text-gray-300"
                        >
                          <div className="w-5 h-5 bg-[#00FF88]/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    onClick={handleFetchRoadmap}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!state.selectedJobRole}
                    className={`w-full py-3 md:py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 group ${state.selectedJobRole
                        ? 'bg-gradient-to-r from-[#00FF88] to-[#00CC70] text-[#1A2A44] hover:shadow-lg hover:shadow-[#00FF88]/30'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
                      }`}
                  >
                    <span>Start Assessment</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>

              {/* Learning Path Card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                // Added h-full and flex flex-col to make container fill height
                className="h-full flex flex-col bg-gradient-to-br from-[#2E4057] to-[#1A2A44] rounded-3xl p-6 md:p-8 shadow-2xl border border-[#00FF88]/10 relative overflow-hidden group"
              >
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Inner wrapper with flex-grow to push content properly */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#00FF88] to-[#00CC70] rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-[#1A2A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="px-3 md:px-4 py-1 md:py-2 bg-[#00FF88]/10 text-[#00FF88] text-xs font-semibold rounded-full border border-[#00FF88]/30">
                        Personalized
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3">Start Learning</h3>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                      Begin your structured learning journey with curated resources tailored to your skill level. Choose your starting point below.
                    </p>

                    {/* Level Selection */}
                    <div className="space-y-2 mb-6">
                      <p className="text-sm font-semibold text-gray-400 mb-3">Select Your Level</p>
                      <div className="max-h-64 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                        {levels.map((level, index) => (
                          <motion.button
                            key={level.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            onClick={() => handleLevelChange(level.name)}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full p-3 md:p-4 rounded-xl transition-all duration-300 flex items-center justify-between group/level ${state.selectedLevel === level.name
                                ? 'bg-gradient-to-r from-[#00FF88] to-[#00CC70] text-[#1A2A44] shadow-lg'
                                : 'bg-[#1A2A44] text-white hover:bg-[#2A3B4D] border border-transparent hover:border-[#00FF88]/30'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full transition-all ${state.selectedLevel === level.name
                                  ? 'bg-[#1A2A44]'
                                  : 'bg-gray-600 group-hover/level:bg-[#00FF88]'
                                }`} />
                              <div className="text-left">
                                <div className="font-semibold text-sm md:text-base">{level.name}</div>
                                <div className={`text-xs ${state.selectedLevel === level.name ? 'opacity-80' : 'text-gray-400'}`}>
                                  {level.description}
                                </div>
                              </div>
                            </div>
                            <AnimatePresence>
                              {state.selectedLevel === level.name && (
                                <motion.svg
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 180 }}
                                  transition={{ type: "spring", stiffness: 200 }}
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </motion.svg>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleKnowYourLevel}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!state.selectedJobRole || !state.selectedLevel}
                    className={`w-full py-3 md:py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 group ${state.selectedJobRole && state.selectedLevel
                        ? 'bg-gradient-to-r from-[#00FF88] to-[#00CC70] text-[#1A2A44] hover:shadow-lg hover:shadow-[#00FF88]/30'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
                      }`}
                  >
                    <span>Begin Learning</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <Footer />

        {/* Popups */}
        <Popup
          show={state.showPopup}
          onClose={closePopup}
          title="No Job Role Selected"
          message="Please select a job role before proceeding with your learning path."
          type="warning"
        />
        <Popup
          show={state.showPopup1}
          onClose={closePopup1}
          title="No Level Selected"
          message="Please select your skill level to get personalized learning recommendations."
          type="warning"
        />
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1A2A44;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #00FF88, #00CC70);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #00CC70, #00AA5A);
        }
      `}</style>
    </ErrorBoundary>
  );
};

export default JobRole;