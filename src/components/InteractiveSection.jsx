import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import ExpandedPanel from './ExpandedPanel';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const springConfig = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.8,
};

const InteractiveSection = ({ section, position, setActiveSection, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [shouldMountVideo, setShouldMountVideo] = React.useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  React.useEffect(() => {
    let timeout;
    if (isHovered) {
      // Delay mounting iframe until the scale animation is done
      timeout = setTimeout(() => setShouldMountVideo(true), 300);
    } else {
      setShouldMountVideo(false);
      setIsVideoLoaded(false);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  const isIdle = position === 'idle';
  const isActive = position === 'active';
  const isOther = position === 'left' || position === 'right';

  // 140px spacing between items when idle vertically
  const initialY = (index - 1) * 140; 

  let xOffset = '0vw';
  if (position === 'left') xOffset = '-42vw';
  if (position === 'right') xOffset = '42vw';
  
  let rotateY = 0;
  if (position === 'left') rotateY = 60;
  if (position === 'right') rotateY = -60;

  return (
    <motion.div
      className={cn(
        "absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center cursor-pointer",
        isActive ? "z-50" : isOther ? "z-0" : "z-10"
      )}
      style={{ willChange: 'transform' }}
      onMouseEnter={() => {
        if (isIdle) {
          setActiveSection(section.id);
        }
      }}
      initial={false}
      animate={{
        x: xOffset,
        y: isIdle ? initialY : 0,
        z: isOther ? -200 : 0,
        rotateY: rotateY,
        scale: isOther ? 0.75 : 1,
        opacity: isOther ? 0.8 : 1,
      }}
      transition={springConfig}
    >
      {/* The main heading that stays visible, but moves to the left when active */}
      <motion.div
        className={cn(
          "absolute left-0 top-0 flex items-center gap-8 z-20 transition-opacity duration-300",
          isOther ? "opacity-0 pointer-events-none" : "opacity-100",
          isActive ? "pointer-events-none" : ""
        )}
        animate={{
          x: isActive ? 'calc(-30vw + 40px)' : 'calc(-50%)',
          y: isActive ? 'calc(-45vh + 40px)' : 'calc(-50%)',
        }}
        transition={springConfig}
      >
        <motion.h1
          className={cn(
            "text-[9vw] font-bold tracking-tighter uppercase leading-none transition-colors duration-500 origin-top-left",
            isActive ? "text-black" : "text-black/90 hover:text-black"
          )}
          animate={{
            scale: isActive ? (section.id === 'ACADEMY' ? 0.55 : 0.75) : 1,
          }}
          transition={springConfig}
          style={{ fontFamily: "'Oswald', 'Inter', sans-serif" }} 
        >
          {section.title}
        </motion.h1>
        
        {/* Plus icon */}
        <motion.div
          animate={{
            rotate: isActive ? 45 : 0,
            opacity: isActive ? 0 : 1, // Hide when active
          }}
          transition={springConfig}
          className="text-black/50"
        >
          <Plus size={48} strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* Expanded Panel */}
      <ExpandedPanel
        section={section}
        isActive={isActive}
        onClose={() => setActiveSection(null)}
      />

      {/* Preview Card (Perspective Card) */}
      <AnimatePresence>
        {isOther && (
          <motion.div
            initial={{ opacity: 0, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, x: '-50%', y: '-50%', transition: { delay: 0.2 } }}
            exit={{ opacity: 0, x: '-50%', y: '-50%', transition: { duration: 0.1 } }}
            whileHover={{ scale: 1.02, transition: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 } }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="absolute top-1/2 left-1/2 w-[35vw] h-[85vh] bg-white rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col p-12 cursor-pointer"
            onClick={() => setActiveSection(section.id)}
          >
            <h1 className="text-[6vw] font-bold tracking-tighter uppercase leading-none" style={{ fontFamily: "'Oswald', 'Inter', sans-serif" }}>
              {section.title}
            </h1>
            <p className="mt-8 text-black/60 font-medium text-lg leading-relaxed max-w-sm">
              {section.description}
            </p>
            
            <div className="mt-auto pt-8">
               <motion.button
                  className="flex items-center gap-2 text-xs font-bold tracking-widest hover:text-red-600 transition-colors uppercase group mb-12"
                >
                  VIEW MORE
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              
              <div className="w-full h-[35vh] rounded-xl overflow-hidden relative" style={{ willChange: 'transform' }}>
                <img 
                  src={section.heroImage} 
                  decoding="async"
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${isHovered && isVideoLoaded ? 'opacity-0' : 'opacity-100'}`} 
                  alt="" 
                />
                
                {section.video && shouldMountVideo && (
                   <iframe
                     onLoad={() => setIsVideoLoaded(true)}
                     className={`absolute inset-0 w-full h-[150%] top-[-25%] pointer-events-none transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                     src={`https://www.youtube.com/embed/${section.video}?autoplay=1&mute=1&controls=0&loop=1&playlist=${section.video}&vq=hd1080&rel=0&modestbranding=1&showinfo=0&disablekb=1&iv_load_policy=3&playsinline=1`}
                     frameBorder="0"
                     allow="autoplay; encrypted-media"
                   />
                )}
                
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveSection;
