import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest('button, a, [role="button"], input, textarea, select');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `scale(${isHovering ? 1.4 : 1})`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div 
          className={`w-8 h-8 rounded-full border transition-colors duration-150
            ${isHovering 
              ? 'border-sky-400/50' 
              : 'border-slate-500/30'
            }`}
        />
      </motion.div>

      {/* Center dot */}
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: mousePosition.x - 3,
          top: mousePosition.y - 3,
        }}
      >
        <div 
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-150
            ${isHovering ? 'bg-sky-400' : 'bg-slate-400'}`}
        />
      </div>
    </>
  );
}
