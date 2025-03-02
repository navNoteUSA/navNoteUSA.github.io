import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Mission from './components/Mission';
import Technology from './components/Technology';
import Partners from './components/Partners';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('a') ||
          (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-primary text-white overflow-x-hidden">
      {/* Custom cursor (visible only on desktop) */}
      <div 
        className="custom-cursor hidden md:block"
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          width: isHovering ? '48px' : '24px',
          height: isHovering ? '48px' : '24px',
          backgroundColor: isHovering ? 'rgba(176, 38, 255, 0.5)' : 'rgba(0, 240, 255, 0.5)',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Main content */}
      <Navbar />
      <Hero />
      <Features />
      <Technology />
      <Mission />
      <Partners />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;