import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Theory");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [studyMaterial, setStudyMaterial] = useState("");
  const [askAiLoading, setAskAiLoading] = useState(false);
  const [materialLoading, setMaterialLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [skills, setSkills] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { jobRole, level, fieldName } = location.state || { jobRole: "", level: "", fieldName: "" };

  const apiKey = "AIzaSyDUOZunebNGQMazQoQCPycKHeHhdYDQEc0";

  const handleTakeTestClick = (skill) => {
    navigate(`/quiz/${skill}`, {
      state: { skillName: skill, progress: 0, jobRole, level, fieldName },
    });
  };

  const calculateProgress = (segmentation, level) => {
    const levelOrder = ["Novice", "Beginner", "Intermediate", "Advanced", "Expert"];
    const segmentOrder = ["Invoice Level", "Beginner Level", "Intermediate Level", "Advanced Level", "Expert Level"];
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

    if (jobRole) {
      fetchJobRoleSkills();
    }
  }, [jobRole]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAskAiLoading(true);
    setResponse("");

    try {
      const result = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: input }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const apiResponse = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      setResponse(apiResponse);
    } catch (error) {
      setResponse("Error fetching response. Please check the input or API key.");
      console.error("API Error:", error);
    } finally {
      setAskAiLoading(false);
    }
  };

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
      Theory: `Instruction:(in 1800 words) Create a **comprehensive and in-depth theoretical explanation** of **${subtopic}** in "${skill}" covering with maximum detail and elaboration. The focus should be on explaining **each concept thoroughly**, using clear examples and analogies to aid understanding.`,
      PDF: `Instruction: Provide a well-organized collection of PDF resources for **${subtopic}** in "${skill}". Ensure each resource includes: - **Title & Description:** Summarize the content, key topics covered, and relevance to learning the skill. - **Additional Notes:** Mention the source, author, publication date (if available), and any unique insights or supplementary material included in the document. - **Where to Find It:** Guide the user on where to access it (official websites, repositories, online libraries, or specific search queries).`,
      Projects: `Instruction:(in 1800 words) List high-impact real-world projects for **${subtopic}** in "${skill}". Each project should include: - **Project Title:** A concise and descriptive name. - **Project Description:** Explain the problem statement and objectives. - **Tech Stack:** List key technologies, frameworks, and tools used. - **Expected Outcomes:** Define skills learned and real-world applications. - **Difficulty Level:** Indicate if the project is Beginner, Intermediate, or Advanced.`,
      Lecture: `Instruction: Provide a curated list of high-quality lectures & YouTube playlists for **${subtopic}** in "${skill}". Ensure the list includes: - **Lecture Title:** Name of the lecture or playlist with the YouTube channel or platform channel. - **Brief Description:** Key topics covered and why it's useful. - **Instructor & Platform:** Specify if it’s from a university, industry expert, or online learning platform (e.g., MIT, Coursera, Udemy, YouTube, etc.).`,
      Questions: `Instruction: (in 1800 words) Generate a diverse set of practice questions for **${subtopic}** in "${skill}" to test theoretical and practical knowledge. Ensure variety with: - **Multiple-Choice Questions (MCQs):** Conceptual and technical questions with answer keys. - **(If coding-related) Coding Challenges:** Practical coding problems with expected output. - **Scenario-Based Problems:** Real-world case studies requiring problem-solving. - **Keyword-Based Questions:** Questions testing fundamental terminologies. - **Best Practices & Accessibility:** Covering industry standards and optimizations. - **Answer Keys & Explanations:** Provide correct answers with justifications where applicable.`,
    };

    try {
      const result = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: prompts[tab] }] }] },
        { headers: { "Content-Type": "application/json" } }
      );

      const apiResponse = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      setStudyMaterial(typeof apiResponse === "object" ? JSON.stringify(apiResponse, null, 2) : apiResponse);
    } catch (error) {
      setStudyMaterial("Error fetching content. Please try again.");
      console.error("API Error:", error);
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

  return (
    <div className="flex h-screen w-screen overflow-hidden font-montserrat">
      <Navbar />
      <div className="flex h-screen  overflow-hidden relative">
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
          studyMaterial={studyMaterial}
        />
      </div>
    </div>
  );
};

export default Study;