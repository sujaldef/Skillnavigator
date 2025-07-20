import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index';
import JobRole from './pages/Jobrole/index'; // Fixed import path
import Quiz from './pages/Quiz/index'; // Import Quiz page if needed
import QuizResult from './pages/QuizResult/index'; // Import QuizResult page
import Study from './pages/Study/index'; // Import Study page
import About from './pages/About';
import Career from './pages/Career';
import Program from './pages/Program'; // Import Program page if needed
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
    <div className="min-h-screen bg-[#1A2A44] font-montserrat overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobrole/:fieldName" element={<JobRole />} />
          <Route path="/quiz/:jobRole" element={<Quiz />} />
          <Route path="/result" element={<QuizResult />} />
          <Route path="/about" element={<About/>} />
          <Route path="/career" element={<Career />} />
          <Route path="/program" element={<Program />} />
          <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/level/:jobRole/:level" element={<Study />} />
           <Route path="/level/:jobRole/Novice" element={<Study />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;