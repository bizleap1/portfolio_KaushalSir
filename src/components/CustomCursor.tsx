import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactable = target.closest('a, button, [data-cursor="interactable"]');
      const projectCard = target.closest('[data-cursor="project"]');
      
      if (projectCard) {
        setIsHovering(true);
        setHoverText("VIEW PROJECT");
      } else if (interactable) {
        setIsHovering(true);
        setHoverText("");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gold-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      {/* Outline / Text */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 border border-gold-primary rounded-full pointer-events-none z-[9999] flex items-center justify-center text-[10px] font-sans font-medium text-gold-primary tracking-widest text-center leading-tight bg-black-deep/40 backdrop-blur-sm mix-blend-difference"
        animate={{
          x: mousePosition.x - 48,
          y: mousePosition.y - 48,
          scale: isHovering ? (hoverText ? 1 : 0.5) : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
      >
        {hoverText && <span className="px-2">{hoverText}</span>}
      </motion.div>
    </>
  );
};
