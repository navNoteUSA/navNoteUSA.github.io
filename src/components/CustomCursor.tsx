import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    
    if (!cursor || !cursorRing) return;

    const onMouseMove = (e: MouseEvent) => {
      // Position the cursor dot at the mouse position
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Position the cursor ring with a slight delay for the trailing effect
      setTimeout(() => {
        if (cursorRing) {
          cursorRing.style.left = `${e.clientX}px`;
          cursorRing.style.top = `${e.clientY}px`;
        }
      }, 100);
    };

    // Add style class on interactive elements
    const onMouseEnter = () => {
      cursor.classList.add('cursor-active');
      cursorRing.classList.add('cursor-ring-active');
    };

    const onMouseLeave = () => {
      cursor.classList.remove('cursor-active');
      cursorRing.classList.remove('cursor-ring-active');
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    
    // Add interactive behavior for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', onMouseEnter);
      element.addEventListener('mouseleave', onMouseLeave);
    });

    // Cleanup on component unmount
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="custom-cursor hidden md:block fixed w-4 h-4 bg-blue-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ 
          transition: 'width 0.2s, height 0.2s, transform 0.1s',
        }}
      ></div>
      <div 
        ref={cursorRingRef} 
        className="custom-cursor-ring hidden md:block fixed w-8 h-8 border-2 border-blue-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ 
          transition: 'width 0.4s, height 0.4s, transform 0.1s',
        }}
      ></div>
    </>
  );
};

export default CustomCursor; 