import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FieldGrid = ({ onFieldClick }) => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch('/jobroleskills.json');
        const data = await response.json();
        const uniqueFields = [...new Set(data.map((item) => item.field))];
        setEntries(uniqueFields);
        setFilteredEntries(uniqueFields);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };
    fetchFields();
  }, []);

  useEffect(() => {
    const results = entries.filter(field => 
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(results);
    if (searchTerm) setExpanded(true); 
  }, [searchTerm, entries]);

  const toggleExpand = () => setExpanded(!expanded);
  const visibleEntries = expanded ? filteredEntries : filteredEntries.slice(0, 8);

  return (
    // Reduced padding py-12
    <div className="w-full bg-[#152238] py-12 px-6">
      
      {/* 75% Width Container */}
      <div className="w-[85%] md:w-[75%] max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Select Your Field</h2>
          
          <div className="relative max-w-sm mx-auto">
            <input 
              type="text"
              placeholder="Search role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2E4057] text-white text-sm pl-9 pr-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FF88] transition-all"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          </div>
        </div>

        <motion.div 
          layout
          // Grid gap reduced
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {visibleEntries.map((field, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5, boxShadow: "0px 0px 20px rgba(0, 255, 136, 0.3)" }}
                key={field}
                onClick={() => onFieldClick(field)}
                // Reduced Height to 80px and font size
                className="bg-[#1A2A44] border border-[#2E4057] h-[80px] flex items-center justify-center rounded-xl cursor-pointer group transition-colors hover:border-[#00FF88]"
              >
                <span className="text-white font-semibold text-base group-hover:text-[#00FF88] transition-colors text-center px-2">
                  {field}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredEntries.length > 8 && !searchTerm && (
          <div className="flex justify-center mt-6">
            <button
              onClick={toggleExpand}
              className="flex items-center space-x-2 text-[#00FF88] font-semibold text-sm hover:text-white transition-colors"
            >
              <span>{expanded ? 'Show Less' : 'Show All Fields'}</span>
              {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldGrid;