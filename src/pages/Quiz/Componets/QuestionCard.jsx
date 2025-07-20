import React from "react";

const QuestionCard = ({ question, index, onAnswerSelection, answers }) => {
  const selectedOption = answers[question.id];

  return (
    <div className="mb-8 w-full p-6 rounded-lg bg-[#364768] shadow-lg">
      <h3 className="text-xl p-2 text-white font-semibold">
        {index + 1}. {question.question}
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            className={`p-4 rounded-md bg-[#697A9B] text-white hover:bg-[#00CC70] transition-all duration-200 ${
              selectedOption === option ? "bg-[#00CC70] font-bold" : ""
            } text-left min-h-[50px] flex items-center justify-between`}
            onClick={() => onAnswerSelection(question.id, option)}
          >
            <span className="flex-1">{option}</span>
            {selectedOption === option && (
              <span className="text-white text-sm ml-2">✔</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;