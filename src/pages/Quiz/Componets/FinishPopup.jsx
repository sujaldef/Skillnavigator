import React from "react";

const FinishPopup = ({ show, onConfirm, onCancel, questions, answers }) => {
  if (!show) return null;

  const remainingQuestions = questions.length - Object.keys(answers).length;
  const noAnswers = Object.keys(answers).length === 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[1100]">
      <div className="bg-[#D9D9D9] p-8 rounded-xl shadow-2xl text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#1A2A44] mb-4">Quiz Completion</h2>
        {noAnswers ? (
          <p className="mb-4 text-red-600 font-semibold">
            You haven’t answered any questions. Finishing now will submit a score of 0. Proceed?
          </p>
        ) : (
          <p className="mb-4 text-[#1A2A44]">
            You have {remainingQuestions} question{remainingQuestions !== 1 ? "s" : ""} remaining. Do you want to finish?
          </p>
        )}
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Finish
          </button>
          <button
            onClick={onCancel}
            className="bg-[#697A9B] text-white px-6 py-2 rounded-md hover:bg-[#5A6B8A] transition-colors duration-200"
          >
            Back to Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishPopup;