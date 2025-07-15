"use client";
import { FaPaintBrush, FaCode, FaBullhorn, FaChartLine, FaMobileAlt, FaCamera, FaUsers, FaRobot, FaRocket, FaGlobe, FaStar, FaMoon } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: <FaRocket className="text-4xl text-[#7b5cff] mb-2 drop-shadow-glow" />, title: "Creative Design", desc: "Branding, graphics, and visual storytelling that set you apart."
  },
  {
    icon: <FaGlobe className="text-4xl text-[#00eaff] mb-2 drop-shadow-glow" />, title: "Web Development", desc: "Modern, responsive websites and web apps that convert."
  },
  {
    icon: <FaBullhorn className="text-4xl text-[#7b5cff] mb-2 drop-shadow-glow" />, title: "Digital Marketing", desc: "SEO, SEM, and campaigns to grow your audience and reach."
  },
  {
    icon: <FaChartLine className="text-4xl text-[#00eaff] mb-2 drop-shadow-glow" />, title: "Analytics & Strategy", desc: "Data-driven insights and strategies for business growth."
  },
  {
    icon: <FaMobileAlt className="text-4xl text-[#7b5cff] mb-2 drop-shadow-glow" />, title: "App Development", desc: "Custom mobile and web apps for your business."
  },
  {
    icon: <FaCamera className="text-4xl text-[#00eaff] mb-2 drop-shadow-glow" />, title: "Photo & Video", desc: "Professional editing and production for all your needs."
  },
  {
    icon: <FaUsers className="text-4xl text-[#7b5cff] mb-2 drop-shadow-glow" />, title: "Social Media", desc: "Engagement strategies and content for every platform."
  },
  {
    icon: <FaRobot className="text-4xl text-[#00eaff] mb-2 drop-shadow-glow" />, title: "Automation & AI", desc: "Smart solutions to automate and scale your business."
  },
];

interface Star {
  key: number;
  left: string;
  top: string;
  size: string;
  twinkleDuration: number;
  twinkleDelay: number;
  moveAngle: number;
  moveDuration: number;
}

// Remove StarField, NebulaClouds, GlowingPlanet, and all related animation

export default function ServicesPage() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [gyroOffset, setGyroOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Generate stars on the client-side to prevent hydration mismatch
    const generatedStars: Star[] = Array.from({ length: 80 }).map((_, i) => {
      const angle = Math.random() * 2 * Math.PI;
      return {
        key: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 1.5 + 0.5}px`, // Made stars slightly smaller and more varied
        twinkleDuration: 2 + Math.random() * 3, // 2s to 5s
        twinkleDelay: Math.random() * 4,
        moveAngle: angle,
        moveDuration: 20 + Math.random() * 20, // Slower movement: 20s to 40s
      };
    });
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 2) { // right mouse button
        setDragging(true);
        dragStart.current = { x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y };
      }
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 2) {
        setDragging(false);
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging && dragStart.current) {
        dragOffset.current = {
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        };
        setMouseOffset({ ...dragOffset.current });
      }
    };
    const handleContextMenu = (e: MouseEvent) => {
      if (dragging) e.preventDefault();
    };
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      setGyroOffset({ x: (e.gamma || 0) * 2, y: (e.beta || 0) * 2 });
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [dragging]);

  // Calculate the parallax offset
  let parallax = { x: 0, y: 0 };
  if (typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
    // Use gyro on mobile
    parallax = { x: gyroOffset.x, y: gyroOffset.y };
  } else {
    // Use right-click drag on desktop
    parallax = { x: mouseOffset.x / 10, y: mouseOffset.y / 10 };
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-0 px-2 sm:px-4 bg-gradient-to-b from-[#10111a] via-[#181a24] to-[#0f1020] relative overflow-hidden">
      {/* Animated Starfield Background with parallax drift and moving stars */}
      <div
        className="fixed inset-0 w-full h-full z-10 pointer-events-none select-none overflow-hidden animate-starfield-drift"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`
        }}
      >
        {/* Render stars from state */}
        {stars.map((star: Star) => {
          const dx = Math.cos(star.moveAngle) * 15; // Reduced move distance
          const dy = Math.sin(star.moveAngle) * 15;
          return (
            <div
              key={star.key}
              className="absolute rounded-full bg-white"
              style={{
                '--dx': `${dx}px`,
                '--dy': `${dy}px`,
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationName: 'star-twinkle, star-move',
                animationDuration: `${star.twinkleDuration}s, ${star.moveDuration}s`,
                animationIterationCount: 'infinite, infinite',
                animationDirection: 'alternate, alternate',
                animationDelay: `${star.twinkleDelay}s, 0s`, // No delay for movement
                filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.7))'
              } as React.CSSProperties}
            />
          );
        })}
        <style>{`
          @keyframes star-twinkle {
            from { opacity: 0.4; }
            to { opacity: 1; }
          }
          @keyframes star-move {
            from { transform: translate(0, 0); }
            to { transform: translate(var(--dx), var(--dy)); }
          }
          @keyframes starfield-drift {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-12px) scale(1.01); }
            100% { transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
      {/* Realistic Planets and Moon in corners - fine-tuned placement and sizing with animation */}
      <img
        src="/earth.png"
        alt="Earth"
        className="fixed left-[-75vw] bottom-[-32vw] w-[120vw] h-[120vw] sm:w-[80vw] sm:h-[80vw] sm:left-[-28vw] sm:bottom-[-28vw] object-contain opacity-80 z-0 pointer-events-none select-none animate-earth-spin"
        style={{ filter: "drop-shadow(0 0 64px #00eaff88)" }}
      />
      <img
        src="/moon.png"
        alt="Moon"
        className="fixed right-4 top-6 w-45 h-45 sm:w-50 sm:h-50 object-contain opacity-70 z-[60] pointer-events-none select-none animate-moon-pulse"
        style={{ filter: "drop-shadow(0 0 16px #7b5cff88)" }}
      />
      <style>{`
        .animate-starfield-drift {
          animation: starfield-drift 18s ease-in-out infinite;
        }
        .animate-star-twinkle {
          animation: star-twinkle 2.5s infinite alternate;
        }
        .animate-earth-spin {
          animation: earth-spin 60s linear infinite;
        }
        @keyframes earth-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes moon-pulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 0.9; }
        }
      `}</style>
      {/* Hero Banner */}
      <section className="w-full flex flex-col items-center justify-center py-20 mb-10 relative z-10 px-2 sm:px-0">
        <h1 className="font-sora text-5xl sm:text-6xl font-extrabold text-white mb-4 text-center drop-shadow-[0_0_32px_#7b5cff]">Our Services</h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-2 text-center">Explore our full suite of digital marketing, creative design, branding, web development, SEO, and technology solutions tailored to help your business grow.</p>
      </section>
      {/* Services Grid - glassmorphism cards */}
      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 mb-16 z-10 relative px-2 sm:px-0">
        {services.map((s, i) => (
          <div key={i} className="flex flex-col items-center bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 transition-transform hover:scale-105 hover:shadow-[0_0_32px_#00eaff] group relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              {s.icon}
              <div className="font-semibold text-lg text-white mb-1 text-center drop-shadow-[0_0_8px_#7b5cff]">{s.title}</div>
              <div className="text-white/70 text-sm text-center">{s.desc}</div>
            </div>
          </div>
        ))}
      </section>
      {/* Call to Action - compact with large button */}
      <section className="w-full flex flex-col items-center justify-center py-2 mb-2 z-10">
        <div className="bg-gradient-to-r from-[#7b5cff] to-[#00eaff] rounded-full px-2 py-1 shadow-sm flex flex-col sm:flex-row items-center gap-1">
          <span className="text-white text-xs font-medium">Ready to launch your brand into the stars?</span>
          <a href="/contact" className="mt-2 sm:mt-0 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 shadow transition-all text-xs">Contact Us</a>
        </div>
      </section>
    </main>
  );
} 