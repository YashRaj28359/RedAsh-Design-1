import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const CoverflowCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500); // Automatically move every 2.5s
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
      {images.map((img, index) => {
        const len = images.length;
        let diff = index - currentIndex;
        
        // Wrap differences for infinite loop
        if (diff > Math.floor(len / 2)) diff -= len;
        if (diff < -Math.floor(len / 2)) diff += len;

        const isActive = diff === 0;

        return (
          <motion.div
            key={index}
            className="absolute h-[90%] top-[5%] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] cursor-pointer"
            style={{ 
              width: '32%', 
              left: '50%', 
              marginLeft: '-16%', 
              zIndex: 10 - Math.abs(diff),
              willChange: 'transform, opacity'
            }}
            animate={{
              x: `${diff * 115}%`,
              z: Math.abs(diff) * -150,
              rotateY: diff * -35,
              scale: isActive ? 1 : 0.85,
              opacity: Math.abs(diff) > 2 ? 0 : 1
            }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={img} decoding="async" className="w-full h-full object-cover" alt="" />
            
            {/* Dark overlay for inactive images */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-50'}`} />
            
            {/* Play Button matching the reference */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center" style={{ willChange: 'opacity' }}>
                 <Play size={16} fill="white" className="text-white ml-1" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const ExpandedPanel = ({ section, isActive, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldMountVideo, setShouldMountVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    let timeout;
    if (isHovered) {
      timeout = setTimeout(() => setShouldMountVideo(true), 300);
    } else {
      setShouldMountVideo(false);
      setIsVideoLoaded(false);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  if (!section) return null;

  return (
    <>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 1, y: '-50%', x: '-50%' }}
          animate={{
            opacity: 1,
            scale: 1,
            y: '-50%',
            x: '-50%',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            opacity: 0,
            scale: 1,
            y: '-50%',
            x: '-50%',
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="absolute top-1/2 left-1/2 w-[60vw] h-[90vh] bg-[#fafafa]/95 backdrop-blur-md rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.12)] overflow-hidden flex z-10 p-10 gap-8"
          style={{ willChange: 'transform, opacity' }}
          onMouseLeave={onClose}
        >
          {/* Left Column */}
          <div className="w-[35%] h-full flex flex-col pt-[8vw]">
            <div className="w-12 h-[2px] bg-red-600/80 mb-6" />
            
            <div className="text-black/90 font-medium text-lg leading-relaxed mb-10 pr-4">
              {section.description}
            </div>

            <div className="flex flex-col gap-8 overflow-y-auto pb-4 custom-scrollbar">
              {section.categories.map((cat, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="text-red-600 mt-1 shrink-0">
                    <cat.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[13px] tracking-widest uppercase mb-1.5">{cat.title}</h3>
                    <p className="text-black/60 text-sm leading-relaxed max-w-[200px]">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[65%] h-full flex flex-col gap-4">
            {/* Top Hero Image */}
            <div 
              className="flex-[2.5] relative rounded-2xl overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img 
                src={section.heroImage} 
                className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${isHovered && isVideoLoaded ? 'opacity-0' : 'opacity-100'}`} 
                alt="Hero" 
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
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-10 right-10 text-right max-w-[400px] flex flex-col items-end pointer-events-none z-10">
                <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-3">We Create</span>
                <h2 className="text-white text-3xl font-bold leading-tight mb-4">{section.overlayText}</h2>
                <p className="text-white/80 text-sm leading-relaxed">{section.overlaySub}</p>
              </div>
            </div>

            {/* Bottom 3D Coverflow Carousel */}
            <div className="flex-[1.5] w-full mt-2">
               <CoverflowCarousel images={section.carouselImages} />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ExpandedPanel;
