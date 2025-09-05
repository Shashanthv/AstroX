"use client";

import { Sora } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import SplashScreen from "../components/SplashScreen";
import ThemeToggle from "../components/ThemeToggle";
import { useState } from "react";

const sora = Sora({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-sora" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showContent, setShowContent] = useState(false);

  const handleSplashComplete = () => {
    setShowContent(true);
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] min-h-screen text-[var(--text-primary)] transition-colors duration-300 ${sora.className}`}>
        {/* Always render both, but control visibility */}
        <div style={{ display: showContent ? 'none' : 'block' }}>
          <SplashScreen onComplete={handleSplashComplete} />
        </div>
        
        <div style={{ display: showContent ? 'block' : 'none' }}>
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* Theme toggle button - always visible */}
        <ThemeToggle />
      </body>
    </html>
  );
}
