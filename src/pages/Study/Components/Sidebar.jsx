import React from "react";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  skills,
  expandedRows,
  setExpandedRows,
  calculateProgress,
  handleTakeTestClick,
  handleTuteClick,
  level,
}) => {
  return (
    <div
      className={`fixed h-screen w-[50%] top-[70px] left-0 bg-[#1A2A44] p-4 space-y-4 transition-transform duration-300 rounded-[35px] z-50 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } overflow-y-auto`}
    >
      <div className="bg-[#D9D9D9] rounded-[35px] p-3 pl-[5%] flex items-center justify-between">
        <h2 className="text-left text-xl font-bold text-[#1A2A44]">
          Select a skill to study, and track your progress
        </h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="w-[105px] bg-red-600 rounded-[20px] p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="bg-[#D9D9D9] rounded-[35px] p-3 pl-[5%] flex items-center justify-between">
        <h2 className="text-left text-xl font-bold text-[#1A2A44]">
          Your Own Personalized Roadmap
        </h2>
        <button className="bg-[#00FF88] text-[#1A2A44] px-4 py-2 rounded-full font-semibold hover:bg-[#00DD77]">
          Download
        </button>
      </div>
      <div
        className="bg-[#D9D9D9] rounded-[35px] p-4 overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-[#D9D9D9] [&::-webkit-scrollbar-thumb]:bg-[#00FF88] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70] h-[100%] max-h-[68%]"
      >
        <h2 className="text-center text-xl font-bold text-[#1A2A44] mb-2">
          Skills Progress
        </h2>
        <table className="w-full border-collapse">
          <thead className="sticky top-[-16px] h-[40px] bg-[#D9D9D9]">
            <tr>
              <th>✔️</th>
              <th>Skills</th>
              <th>Subtopics</th>
              <th>Progress</th>
              <th>Take Test</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => (
              <React.Fragment key={index}>
                <tr className="border-b">
                  <td className="p-2 text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2">{skill.skills}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() =>
                        setExpandedRows((prev) => ({
                          ...prev,
                          [index]: !prev[index],
                        }))
                      }
                    >
                      <img
                        src={expandedRows[index] ? "/uparrow.png" : "/dropdown.png"}
                        alt="Toggle Subtopics"
                        className="w-6 h-6"
                      />
                    </button>
                  </td>
                  <td className="p-2 w-[200px]">
                    <progress
                      value={calculateProgress(skill.segmentation, level)}
                      max="100"
                      className="w-full"
                    ></progress>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="bg-[#00FF88] text-[#1A2A44] px-4 py-1 rounded-lg hover:bg-blue-600"
                      onClick={() => handleTakeTestClick(skill.skills)}
                    >
                      Take Test
                    </button>
                  </td>
                </tr>
                {expandedRows[index] && skill.subtopics && skill.subtopics.length > 0 && (
                  <>
                    <tr className="bg-gray-200">
                      <th>✔️</th>
                      <th>Subtopics</th>
                      <th colSpan="3">TUTE</th>
                    </tr>
                    {skill.subtopics.map((subtopic, subIndex) => (
                      <tr key={subIndex} className="bg-gray-100">
                        <td className="p-2 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="p-2 pl-6 text-gray-700">🔹 {subtopic}</td>
                        <td colSpan="3" className="p-2 text-center">
                          <button
                            className="bg-[#00FF88] text-[#1A2A44] px-4 py-1 rounded-lg hover:bg-blue-600"
                            onClick={() => handleTuteClick(skill.skills, subtopic)}
                          >
                            TUTE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sidebar;