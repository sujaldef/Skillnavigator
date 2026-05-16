import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SuspenseFallback } from './utils/SuspenseFallback';

// Lazy load all route components for code splitting
const Home = React.lazy(() => import('./pages/Home/index'));
const JobRole = React.lazy(() => import('./pages/Jobrole/index'));
const Quiz = React.lazy(() => import('./pages/Quiz/index'));
const QuizResult = React.lazy(() => import('./pages/QuizResult/index'));
const Study = React.lazy(() => import('./pages/Study/index'));
const About = React.lazy(() => import('./pages/About/index'));
const Career = React.lazy(() => import('./pages/Career/index'));
const Program = React.lazy(() => import('./pages/Program/index'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/index'));

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#1A2A44] font-montserrat overflow-x-hidden">
        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobrole/:fieldName" element={<JobRole />} />
            <Route path="/quiz/:jobRole" element={<Quiz />} />
            <Route path="/result" element={<QuizResult />} />
            <Route path="/about" element={<About />} />
            <Route path="/career" element={<Career />} />
            <Route path="/program" element={<Program />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/level/:jobRole/:level" element={<Study />} />
            <Route path="/level/:jobRole/Novice" element={<Study />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
