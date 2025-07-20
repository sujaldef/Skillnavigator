import React, { useEffect, useState } from 'react';

const FieldGrid = ({ expanded, onFieldClick, onDropdownToggle }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch fields from jobroleskills.json
    const fetchFields = async () => {
      try {
        const response = await fetch('/jobroleskills.json');
        const data = await response.json();
        const uniqueFields = [...new Set(data.map((item) => item.field))];
        setEntries(uniqueFields);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };
    fetchFields();
  }, []);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 p-6 md:p-10 mx-auto max-w-6xl bg-[#1A2A44] ${expanded ? 'max-h-[700px]' : 'max-h-[400px]'}`}>
      <div className="col-span-full text-center text-white text-xl md:text-2xl font-bold mb-4">
        Select Your Field
      </div>
      {entries
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .slice(0, expanded ? entries.length : 8)
        .map((field, index) => (
          <div
            key={index}
            className="bg-[#2E4057] text-white h-[80px] flex items-center justify-center rounded-[20px] transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl"
          >
            <button
              onClick={() => onFieldClick(field)}
              className="text-white font-bold text-lg rounded-[20px] w-full h-full flex items-center justify-center"
            >
              {field}
            </button>
          </div>
        ))}
      <div className="col-span-full flex justify-center mt-4">
        <button
          onClick={onDropdownToggle}
          className="text-white text-2xl md:text-3xl transition duration-300 hover:scale-110"
        >
          {expanded ? '▲' : '▼'}
        </button>
      </div>
    </div>
  );
};

export default FieldGrid;