import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const FinishPopup = ({ show, onConfirm, onCancel, answeredCount, totalCount }) => {
  if (!show) return null;

  const remaining = totalCount - answeredCount;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-[#1A2A44] border border-[#2E4057] rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
      >
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mx-auto mb-6">
           <FaExclamationTriangle size={32} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Finish Exam?</h2>
        
        {remaining > 0 ? (
          <p className="text-gray-400 mb-8">
            You have <span className="text-[#00FF88] font-bold">{remaining}</span> unanswered questions. 
            Unanswered questions will be marked as incorrect.
          </p>
        ) : (
          <p className="text-gray-400 mb-8">
            You have answered all questions. Ready to submit?
          </p>
        )}

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-[#0B1221] text-gray-300 font-bold hover:bg-[#1E293B] transition-colors"
          >
            Return
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-[#00FF88] text-[#0B1221] font-bold hover:bg-[#00CC70] transition-colors"
          >
            Submit Exam
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FinishPopup;