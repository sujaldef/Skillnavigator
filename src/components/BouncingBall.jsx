import React from "react";

const BouncingBall = () => {
  const colors = [
    "bg-gradient-to-br from-[#00be63] to-[#00de75]",
    "bg-gradient-to-br from-[#00de75] to-[#00be63]",
    "bg-gradient-to-br from-[#00be63] to-[#009e52]",
    "bg-gradient-to-br from-[#009e52] to-[#008041]",
    "bg-gradient-to-br from-[#008041] to-[#00be63]",
    "bg-gradient-to-br from-[#00be63] to-[#00de75]",
  ];

  return (
    <div className="relative w-52 h-52 perspective-800 overflow-hidden flex items-center justify-center">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`absolute w-16 h-16 opacity-0 rounded-md ${color}`}
          style={{
            transformOrigin: "center center",
            transform: "translate(-50%, -50%) rotateX(45deg) rotateZ(0deg) scale(0.5)",
            animation: `spin 4s linear infinite, emerge 2s ease-in-out infinite alternate, fadeIn 0.3s ease-out forwards`,
            animationDelay: `${index * 0.3}s`,
          }}
        ></div>
      ))}

      <style>
        {`
          @keyframes spin {
            from {
              transform: translate(-50%, -50%) rotateX(45deg) rotateZ(0deg) scale(0.5);
            }
            to {
              transform: translate(-50%, -50%) rotateX(45deg) rotateZ(360deg) scale(0.5);
            }
          }

          @keyframes emerge {
            0%, 100% {
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 0;
            }
            50% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            to {
              visibility: visible;
              opacity: 0.8;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BouncingBall;