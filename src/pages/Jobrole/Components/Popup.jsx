import React from 'react';

const Popup = ({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-[20px] shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-red-600">{title}</h2>
        <p className="mb-4 text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#00FF88] text-[#1A2A44] font-bold py-2 px-4 rounded-full hover:bg-[#00CC70] transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;