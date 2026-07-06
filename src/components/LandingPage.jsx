import React, { useState } from 'react';
import { sectionsData } from '../data/content';
import InteractiveSection from './InteractiveSection';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/R RedAsh.png';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <main className="relative w-screen h-screen flex flex-col justify-center items-center overflow-hidden bg-[#fafafa]">
      {/* Top Left Logo (Static) */}
      <div className="absolute top-8 left-8 z-50 flex items-center">
        <img src={logoImg} alt="RedAsh Logo" className="h-12 w-auto" />
      </div>

      {/* Top Right Menu (Static) */}
      <div className="absolute top-8 right-8 z-50">
        <button className="w-8 flex flex-col gap-1.5 items-end group">
          <span className="w-full h-0.5 bg-black transition-all group-hover:w-3/4"></span>
          <span className="w-3/4 h-0.5 bg-black transition-all group-hover:w-full"></span>
          <span className="w-full h-0.5 bg-black transition-all group-hover:w-1/2"></span>
        </button>
      </div>

      {/* Sections Container */}
      <div className="relative w-full h-full z-10" style={{ perspective: '2000px' }}>
        {sectionsData.map((section, index) => {
          const activeIndex = sectionsData.findIndex(s => s.id === activeSection);
          let position = 'idle';
          if (activeSection !== null) {
            if (index === activeIndex) position = 'active';
            else if (activeIndex === 0) position = index === 1 ? 'right' : 'left';
            else if (activeIndex === 1) position = index === 0 ? 'left' : 'right';
            else if (activeIndex === 2) position = index === 0 ? 'left' : 'right';
          }

          return (
            <InteractiveSection
              key={section.id}
              section={section}
              position={position}
              setActiveSection={setActiveSection}
              index={index}
            />
          );
        })}
      </div>

      {/* Overlay background when active */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#fafafa]/50 backdrop-blur-[2px] z-0"
            onClick={() => setActiveSection(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default LandingPage;
