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
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { jobRole, level, fieldName } =
    location.state || { jobRole: "", level: "", fieldName: "" };

  /* ------------------------------------
     Fetch skills for selected job role
  -------------------------------------*/
  useEffect(() => {
    const fetchJobRoleSkills = async () => {
      try {
        const response = await fetch("/jobroleskills.json");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const filteredSkills = data
          .filter((item) => item.jobrole === jobRole)
          .flatMap((item) => item.skills || []);

        setSkills(filteredSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    if (jobRole) fetchJobRoleSkills();
  }, [jobRole]);

  /* ------------------------------------
     Fetch questions from Gemini proxy
  -------------------------------------*/
  useEffect(() => {
    if (skills.length === 0) return;

    const fetchQuestions = async () => {
      try {
        const prompt = `
Generate 30–40 multiple-choice questions for the job role "${jobRole}".

Skills:
${JSON.stringify(skills)}

Rules:
- Each question must have 4 options
- Only ONE correct answer
- IDs must be unique integers

Return ONLY valid JSON.
No explanation.
No markdown.

JSON format:
{
  "questions": [
    {
      "skill": "Skill name",
      "id": 1,
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    }
  ]
}
`;

        const response = await fetch("http://localhost:5000/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        // Extract JSON safely from Gemini text
        const jsonMatch = data.text?.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error("Invalid Gemini response:", data.text);
          return;
        }

        const parsed = JSON.parse(jsonMatch[0]);
        setQuestions(parsed.questions || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [skills, jobRole]);

  /* ------------------------------------
     Answer handling
  -------------------------------------*/
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

    navigate("/result", {
      state: { results, jobRole, level, answers, questions, fieldName },
    });

    setShowPopup(false);
  };

  const handleCancelFinish = () => {
    setShowPopup(false);
  };

  /* ------------------------------------
     UI
  -------------------------------------*/
  return (
    <div className="min-h-screen w-screen overflow-x-hidden font-montserrat bg-[#1A2A44]">
      <Navbar />

      <div className="w-full pt-[70px] pb-6 px-4 overflow-y-auto">
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
              className="bg-red-500 px-6 py-3 rounded-md hover:bg-red-700 w-full max-w-4xl mx-auto flex justify-center mt-6"
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
