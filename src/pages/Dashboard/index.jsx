import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaChartPie, FaTasks } from "react-icons/fa";

// Slugify helper function
const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const jobRoles = ["Data Scientist", "Frontend Developer", "Cloud Engineer"];

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState(jobRoles[0]);

  const dashboardData = {
    "Data Scientist": {
      progress: 75,
      testPercentage: 82,
      skills: [
        { name: "Aerospace Engineering", progress: 85, testPercentage: 90 },
        { name: "Spacecraft Engineering", progress: 70, testPercentage: 75 },
        { name: "Air Traffic Control Engineering", progress: 65, testPercentage: 80 },
      ],
      recommendations: [
        "Complete ML Course",
        "Analyze Dataset XYZ",
        "Review Stats Book",
      ],
      certifications: ["AWS Certified Data Analytics", "Google Data Analytics"],
      recentActivity: [
        "Completed Quiz: Statistics - 80%",
        "Started ML Course",
        "Viewed Recommendation",
      ],
    },
    "Frontend Developer": {
      progress: 65,
      testPercentage: 70,
      skills: [
        { name: "HTML/CSS", progress: 80, testPercentage: 85 },
        { name: "JavaScript", progress: 60, testPercentage: 65 },
        { name: "React", progress: 55, testPercentage: 60 },
      ],
      recommendations: [
        "Build a Portfolio",
        "Learn Tailwind CSS",
        "Practice React Hooks",
      ],
      certifications: ["React Certification", "CSS Mastery"],
      recentActivity: [
        "Completed Quiz: HTML/CSS - 85%",
        "Started React Module",
        "Updated Profile",
      ],
    },
    "Cloud Engineer": {
      progress: 85,
      testPercentage: 88,
      skills: [
        { name: "AWS Basics", progress: 90, testPercentage: 95 },
        { name: "Docker", progress: 80, testPercentage: 85 },
        { name: "Kubernetes", progress: 75, testPercentage: 80 },
      ],
      recommendations: [
        "Certify AWS",
        "Deploy a Container",
        "Study Kubernetes Docs",
      ],
      certifications: ["AWS Solutions Architect", "Docker Certified Associate"],
      recentActivity: [
        "Completed Quiz: AWS Basics - 95%",
        "Deployed Test Container",
        "Earned Certification",
      ],
    },
  };

  const { progress, testPercentage, skills, recommendations } =
    dashboardData[selectedRole];

  return (
    <div className="min-h-screen font-montserrat text-white">
      <Navbar />
      <div className="pt-25 px-6 pb-10 max-w-8xl mx-12">
        {/* Role Selector */}
        <header className="mb-6">
          <div className="flex flex-wrap gap-3">
            {jobRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-5 py-2 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  selectedRole === role
                    ? "bg-[#00FF88] text-[#1A2A44] shadow-md"
                    : "bg-[#445982] text-white hover:bg-[#556A93] hover:shadow-md"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </header>

        <div className="flex flex-col gap-6">
          {/* Top Cards */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Welcome */}
            <div className="bg-[#445982] p-6 rounded-2xl shadow-lg flex-1">
              <h2 className="text-xl font-semibold mb-3">Welcome!</h2>
              <p className="text-gray-300 mb-4">
                Track your skills, take tests, and earn certifications with Skill Navigator.
              </p>
              <Link
                to="/study"
                className="inline-block px-5 py-2 bg-[#00FF88] text-[#1A2A44] rounded-full hover:bg-[#00DD77] transition-colors font-semibold"
              >
                Start Learning
              </Link>
            </div>

            {/* Progress */}
            <div className="bg-[#445982] p-6 rounded-2xl shadow-lg flex-1 text-center">
              <h2 className="text-xl font-semibold mb-5 flex items-center justify-center">
                <FaChartPie className="mr-2" /> Progress
              </h2>
              <div className="relative w-36 h-36 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#2E4057"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#00FF88"
                    strokeWidth="8"
                    strokeDasharray="282.743"
                    strokeDashoffset={282.743 - (progress / 100) * 282.743}
                    className="transition-all duration-1000"
                  />
                  <g transform="rotate(90, 50, 50)">
                    <text
                      x="50"
                      y="50"
                      dy="0.3em"
                      textAnchor="middle"
                      className="text-2xl font-bold"
                      fill="white"
                    >
                      {progress}%
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-[#445982] p-6 rounded-2xl shadow-lg flex-1">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <FaTasks className="mr-2" /> Recommendations
              </h2>
              <ul className="space-y-3 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00FF88] scrollbar-track-[#2E4057]">
                {recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="text-gray-300 hover:text-[#00FF88] transition-colors cursor-pointer"
                  >
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-[#445982] p-6 rounded-2xl shadow-lg w-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaTasks className="mr-2" /> Skills
            </h2>
            <ul className="space-y-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00FF88] scrollbar-track-[#2E4057]">
              {skills.map((skill, index) => {
                const slug = slugify(skill.name);
                return (
                  <li
                    key={index}
                    className="flex flex-col md:flex-row md:items-center gap-3 w-full"
                  >
                    <span className="font-medium text-white w-full md:w-1/5">
                      {skill.name}
                    </span>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 flex-grow">
                      {/* Progress Bar */}
                      <div className="flex-grow bg-gray-600 h-3 rounded-full relative">
                        <div
                          className="h-full bg-[#00FF88] rounded-full"
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>

                      {/* Progress % */}
                      <span className="text-white text-sm min-w-[50px]">
                        {skill.progress}%
                      </span>

                      {/* Buttons */}
                      <div className="flex gap-10">
                        <Link
                          to={`/quiz/${slug}`}
                          className="px-6 py-2 bg-[#00FF88] text-[#1A2A44] rounded hover:bg-[#00DD77] transition-colors"
                        >
                          Test
                        </Link>
                        <Link
                          to={`/level/${slug}/Novice`}
                          className="px-6 py-2 bg-[#556A93] text-white rounded hover:bg-[#6A80B3] transition-colors"
                        >
                          Tute
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
