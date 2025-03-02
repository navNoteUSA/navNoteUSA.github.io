import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match app colors
    const colors = [
      'rgba(77, 157, 224, 0.6)',  // Secondary - Light blue
      'rgba(120, 192, 145, 0.6)', // Accent - Green
      'rgba(255, 255, 255, 0.3)', // White
    ];

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle class for hexagons
    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      isHexagon: boolean;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 8 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.isHexagon = Math.random() > 0.7; // 30% of particles will be hexagons
      }

      update() {
        // Move particles
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;

        if (this.isHexagon) {
          // Draw hexagon
          const a = (2 * Math.PI) / 6;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            ctx.lineTo(
              this.x + this.size * Math.cos(a * i),
              this.y + this.size * Math.sin(a * i)
            );
          }
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        } else {
          // Draw circle
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
    }

    // Create particle array
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connection line function
    const connect = () => {
      const maxDistance = 150;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            
            // Get gradient color based on particle colors
            const startColor = particles[a].color;
            const endColor = particles[b].color;
            
            if (ctx) {
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              
              // Create gradient for the line
              const gradient = ctx.createLinearGradient(
                particles[a].x, particles[a].y, 
                particles[b].x, particles[b].y
              );
              gradient.addColorStop(0, startColor.replace(/[^,]+(?=\))/, `${opacity * 0.3}`));
              gradient.addColorStop(1, endColor.replace(/[^,]+(?=\))/, `${opacity * 0.3}`));
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      connect();
      
      requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-transparent"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;