import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import BouncingBall from "../../../components/BouncingBall";

const AskAISection = ({
  isAskAIOpen,
  setIsAskAIOpen,
  askAiLoading,
  response,
  input,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div
      className={`fixed h-screen w-[50%] top-[70px] left-0 bg-[#1A2A44] p-4 space-y-4 transition-transform duration-300 z-50 ${
        isAskAIOpen ? "translate-x-0" : "-translate-x-full"
      } overflow-y-auto`}
    >
      <div className="bg-[#D9D9D9] rounded-[35px] h-[90%] p-4 flex flex-col">
        <div
          className="overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-[#D9D9D9] [&::-webkit-scrollbar-thumb]:bg-[#00FF88] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70] h-[100%] p-2 pt-8 flex-1 bg-[#D9D9D9]"
        >
          {askAiLoading ? (
            <div className="ml-[30%] mt-[25%] scale-[70%]">
              <BouncingBall />
            </div>
          ) : (
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{response}</ReactMarkdown>
          )}
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 rounded-[42px]"
            placeholder="Ask AI..."
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
          >
            <img
              src="https://img.icons8.com/?size=100&id=95149&format=png&color=000000"
              alt="Send Icon"
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
      <button
        onClick={() => setIsAskAIOpen(false)}
        className="w-[55px]  rounded-[20px] p-2 inline-flex items-center justify-center  hover:text-gray-500  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute top-1 right-8 bg-red-500 text-white px-4 py-2 z-50 hover:bg-red-600"
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
  );
};

export default AskAISection;