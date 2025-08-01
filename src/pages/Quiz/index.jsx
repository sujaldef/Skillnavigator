import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import QuizHeader from "./Componets/QuizHeader";
import QuestionCard from "./Componets/QuestionCard";
import LoadingAnimation from "./Componets/LoadingAnimation";
import FinishPopup from "./Componets/FinishPopup";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { jobRole, level, fieldName } = location.state || { jobRole: "", level: "", fieldName: "" };
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchJobRoleSkills = async () => {
      try {
        const response = await fetch("/jobroleskills.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const filteredSkills = data
          .filter((item) => item.jobrole === jobRole)
          .flatMap((item) => item.skills || []);
        setSkills(filteredSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchJobRoleSkills();
  }, [jobRole]);

  useEffect(() => {
    if (skills.length === 0) return;

    const fetchQuestions = async () => {
      try {
        const prompt = `Generate 30-40 multiple-choice questions covering ${jobRole} skills: ${JSON.stringify(skills)}.
        Each question should include:
        - Skill name
        - Question ID
        - Four answer options
        - Correct answer
        Return JSON format:
        {
          "questions": [
            { "skill": "Skill1", "id": 1, "question": "Sample?", "options": ["A", "B", "C", "D"], "answer": "A" }
          ]
        }`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsedData = JSON.parse(jsonMatch[0]);
            setQuestions(parsedData.questions || []);
          } else {
            console.error("No valid JSON found in response:", textResponse);
          }
        } else {
          console.error("No text response from API:", data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [skills, apiKey]);

  const handleAnswerSelection = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleFinishTestClick = () => {
    setShowPopup(true);
  };

  const handleConfirmFinish = () => {
    const results = questions.map((q) => ({
      skill: q.skill,
      isCorrect: answers[q.id] === q.answer,
    }));
    navigate("/result", { state: { results, jobRole, level, answers, questions, fieldName } });
    setShowPopup(false);
  };

  const handleCancelFinish = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen w-screen overflow-x-hidden font-montserrat bg-[#1A2A44]">
      <Navbar />
      <div className="w-full pt-[70px] pb-6 px-4 overflow-y-auto ">
        <QuizHeader jobRole={jobRole} level={level} />
        {questions.length > 0 ? (
          <div className="max-w-6xl mx-auto">
            {questions.map((q, index) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={index}
                onAnswerSelection={handleAnswerSelection}
                answers={answers}
              />
            ))}
            <button
              className="bg-red-500 px-6 py-3 rounded-md hover:bg-red-700 w-full max-w-4xl mx-auto flex justify-center  mt-6"
              onClick={handleFinishTestClick}
            >
              Finish Test
            </button>
          </div>
        ) : (
          <LoadingAnimation />
        )}
        <FinishPopup
          show={showPopup}
          onConfirm={handleConfirmFinish}
          onCancel={handleCancelFinish}
          questions={questions}
          answers={answers}
        />
      </div>
    </div>
  );
};

export default Quiz;