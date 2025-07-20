import React from 'react';

const RightSection = ({ jobRoles, selectedJobRole, handleFieldClick }) => {
  return (
    <div className="w-1/3 bg-[#182c4d] text-white p-6 rounded-l-2xl flex flex-col">
      <h2 className="text-xl font-bold flex justify-center mb-4">
        Select a jobrole
      </h2>
      <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#D9D9D9] [&::-webkit-scrollbar-thumb]:bg-[#00FF88] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#00cc70]">
        <div className="grid grid-cols-1 gap-3">
          {jobRoles.length > 0 ? (
            jobRoles
              .slice()
              .sort((a, b) => a.localeCompare(b))
              .map((role, index) => (
                <button
                  key={index}
                  onClick={() => handleFieldClick(role)}
                  className={`bg-[#00FF88] text-[#1A2A44] font-bold py-2 px-4 rounded-lg transition ${
                    selectedJobRole === role ? 'bg-[#1A2A44] text-white' : ''
                  }`}
                >
                  {role}
                </button>
              ))
          ) : (
            <p className="text-gray-300">No job roles found for this field.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSection;