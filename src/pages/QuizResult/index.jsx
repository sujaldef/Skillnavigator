import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProgressCircle from "./Components/ProgressCircle";
import ScoreImage from "./Components/ScoreImage";
import MotivationSection from "./Components/MotivationSection";
import PerformanceSummary from "./Components/PerformanceSummary";

const QuizResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { results, jobRole, level, answers, questions, fieldName } = location.state || {
    results: [],
    answers: {},
    questions: [],
    jobRole: "",
    level: "",
    fieldName: "",
  };

  if (!results.length || !questions.length) {
    return (
      <div className="flex h-screen w-screen bg-[#1A2A44] overflow-hidden font-montserrat">
        <Navbar />
        <div className="flex w-full h-full pt-[5%] p-4">
          <div className="w-full text-center text-white">
            Error: Missing quiz data. Please retake the quiz.
          </div>
        </div>
      </div>
    );
  }

  const skillStats = results.reduce((acc, { skill, isCorrect }) => {
    if (!acc[skill]) {
      acc[skill] = { correct: 0, total: 0 };
    }
    acc[skill].total += 1;
    if (isCorrect) {
      acc[skill].correct += 1;
    }
    return acc;
  }, {});

  const score = results.filter((r) => r.isCorrect).length;
  const total = results.length;
  const completed = Object.keys(answers).length;
  const totalQuestions = questions.length;

  const percentage = total > 0 ? (score / total) * 100 : 0;
  const circumference = 2 * Math.PI * 16;

  const [strokeDashArray, setStrokeDashArray] = useState((percentage / 100) * circumference);
  const [displayScore, setDisplayScore] = useState(`${score}/${total}`);
  const [completionStatus, setCompletionStatus] = useState(`${completed}/${totalQuestions} Questions Completed`);

  useEffect(() => {
    setStrokeDashArray((percentage / 100) * circumference);
    setDisplayScore(`${score}/${total}`);
    setCompletionStatus(`${completed}/${totalQuestions} Questions Completed`);
  }, [score, total, completed, totalQuestions, percentage, circumference]);

  const handleStartLearning = () => {
    navigate(`/level/${jobRole}/${level}`, { state: { jobRole, level, fieldName } });
  };

  return (
    <div className="flex h-screen w-screen bg-[#1A2A44] overflow-hidden font-montserrat">
      <Navbar />
      <div className="flex w-full h-full pt-[5%] p-4">
        <div className="w-[30%] flex flex-col items-center">
          <ProgressCircle
            score={score}
            total={total}
            strokeDashArray={strokeDashArray}
            circumference={circumference}
            displayScore={displayScore}
            completionStatus={completionStatus}
          />
          <ScoreImage percentage={percentage} />
        </div>
        <div className="w-[70%] flex flex-col gap-8 pl-6">
          <MotivationSection onStartLearning={handleStartLearning} />
          <PerformanceSummary skillStats={skillStats} />
        </div>
      </div>
    </div>
  );
};

export default QuizResult;