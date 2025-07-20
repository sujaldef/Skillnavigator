import React from "react";

const ScoreImage = ({ percentage }) => {
  const getScoreImage = (percentage) => {
    if (percentage >= 25) return "25_30.png";
    if (percentage >= 20) return "20_25.jpg";
    if (percentage >= 10) return "10_20.png";
    return "0_10.png";
  };

  const scoreImage = getScoreImage(percentage);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center overflow-hidden mt-4">
      <img
        src={scoreImage}
        alt="Performance Illustration"
        className="max-w-full max-h-full object-contain rounded-lg"
      />
    </div>
  );
};

export default ScoreImage;