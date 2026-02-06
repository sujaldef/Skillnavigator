import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Navbar from "../../components/Navbar";
import Sidebar from "./Components/Sidebar";
import ContentSection from "./Components/ContentSection";
import AskAISection from "./Components/AskAISection";

const Study = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [askAiLoading, setAskAiLoading] = useState(false);
  const [materialLoading, setMaterialLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Theory");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [studyMaterial, setStudyMaterial] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [skills, setSkills] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { jobRole, level, fieldName } = location.state || {
    jobRole: "",
    level: "",
    fieldName: "",
  };

  /* ------------------------------------
     Navigation
  -------------------------------------*/
  const handleTakeTestClick = (skill) => {
    navigate(`/quiz/${skill}`, {
      state: { skillName: skill, progress: 0, jobRole, level, fieldName },
    });
  };

  /* ------------------------------------
     Progress calculation
  -------------------------------------*/
  const calculateProgress = (segmentation, level) => {
    const levelOrder = [
      "Novice",
      "Beginner",
      "Intermediate",
      "Advanced",
      "Expert",
    ];
    const segmentOrder = [
      "Invoice Level",
      "Beginner Level",
      "Intermediate Level",
      "Advanced Level",
      "Expert Level",
    ];

    const levelIndex = levelOrder.indexOf(level);
    const segmentIndex = segmentOrder.indexOf(segmentation);

    if (levelIndex === -1 || segmentIndex === -1) return 0;

    if (level === "Novice") return 0;
    if (level === "Beginner") return segmentation === "Invoice Level" ? 90 : 0;
    if (level === "Intermediate") return segmentIndex <= 1 ? 80 : 0;
    if (level === "Advanced") return segmentIndex <= 2 ? 80 : 0;
    if (level === "Expert") return 80;

    return 0;
  };

  /* ------------------------------------
     Fetch job role skills
  -------------------------------------*/
  useEffect(() => {
    const fetchJobRoleSkills = async () => {
      try {
        const response = await fetch("/jobroleskills.json");
        const data = await response.json();
        const filteredSkills = data
          .filter((item) => item.jobrole === jobRole)
          .map((skill) => ({
            ...skill,
            subtopics: skill.subtopics || ["No subtopics available"],
          }));
        setSkills(filteredSkills);
      } catch (error) {
        console.error("Error fetching job role skills:", error);
      }
    };

    if (jobRole) fetchJobRoleSkills();
  }, [jobRole]);

  /* ------------------------------------
     Ask AI (proxy)
  -------------------------------------*/
  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAskAiLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        prompt: input,
      });

      setResponse(res.data.text || "No response received.");
    } catch (error) {
      console.error("Ask AI error:", error);
      setResponse("Error fetching response. Please try again.");
    } finally {
      setAskAiLoading(false);
    }
  };

  /* ------------------------------------
     Study material
  -------------------------------------*/
  const handleTuteClick = (skill, subtopic) => {
    setSelectedSkill(skill);
    setSelectedSubtopic(subtopic);
    setIsSidebarOpen(false);
    fetchStudyMaterial("Theory", skill, subtopic);
  };

  const fetchStudyMaterial = async (tab, skill, subtopic) => {
    if (!skill || !subtopic) return;

    setMaterialLoading(true);
    setStudyMaterial("");
    setActiveTab(tab);

    const prompts = {
      Theory: `Create a comprehensive, in-depth explanation of "${subtopic}" in "${skill}".`,
      PDF: `Provide high-quality PDF resources for "${subtopic}" in "${skill}".`,
      Projects: `List real-world projects for "${subtopic}" in "${skill}".`,
      Lecture: `Suggest top lectures or YouTube playlists for "${subtopic}" in "${skill}".`,
      Questions: `Generate practice questions for "${subtopic}" in "${skill}".`,
    };

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        prompt: prompts[tab],
      });

      setStudyMaterial(res.data.text || "No content received.");
    } catch (error) {
      console.error("Study material error:", error);
      setStudyMaterial("Error fetching content. Please try again.");
    } finally {
      setMaterialLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    if (!selectedSkill || !selectedSubtopic) {
      alert("Please select a skill and subtopic first!");
      return;
    }
    fetchStudyMaterial(tab, selectedSkill, selectedSubtopic);
  };

  /* ------------------------------------
     UI
  -------------------------------------*/
  return (
    <div className="flex h-screen w-screen overflow-hidden font-montserrat">
      <Navbar />
      <div className="flex h-screen overflow-hidden relative">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          skills={skills}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          calculateProgress={calculateProgress}
          handleTakeTestClick={handleTakeTestClick}
          handleTuteClick={handleTuteClick}
          level={level}
        />

        <AskAISection
          isAskAIOpen={isAskAIOpen}
          setIsAskAIOpen={setIsAskAIOpen}
          askAiLoading={askAiLoading}
          response={response}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />

        <ContentSection
          activeTab={activeTab}
          setIsSidebarOpen={setIsSidebarOpen}
          setIsAskAIOpen={setIsAskAIOpen}
          handleTabClick={handleTabClick}
          materialLoading={materialLoading}
          studyMaterial={
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {studyMaterial}
            </ReactMarkdown>
          }
        />
      </div>
    </div>
  );
};

export default Study;
