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

  // Handle Search
  useEffect(() => {
    const results = entries.filter(field => 
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(results);
    // Auto expand if searching
    if (searchTerm) setExpanded(true); 
  }, [searchTerm, entries]);

  const toggleExpand = () => setExpanded(!expanded);

  const visibleEntries = expanded ? filteredEntries : filteredEntries.slice(0, 8);

  return (
    <div className="w-full bg-[#152238] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Select Your Field</h2>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input 
              type="text"
              placeholder="Search for a role (e.g., Frontend)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2E4057] text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FF88] transition-all"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
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
                className="bg-[#1A2A44] border border-[#2E4057] h-[100px] flex items-center justify-center rounded-2xl cursor-pointer group transition-colors hover:border-[#00FF88]"
              >
                <span className="text-white font-semibold text-lg group-hover:text-[#00FF88] transition-colors text-center px-2">
                  {field}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Toggle Button - Hide searching or if list is short */}
        {filteredEntries.length > 8 && !searchTerm && (
          <div className="flex justify-center mt-8">
            <button
              onClick={toggleExpand}
              className="flex items-center space-x-2 text-[#00FF88] font-semibold hover:text-white transition-colors"
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