import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import HeroSection from './Components/HeroSection';
import FieldGrid from './Components/FieldGrid';
import InfoContainer from './Components/InfoContainer';
import Footer from '../../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('/jobroleskills.json')
      .then((response) => response.json())
      .then((data) => {
        const uniqueFields = [...new Set(data.map((item) => item.field))];
        setEntries(uniqueFields);
      })
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  const containerData = [
    {
      text: 'We provide you with the option of test to know ur level.',
      image: '1stcontainer.svg',
    },
    {
      text: 'We will segment your account to the result of test or your preferenced one',
      image: '2ndcontainer.svg',
    },
    {
      text: 'WE provide custom roadmap with pdf, youtube courses recommendation also question for practice',
      image: '3rdcontainer.svg',
    },
    {
      text: 'Personalize progress tracking',
      image: '4thcontainer.svg',
    },
  ];

  const handleFieldClick = (fieldName) => {
    navigate(`/jobrole/${fieldName.toLowerCase().replace(/ /g, '-')}`);
  };

  const handleDropdownToggle = () => {
    setExpanded((prev) => !prev);
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="min-h-screen font-montserrat">
      <Navbar />
      <div className="flex flex-col items-center w-full">
        <HeroSection />
        <FieldGrid
          entries={entries}
          expanded={expanded}
          onFieldClick={handleFieldClick}
          onDropdownToggle={handleDropdownToggle}
        />
        <InfoContainer containerData={containerData} wordAnimation={wordAnimation} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;