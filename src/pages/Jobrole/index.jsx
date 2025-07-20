import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Popup from './Components/Popup';
import Footer from "../../components/Footer";
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    return <h1 className="text-white text-center mt-10">Something went wrong. Please try again later.</h1>;
  }
  return children;
};

const JobRole = () => {
  const { fieldName } = useParams();
  const [selectedLevel, setSelectedLevel] = useState("");
  const [jobRoles, setJobRoles] = useState([]);
  const [filteredJobRoles, setFilteredJobRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllRoles, setShowAllRoles] = useState(false);
  const navigate = useNavigate();
  const [selectedJobRole, setSelectedJobRole] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const levels = ["Novice", "Beginner", "Intermediate", "Advanced", "Expert"];

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const response = await fetch("/jobroleskills.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Fetched Data:", data);
        console.log("Field Name from URL:", fieldName);
        if (!fieldName) {
          console.warn("No fieldName provided in URL");
          return;
        }
        const fieldData = data
          .filter((item) => item.field.toLowerCase() === fieldName.toLowerCase().replace(/-/g, ' '))
          .map((item) => item.jobrole);
        const uniqueJobRoles = [...new Set(fieldData)];
        console.log("Unique Job Roles:", uniqueJobRoles);
        setJobRoles(uniqueJobRoles);
        setFilteredJobRoles(uniqueJobRoles);
      } catch (error) {
        console.error("Error fetching job roles:", error);
      }
    };
    fetchJobRoles();
  }, [fieldName]);

  useEffect(() => {
    const filtered = jobRoles
      .filter((role) => role.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.localeCompare(b));
    setFilteredJobRoles(filtered);
  }, [searchTerm, jobRoles]);

  const handleFieldClick = (roleName) => {
    setSelectedJobRole(roleName);
  };

  const handlePopupClose = () => setShowPopup(false);
  const handlePopupClose1 = () => setShowPopup1(false);

  const handleLevelChange = (level) => {
    setSelectedLevel(selectedLevel === level ? "" : level);
  };

  const handleKnowYourLevel = (event) => {
    event.preventDefault();
    if (!selectedJobRole) {
      setShowPopup(true);
      return;
    }
    if (!selectedLevel) {
      setShowPopup1(true);
      return;
    }
    navigate(`/level/${fieldName}/${selectedLevel}`, {
      state: { jobRole: selectedJobRole, level: selectedLevel },
    });
  };

  const handleFetchRoadmap = (event) => {
    event.preventDefault();
    if (!selectedJobRole) {
      setShowPopup(true);
      return;
    }
    navigate(`/Quiz/${selectedJobRole}`, {
      state: { jobRole: selectedJobRole },
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleShowAllRoles = () => {
    setShowAllRoles(!showAllRoles);
  };

  const displayedJobRoles = showAllRoles ? filteredJobRoles : filteredJobRoles.slice(0, 6);

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen w-screen  text-white">
        <Navbar />
        <div className="flex flex-col items-center pt-16 min-h-screen mb-8 mt-8 w-11/12 mx-auto">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Select a Job Role</h2>
          <div className="w-full mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search job roles..."
              className="w-full py-2 px-4 rounded-lg bg-[#2A3B4D] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF88] transition-all duration-300"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-4">
            {displayedJobRoles.length > 0 ? (
              displayedJobRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleFieldClick(role)}
                  className={`py-2 px-4 rounded-lg font-medium  transition-all duration-300 transform hover:scale-105 ${
                    selectedJobRole === role
                      ? 'bg-[#00FF88] text-[#1A2A44] shadow-md'
                      : 'bg-[#2A3B4D] text-white hover:bg-[#3A4B5D]'
                  }`}
                >
                  {role}
                </button>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center text-sm">No job roles found.</p>
            )}
          </div>
          {filteredJobRoles.length > 6 && (
            <button
              onClick={toggleShowAllRoles}
              className="mb-4 text-[#00FF88] hover:text-[#00CC70] font-medium text-sm transition-all duration-300"
            >
              {showAllRoles ? 'Show Less' : 'Show More'}
            </button>
          )}
          <h2 className="text-2xl font-bold mt-8 mb-4 tracking-tight">Choose Your Path</h2>
          <div className="flex flex-col lg:flex-row justify-center gap-20 w-full">
            <div className="bg-[#2A3B4D] p-6 rounded-2xl text-center w-full lg:w-1/3 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-3">
                <span className="text-4xl text-[#00FF88] animate-pulse">✏️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Take Assessment</h3>
              <p className="text-gray-300 mb-4 text-sm max-w-xs mx-auto">Evaluate your current knowledge level with a quick test.</p>
              <button
                onClick={handleFetchRoadmap}
                className="bg-[#00FF88] text-[#1A2A44] py-2 px-4 rounded-full w-full max-w-xs font-medium text-sm hover:bg-[#00CC70] transition-all duration-300 transform hover:scale-105"
              >
                Start Test
              </button>
            </div>
            <div className="bg-[#2A3B4D] p-6 rounded-2xl text-center w-full lg:w-1/3 shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-3">
                <span className="text-4xl text-[#00FF88] animate-pulse">📖</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Learning</h3>
              <p className="text-gray-300 mb-4 text-sm max-w-xs mx-auto">Begin your structured learning journey.</p>
              <div className="flex justify-center gap-2 mb-4 flex-wrap">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelChange(level)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      selectedLevel === level
                        ? 'bg-[#00FF88] text-[#1A2A44]'
                        : 'bg-[#3A4B5D] text-gray-300 hover:bg-[#4A5B6D]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <button
                onClick={handleKnowYourLevel}
                className="bg-[#00FF88] text-[#1A2A44] py-2 px-4 rounded-full w-full max-w-xs font-medium text-sm hover:bg-[#00CC70] transition-all duration-300 transform hover:scale-105"
              >
                Begin Learning
              </button>
            </div>
          </div>
        </div>
          <Footer/>
        <Popup
          show={showPopup}
          onClose={handlePopupClose}
          title="No Job Role Selected!"
          message="Please select a job role before proceeding."
        />
        <Popup
          show={showPopup1}
          onClose={handlePopupClose1}
          title="No Level Selected!"
          message="Please select a level before proceeding."
        />
      </div>
    </ErrorBoundary>
  );
};

export default JobRole;