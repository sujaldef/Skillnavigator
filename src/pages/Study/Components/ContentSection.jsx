import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import BouncingBall from "../../../components/BouncingBall";

const ContentSection = ({
  activeTab,
  setIsSidebarOpen,
  setIsAskAIOpen,
  handleTabClick,
  materialLoading,
  studyMaterial,
}) => {
  return (
    <div className="fixed top-[70px] left-0 w-full h-[92%] bg-[#1A2A44]">
      <div className="p-2 h-screen flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-between gap-14 mt-[-5%]">
          {[
            { label: "Select a skill", action: () => setIsSidebarOpen(true) },
            { label: "Ask AI", action: () => setIsAskAIOpen(true) },
            { label: "Theory", action: () => handleTabClick("Theory") },
            { label: "PDF", action: () => handleTabClick("PDF") },
            { label: "Lecture", action: () => handleTabClick("Lecture") },
            { label: "Projects", action: () => handleTabClick("Projects") },
            { label: "Questions", action: () => handleTabClick("Questions") },
          ].map((button) => (
            <button
              key={button.label}
              onClick={button.action}
              className={`p-2 w-[120px] text-center rounded-full ${
                activeTab === button.label ? "bg-blue-600 text-white" : "bg-[#1A2A44] text-white hover:bg-blue-600"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
        <div
          className="flex-1 p-10 ml-4 mb-[4%] pt-5 rounded-[35px] bg-[#D9D9D9] overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-thumb]:bg-[#009e52] [&::-webkit-scrollbar-thumb]:rounded-full h-[92%]"
        >
          {materialLoading ? (
            <div className="ml-[40%] mt-[15%]">
              <BouncingBall />
            </div>
          ) : (
            <div className="prose max-w-none">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{studyMaterial}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;