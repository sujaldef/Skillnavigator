# 🎯 SkillNavigator - AI-Powered Adaptive Learning Platform

An AI-powered personalized learning platform for adaptive skill development across 250+ job roles. Features intelligent assessments, dynamic content, and progress tracking using React, MongoDB, and Tailwind CSS.

![React](https://img.shields.io/badge/-React%2019-blue?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)

## 🌟 Overview

SkillNavigator is a revolutionary learning ecosystem that combines intelligent AI assessments, personalized learning paths, and comprehensive progress tracking. Whether you're exploring a new career path or advancing in your current role, SkillNavigator calibrates your learning journey with precision and data-driven insights.

The platform empowers users to:
- 🔍 **Discover** over 250+ job roles and their required skill sets
- 📊 **Assess** proficiency levels through intelligent adaptive tests
- 🎓 **Learn** with AI-generated, personalized study materials
- 📈 **Track** progress with real-time analytics and insights
- 🚀 **Advance** with curated learning paths and recommendations

---

## ✨ Key Features

### 1. **Intelligent Assessments**
- Adaptive quiz system that adjusts question difficulty based on performance
- AI-powered question generation tailored to specific job roles and skills
- Real-time feedback and performance analytics
- Multiple proficiency levels (Novice, Intermediate, Advanced)

### 2. **Dynamic Content Generation**
- AI-generated personalized study materials using Gemini API
- Curated YouTube course recommendations
- PDF resource suggestions
- Practice questions and exercises
- Real-time content adaptation based on user performance

### 3. **Comprehensive Progress Tracking**
- Skill-wise progress visualization
- Test performance analytics
- Learning streak tracking
- Achievement badges and certifications
- Personalized recommendations

### 4. **Personalized Learning Paths**
- Level-based study programs (Novice → Intermediate → Advanced)
- Role-specific skill hierarchies
- Flexible pacing and self-directed learning
- Customizable learning roadmaps

### 5. **Career Development**
- Job role exploration across 250+ positions
- Skills required for each role
- Career path recommendations
- Industry insights and trends

---

## 📁 Project Structure

```
SKILLNAVIGATOR/
├── api/
│   └── generate.js                 # API utilities for content generation
├── public/
│   ├── jobroleskills.json         # Master database of 250+ job roles and skills
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── App.jsx                     # Main routing configuration
│   ├── main.jsx                    # React entry point
│   ├── App.css                     # Global styles
│   ├── index.css                   # Base styles
│   ├── components/
│   │   ├── Navbar.jsx             # Navigation component
│   │   ├── Footer.jsx             # Footer component
│   │   └── BouncingBall.jsx       # Loading animation
│   │
│   └── pages/
│       ├── Home/
│       │   ├── index.jsx          # Landing page
│       │   └── Components/
│       │       ├── HeroSection.jsx       # Hero banner with CTA
│       │       ├── FieldGrid.jsx        # Job field browsing grid
│       │       └── InfoContainer.jsx    # Feature highlights
│       │
│       ├── Jobrole/
│       │   ├── index.jsx          # Job role details page
│       │   └── Components/
│       │       └── Popup.jsx      # Role skill preview popup
│       │
│       ├── Quiz/
│       │   ├── index.jsx          # Assessment quiz engine
│       │   └── Componets/        # (typo in folder name)
│       │       ├── QuestionCard.jsx       # Individual question display
│       │       ├── QuizHeader.jsx        # Quiz progress header
│       │       ├── LoadingAnimation.jsx  # Content loading state
│       │       └── FinishPopup.jsx      # Quiz completion popup
│       │
│       ├── QuizResult/
│       │   └── index.jsx          # Performance results display
│       │
│       ├── Study/
│       │   └── index.jsx          # AI-powered study materials
│       │                           # (with AI chat drawer & resources)
│       │
│       ├── Dashboard/
│       │   └── index.jsx          # User progress dashboard
│       │
│       ├── About/
│       │   └── index.jsx          # Platform information page
│       │
│       ├── Career/
│       │   └── index.jsx          # Career path exploration
│       │
│       └── Program/
│           └── index.jsx          # Learning programs overview
│
├── eslint.config.js
├── vite.config.js
├── package.json
└── index.html
```

---

## 📄 Pages & Components Guide

### 🏠 **Home** (`src/pages/Home/index.jsx`)
**Purpose:** Landing page and central hub for user onboarding

**Components:**
- **HeroSection:** Eye-catching welcome banner with call-to-action
- **FieldGrid:** Interactive grid displaying 250+ job roles/fields for discovery
- **InfoContainer:** Feature highlights showing platform benefits (4-step learning process)

**Functionality:**
- Loads all available job roles from `jobroleskills.json`
- Dynamic field discovery and filtering
- Navigation to job role details page
- Scroll animations and smooth transitions

---

### 💼 **Jobrole** (`src/pages/Jobrole/index.jsx`)
**Purpose:** Display job role details and associated skills

**Features:**
- Error boundary for robust error handling
- Real-time data fetching and caching
- Interactive skill previews via popup modal
- Smooth animations using Framer Motion

**Components:**
- **Popup:** Modal showing:
  - Skill name and description
  - Required proficiency levels
  - Learning recommendations
  - Progress indicators

**Functionality:**
- Lists all skills required for a specific job role
- Click on any skill to view details and start learning
- Navigation to Quiz/Study sections

---

### 📝 **Quiz** (`src/pages/Quiz/index.jsx`)
**Purpose:** Adaptive assessment system to evaluate skill proficiency

**Features:**
- AI-generated questions using Gemini API
- Adaptive difficulty based on user performance
- Real-time scoring and feedback
- Multiple question types (MCQ, coding challenges, practical)

**Sub-Components:**
- **QuestionCard:** Individual question display with answer options
- **QuizHeader:** Shows current progress, time remaining, question count
- **LoadingAnimation:** Animated loading state while questions are generated
- **FinishPopup:** End-of-quiz summary and performance breakdown

**Workflow:**
1. User selects a skill to assess
2. System fetches relevant skills from job role
3. Gemini API generates adaptive questions
4. User answers questions with real-time feedback
5. Quiz completion triggers result calculation and popup
6. Results are saved for dashboard analytics

---

### 🎓 **Study** (`src/pages/Study/index.jsx`)
**Purpose:** AI-powered personalized learning materials and resources

**Features:**
- **AI Study Assistant:** Real-time chat drawer with:
  - Context-aware responses about the current skill/topic
  - Follow-up question support
  - Concept explanations
  - Problem-solving guidance

- **Resource Library:**
  - 📚 PDF Recommendations: Curated books and guides
  - 🎬 YouTube Courses: Video tutorial suggestions
  - 📖 Study Materials: Markdown-formatted content
  - ❓ Practice Questions: Skill-specific exercises
  - 🧪 Practical Labs: Hands-on learning activities

- **Interactive Tabs:**
  - Switch between different resource types
  - Search/filter functionality
  - Resource links and descriptions
  - Difficulty level indicators

**Markdown Support:**
- Uses React Markdown for formatted content
- Supports code blocks, tables, and HTML rendering
- Professional documentation-style materials

---

### 📊 **Dashboard** (`src/pages/Dashboard/index.jsx`)
**Purpose:** Centralized progress tracking and learning analytics

**Features:**
- **Performance Metrics:**
  - Overall progress percentage
  - Test performance analytics
  - Skill-wise proficiency breakdown
  
- **Multiple Sections:**
  - **Skills Overview:** Track progress for multiple job roles
  - **Test Scores:** Historical performance data
  - **Recommendations:** Personalized next-step suggestions
  - **Certifications:** Earned and recommended certifications
  - **Recent Activity:** Learning history and milestones
  - **Achievements:** Badges and accomplishments

- **Role Switcher:** Toggle between different job roles to view progress
- **Visual Analytics:** Charts and progress bars for intuitive data representation

---

### ℹ️ **About** (`src/pages/About/index.jsx`)
**Purpose:** Platform mission, values, and team information

**Design Features:**
- Modern HUD-style layout with tech aesthetic
- Interactive tilt cards with 3D effects
- Animated feature boxes
- Social media integration (Twitter, LinkedIn, GitHub, Email)

**Sections:**
- Mission statement: "We Don't Just Teach. We Calibrate."
- Core features highlighting platform differentiation
- Team information
- Contact and social links

---

### 🚀 **Career** (`src/pages/Career/index.jsx`)
**Purpose:** Career path exploration and development guidance

**Features:**
- Data-driven career recommendations
- Role progression pathways
- Industry insights and trends
- Animated grid background effects
- Interactive role exploration

---

### 📚 **Program** (`src/pages/Program/index.jsx`)
**Purpose:** Overview of curated learning programs

**Features:**
- **Three-Level Learning Path:**
  - 🟢 Beginner: Foundational concepts
  - 🟡 Intermediate: Applied skills
  - 🔴 Advanced: Expert mastery

- **Program Cards:** Detailed difficulty descriptions and learning outcomes
- **Animated Transitions:** Smooth stagger animations for visual appeal
- **Call-to-Action:** Easy enrollment and program selection

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19:** Modern UI library with latest hooks and features
- **React DOM 19:** DOM rendering engine
- **React Router DOM 7.6.3:** Client-side routing and navigation

### Styling & Animation
- **Tailwind CSS 4.1.11:** Utility-first CSS framework
- **Tailwind CSS Vite Plugin 4.1.11:** Build optimization
- **Framer Motion 12.23.0:** Declarative animations and gestures
- **Anime.js 4.0.2:** Additional animation library for complex sequences

### Content & Data
- **React Markdown 10.1.0:** Markdown to React rendering
- **Rehype Raw 7.0.0:** HTML support in markdown
- **Axios 1.10.0:** HTTP client for API requests

### Icons & UI
- **React Icons 5.5.0:** Comprehensive icon library (Font Awesome, Feather, etc.)

### Build Tools
- **Vite 7.0.0:** Lightning-fast build tool
- **Vite React Plugin 4.5.2:** React optimization for Vite

### Development Tools
- **ESLint 9.29.0:** Code quality and style enforcement
- **ESLint React Hooks Plugin:** React best practices
- **ESLint React Refresh Plugin:** Fast refresh support

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd SKILLNAVIGATOR
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory
   - Add API endpoints (Gemini API key, MongoDB connection, etc.)
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   VITE_API_BASE_URL=your_api_endpoint
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Server runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Optimized production files generated in `dist/` directory

### Preview Production Build

```bash
npm run preview
```

---

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production with optimizations
npm run build

# Run ESLint to check code quality
npm run lint

# Preview the production build locally
npm run preview
```

---

## 🔌 Key API Integrations

### Gemini AI API
- **Purpose:** Generate adaptive quiz questions and study materials
- **Usage:** 
  - Dynamic question generation based on job role skills
  - AI-powered study assistance in Study page
  - Content personalization based on proficiency

### MongoDB (Backend)
- **Purpose:** Persistent data storage
- **Data Models:**
  - User profiles and authentication
  - Learning progress and quiz results
  - User preferences and settings
  - Skill assessments and achievements

### Data Source
- **jobroleskills.json:** Comprehensive database of:
  - 250+ job roles
  - Required skills per role
  - Skill descriptions and levels
  - Career progression paths

---

## 📊 Data Flow

```
User Selection
     ↓
Fetch Job Roles (Home)
     ↓
Browse Job Role Skills (Jobrole)
     ↓
Take Assessment Quiz
     ↓
Generate AI Study Materials (Study)
     ↓
Track Progress (Dashboard)
     ↓
View Career Path (Career)
```

---

## 🎨 Design System

### Color Palette
- **Primary Dark:** `#1A2A44` (main background)
- **Secondary Dark:** `#0B1221` (accent background)
- **Accent Green:** `#00FF88` (highlights and CTAs)
- **Accent Blue:** Various blues for secondary elements
- **Text:** White and gray gradients

### Typography
- **Font Family:** Montserrat (primary), Sans-serif (secondary)
- **Headings:** Bold, tracking-tight
- **Body:** Regular weight, line-height: relaxed

### Animation Patterns
- **Framer Motion:** Orchestrated component animations
- **Anime.js:** Complex sequential animations
- **CSS Transitions:** Smooth state changes

---

## 🔐 Security Considerations

- Environment variable protection for API keys
- Input validation and sanitization
- CORS configuration for API requests
- Error boundaries for robust error handling
- Secure user session management (backend)

---

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

---

## 🤝 Contributing

1. Follow existing code structure and naming conventions
2. Use ESLint for code quality: `npm run lint`
3. Test responsive design on multiple devices
4. Maintain accessibility standards (WCAG 2.1)
5. Write clear commit messages

---

## 📝 Development Notes

### Typos/Future Fixes
- `src/pages/Quiz/Componets/` folder name should be `Components` (note the typo)

### Performance Optimizations
- Lazy loading of page components
- Image optimization with proper formats
- Code splitting for production builds
- Efficient state management

### Known Limitations
- Quiz generation depends on Gemini API availability
- Study materials require active API connection
- Initial data load depends on jobroleskills.json file size

---

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev/)

---

## 📧 Support & Feedback

For issues, suggestions, or contributions, please reach out through:
- GitHub Issues
- Email: support@skillnavigator.com
- Social Media: LinkedIn, Twitter, GitHub

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

**Built with ❤️ for learners and career professionals worldwide** 🌍
