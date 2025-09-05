"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

export default function FloatingLogo() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Hide logo when scrolling down, show when scrolling up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;
    
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [handleScroll]);

  return (
    <div 
      className={`fixed top-6 left-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8">
          <Image src="/logo1.png" alt="Astro X Logo 1" fill style={{ objectFit: 'contain' }} />
        </div>
        <div className="relative w-20 h-6">
          <Image src="/logo.png" alt="Astro X Logo" fill style={{ objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
}
