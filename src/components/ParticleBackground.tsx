import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  isNode: boolean;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize canvas size
    resizeCanvas();
    
    // Add window resize listener
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      // Fewer particles for a cleaner, more professional look
      const numberOfParticles = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
      
      for (let i = 0; i < numberOfParticles; i++) {
        // Determine if this particle is a "node" (larger, more important)
        const isNode = Math.random() < 0.3; // 30% chance of being a node
        
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isNode ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15, // Slower movement for more stability
          speedY: (Math.random() - 0.5) * 0.15,
          opacity: isNode ? Math.random() * 0.7 + 0.3 : Math.random() * 0.4 + 0.1,
          color: getParticleColor(isNode),
          isNode
        });
      }
    };
    
    const getParticleColor = (isNode: boolean) => {
      // More professional, muted colors
      if (isNode) {
        const colors = [
          'rgba(51, 102, 204, 0.7)', // professional blue
          'rgba(0, 200, 150, 0.7)',  // teal (accent color)
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      } else {
        const colors = [
          'rgba(51, 102, 204, 0.4)', // professional blue (more transparent)
          'rgba(99, 102, 241, 0.3)', // indigo
          'rgba(0, 200, 150, 0.4)',  // teal (accent color)
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply a darker background with slight gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(5, 9, 20, 0.5)');
      gradient.addColorStop(1, 'rgba(10, 15, 30, 0.5)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Update position with smoother, slower movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce particles at edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Add subtle glow to nodes
        if (particle.isNode) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size + 2, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(')', ', 0.1)').replace('rgba', 'rgba');
          ctx.fill();
        }
        
        // Draw connections
        connectParticles(particle, index);
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    // Draw connections between particles to simulate neural network
    const connectParticles = (particle: Particle, index: number) => {
      for (let i = index + 1; i < particles.current.length; i++) {
        const other = particles.current[i];
        const distance = Math.sqrt(
          (particle.x - other.x) ** 2 + 
          (particle.y - other.y) ** 2
        );
        
        // Connect particles within a certain distance - longer distance for nodes
        const maxDistance = (particle.isNode || other.isNode) ? 150 : 80;
        
        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = (1 - distance / maxDistance) * 0.15;
          
          // More prominent connections between nodes
          const lineWidth = (particle.isNode && other.isNode) ? 0.8 : 
                           (particle.isNode || other.isNode) ? 0.5 : 0.3;
          
          // Color based on node connection type
          let strokeColor;
          if (particle.isNode && other.isNode) {
            // Connection between two nodes - use accent color
            strokeColor = `rgba(0, 200, 150, ${opacity * 1.5})`;
          } else if (particle.isNode || other.isNode) {
            // Connection between node and regular particle - use blue
            strokeColor = `rgba(51, 102, 204, ${opacity * 1.2})`;
          } else {
            // Connection between regular particles
            strokeColor = `rgba(99, 102, 241, ${opacity})`;
          }
          
          ctx.beginPath();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = lineWidth;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    };
    
    // Initialize and start animation
    initParticles();
    animate();
    
    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ParticleBackground;