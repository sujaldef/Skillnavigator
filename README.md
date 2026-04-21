# 🎯 SkillNavigator - AI-Powered Adaptive Learning Platform

An AI-powered personalized learning platform for adaptive skill development across 250+ job roles. Features intelligent assessments, dynamic content, and progress tracking using React, MongoDB, and Tailwind CSS.

![React](https://img.shields.io/badge/-React%2019-blue?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)

## 🌟 Overview

SkillNavigator is a revolutionary learning ecosystem that combines intelligent AI assessments, personalized learning paths, and comprehensive progress tracking. We calibrate your learning journey with precision and data-driven insights across 250+ job roles.

**Unlock your potential and navigate your career path with SkillNavigator!** 🚀

---

## ✨ Core Features

### 🔍 **Intelligent Assessments**

- Adaptive quiz system with AI-powered question generation
- Real-time performance feedback and analytics
- Multiple proficiency levels (Novice → Advanced)

### 📚 **Dynamic Content Generation**

- AI-powered personalized study materials
- Curated YouTube recommendations & PDF resources
- Practice questions and interactive labs

### 📊 **Progress Tracking**

- Skill-wise proficiency visualization
- Test performance analytics
- Personalized learning recommendations

### 🎓 **Personalized Learning Paths**

- Role-specific skill hierarchies
- Level-based study programs
- Flexible self-directed learning

### 🚀 **Career Development**

- Explore 250+ job roles
- Skills-to-roles mapping
- Industry insights and career paths

---

## 🛠️ Tech Stack

| Category           | Technologies                               |
| ------------------ | ------------------------------------------ |
| **Frontend**       | React 19, React Router 7.6.3               |
| **Styling**        | Tailwind CSS 4.1.11, Framer Motion 12.23.0 |
| **Build Tool**     | Vite 7.0.0                                 |
| **Content**        | React Markdown, Rehype Raw                 |
| **HTTP Client**    | Axios 1.10.0                               |
| **Icons**          | React Icons 5.5.0                          |
| **Animations**     | Anime.js 4.0.2                             |
| **Backend**        | Node.js, MongoDB (upcoming)                |
| **AI Integration** | Gemini API (for question generation)       |

---

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "@tailwindcss/vite": "^4.1.11",
    "animejs": "^4.0.2",
    "axios": "^1.10.0",
    "framer-motion": "^12.23.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0",
    "react-markdown": "^10.1.0",
    "react-router-dom": "^7.6.3",
    "rehype-raw": "^7.0.0",
    "tailwindcss": "^4.1.11"
  }
}
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd SKILLNAVIGATOR

# Install dependencies
npm install

# Set up environment variables
# Create .env file with required API keys
```

### Available Scripts

```bash
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Build for production
npm run lint      # Check code quality with ESLint
npm run preview   # Preview production build
```

---

## 📄 Pages Overview

| Page          | Purpose             | Key Features                                              |
| ------------- | ------------------- | --------------------------------------------------------- |
| **Home**      | Landing & Discovery | Browse 250+ job roles, see platform benefits              |
| **Jobrole**   | Role Details        | View skills required, skill descriptions, prerequisites   |
| **Quiz**      | Assessment          | AI-generated adaptive questions, real-time scoring        |
| **Study**     | Learning Materials  | AI chat assistant, resources, courses, practice questions |
| **Dashboard** | Progress Tracking   | Analytics, achievements, recommendations, skill breakdown |
| **About**     | Platform Info       | Mission, features, team, contact information              |
| **Career**    | Career Paths        | Role progression, industry insights                       |
| **Program**   | Learning Programs   | Three-level learning paths (Beginner → Advanced)          |

### 📁 Project Structure

```
SKILLNAVIGATOR/
├── api/                          # API utilities
├── public/
│   └── jobroleskills.json       # 250+ job roles database
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── BouncingBall.jsx
│   ├── pages/                   # Page components
│   │   ├── Home/
│   │   ├── Jobrole/
│   │   ├── Quiz/
│   │   ├── Study/
│   │   ├── Dashboard/
│   │   ├── About/
│   │   ├── Career/
│   │   └── Program/
│   ├── App.jsx                  # Main routing
│   └── main.jsx                 # Entry point
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🎨 Design Highlights

- **Modern Dark Theme:** Professional blue-green color scheme
- **Smooth Animations:** Framer Motion + Anime.js for polished UI
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Interactive Elements:** Engaging hover effects and transitions
- **Accessibility:** WCAG 2.1 compliance for inclusive design

---

## 🔌 API Integrations

- **Gemini API:** AI question generation and study assistance
- **MongoDB:** User data, progress, and quiz results storage
- **jobroleskills.json:** Master database of job roles and skills

---

## 📖 For More Details

See [README_DETAILED.md](README_DETAILED.md) for:

- Comprehensive page-by-page documentation
- Component architecture details
- Data flow diagrams
- Development guidelines
- Contributing instructions

---

## 🤝 Support

For issues, suggestions, or feedback:

- Open a GitHub issue
- Contact: support@skillnavigator.com
- Follow on social: [LinkedIn](#) | [Twitter](#) | [GitHub](#)

---

**Built with ❤️ for Career Development and Lifelong Learning** 🌍
│ ├── 0_10.png
│ ├── 10_20.png
│ ├── 1stcontainer.svg
│ ├── 20_25.jpg
│ ├── 25_30.png
│ ├── 2ndcontainer.svg
│ ├── 3rdcontainer.svg
│ ├── 4thcontainer.svg
│ ├── DynamicSkillTesting.jpg
│ ├── Job_Role_Insights.jpg
│ ├── Skill_Based_Learning.jpg
│ ├── begginerlvl.jpg
│ ├── carreroopo.jpg
│ ├── computer.jpg
│ ├── creator.jpg
│ ├── dropdown.png
│ ├── expertlvl.jpg
│ ├── favicon.svg
│ ├── greatejob.jpg
│ ├── index.html
│ ├── instagram_icon.png
│ ├── jobroleskills.json
│ ├── linkedin_icon.png
│ ├── logo192.png
│ ├── logo512.png
│ ├── manifest.json
│ ├── personalizeroadmap.jpg
│ ├── progresstracking.jpg
│ ├── re.json
│ ├── robots.txt
│ ├── twitter_icon.png
│ ├── uparrow.png
│ └── vite.svg
├── src
│ ├── App.css
│ ├── App.jsx
│ ├── assets
│ │ └── react.svg
│ ├── components
│ │ ├── BouncingBall.jsx
│ │ ├── Footer.jsx
│ │ └── Navbar.jsx
│ ├── index.css
│ ├── main.jsx
│ └── pages
│ ├── About
│ │ └── index.jsx
│ ├── Career
│ │ └── index.jsx
│ ├── Dashboard
│ │ └── index.jsx
│ ├── Home
│ │ ├── Components
│ │ │ ├── FieldGrid.jsx
│ │ │ ├── HeroSection.jsx
│ │ │ └── InfoContainer.jsx
│ │ └── index.jsx
│ ├── Jobrole
│ │ ├── Components
│ │ │ ├── LeftSection.jsx
│ │ │ ├── Popup.jsx
│ │ │ └── RightSection.jsx
│ │ └── index.jsx
│ ├── Program
│ │ └── index.jsx
│ ├── Quiz
│ │ ├── Componets
│ │ │ ├── FinishPopup.jsx
│ │ │ ├── LoadingAnimation.jsx
│ │ │ ├── QuestionCard.jsx
│ │ │ └── QuizHeader.jsx
│ │ └── index.jsx
│ ├── QuizResult
│ │ ├── Components
│ │ │ ├── MotivationSection.jsx
│ │ │ ├── PerformanceSummary.jsx
│ │ │ ├── ProgressCircle.jsx
│ │ │ └── ScoreImage.jsx
│ │ └── index.jsx
│ └── Study
│ ├── Components
│ │ ├── AskAISection.jsx
│ │ ├── ContentSection.jsx
│ │ └── Sidebar.jsx
│ └── index.jsx
└── vite.config.js

```

## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)


```
