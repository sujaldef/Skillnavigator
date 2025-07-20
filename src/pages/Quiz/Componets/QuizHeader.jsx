import React from "react";

const QuizHeader = ({ jobRole, level }) => {
  return (
    <h2 className="text-3xl font-bold text-center text-white py-4 px-6 rounded-lg  mb-6">
      {jobRole ? `${jobRole} Quiz ` : "Quiz"}
    </h2>
  );
};

export default QuizHeader;