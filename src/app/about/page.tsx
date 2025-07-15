"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SolarSystemCanvas = dynamic(() => import("../../components/SolarSystemCanvas"), { ssr: false });

const milestones = [
  { year: "2018", text: "Founded with a vision to empower brands." },
  { year: "2019", text: "First major client and award-winning campaign." },
  { year: "2021", text: "Expanded globally and grew our team." },
  { year: "2023", text: "Launched AI-driven marketing solutions." },
];

const differentiators = [
  { title: "Award-Winning", desc: "Recognized for creativity and results." },
  { title: "Cutting-Edge Tech", desc: "We use the latest tools and AI." },
  { title: "Client-First", desc: "Your success is our mission." },
  { title: "Global Reach", desc: "Projects and clients worldwide." },
];

const stats = [
  { label: "Projects", value: 50 },
  { label: "Awards", value: 10 },
  { label: "Clients", value: 30 },
  { label: "Satisfaction", value: 100, suffix: "%" },
];

export default function AboutPage() {
  // Animated counters for stats
  const [counts, setCounts] = useState(stats.map(() => 0));
  useEffect(() => {
    const intervals = stats.map((stat, i) =>
      setInterval(() => {
        setCounts((prev) => {
          const next = [...prev];
          if (next[i] < stat.value) next[i] += 1;
          return next;
        });
      }, 30)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-0 px-0 bg-black relative overflow-hidden">
      {/* 3D Solar System as background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <SolarSystemCanvas />
      </div>
      {/* Page content overlays */}
      <div className="relative w-full flex flex-col items-center justify-start pt-24 px-4 z-10 bg-transparent">
        <div className="w-full max-w-5xl mx-auto bg-black/60 rounded-2xl p-6 sm:p-10 shadow-lg">
          <h1 className="font-sora text-4xl sm:text-5xl font-bold text-white mb-4 mt-8 text-center drop-shadow-[0_0_8px_#7b5cff88] animate-fade-in bg-transparent">About Us</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-8 text-center animate-fade-in delay-100 bg-transparent mx-auto">Asto X is an award-winning digital marketing agency dedicated to helping brands grow through creative design, technology, and data-driven strategy. Our team of passionate experts delivers innovative solutions in branding, web development, SEO, and social media to empower your business for the future.</p>
          {/* Who We Are */}
          <section className="w-full max-w-3xl mb-8 animate-slide-in-up mx-auto">
            <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-[0_0_8px_#00eaff88]">Who We Are</h2>
            <p className="text-white/80 text-base sm:text-lg">We are a team of strategists, designers, and technologists who believe in the power of creativity and innovation. Our mission is to help brands not just grow, but thrive in a digital-first world.</p>
          </section>
          {/* Mission & Values */}
          <section className="w-full max-w-4xl mb-8 animate-slide-in-up delay-100 mx-auto">
            <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-[0_0_8px_#00eaff88]">Our Mission</h2>
            <p className="text-white/80 mb-4 text-base sm:text-lg">To inspire and empower brands to reach their full potential through creativity, technology, and strategic thinking.</p>
            <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-4 mt-8 drop-shadow-[0_0_8px_#7b5cff88]">Our Values</h2>
            <ul className="list-disc list-inside text-white/80 space-y-2 text-base sm:text-lg pl-4">
              <li>Innovation & Excellence</li>
              <li>Client Success First</li>
              <li>Integrity & Transparency</li>
              <li>Collaboration & Growth</li>
            </ul>
          </section>
          {/* Timeline / Our Story */}
          <section className="w-full max-w-3xl mb-8 animate-fade-in delay-200 mx-auto">
            <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-6 text-center drop-shadow-[0_0_8px_#00eaff88]">Our Story</h2>
            <div className="flex flex-col gap-4">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-16 text-right text-[#7b5cff] font-bold text-lg sm:text-xl group-hover:scale-110 transition-transform">{m.year}</div>
                  <div className="flex-1 px-4 py-2 text-white/80 text-base sm:text-lg transition-colors">{m.text}</div>
                </div>
              ))}
            </div>
          </section>
          {/* Differentiators */}
          <section className="w-full max-w-4xl mb-8 animate-fade-in delay-300 mx-auto">
            <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-6 text-center drop-shadow-[0_0_8px_#00eaff88]">What Makes Us Different</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {differentiators.map((d, i) => (
                <div key={i} className="text-center text-white/90 font-semibold text-lg animate-slide-in-up" style={{ animationDelay: `${0.1 * i + 0.3}s` }}>{d.title}<div className="text-white/70 text-sm font-normal mt-2">{d.desc}</div></div>
              ))}
            </div>
          </section>
          {/* Fun Stats */}
          <section className="w-full max-w-3xl mb-8 animate-fade-in delay-400 bg-transparent mx-auto">
            <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-6 text-center drop-shadow-[0_0_8px_#00eaff88] bg-transparent">By the Numbers</h2>
            <div className="flex flex-wrap justify-center gap-6 bg-transparent">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center px-6 py-4 text-white/90 min-w-[90px] animate-slide-in-up" style={{ animationDelay: `${0.1 * i + 0.4}s` }}>
                  <span className="text-3xl sm:text-4xl font-bold text-[#7b5cff] drop-shadow bg-transparent">{counts[i]}{s.suffix || ''}</span>
                  <span className="text-xs sm:text-sm mt-1 text-white/70 uppercase tracking-wide bg-transparent">{s.label}</span>
                </div>
              ))}
            </div>
          </section>
          {/* CTA */}
          <section className="w-full flex flex-col items-center justify-center py-2 mb-2 z-10">
            <div className="bg-gradient-to-r from-[#7b5cff] to-[#00eaff] rounded-full px-2 py-1 shadow-sm flex flex-col sm:flex-row items-center gap-1">
              <span className="text-white text-xs font-medium">Ready to launch your brand into the stars?</span>
              <a href="/contact" className="mt-2 sm:mt-0 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 shadow transition-all text-xs">Contact Us</a>
            </div>
          </section>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1); }
        @keyframes slide-in-up { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up { animation: slide-in-up 1.2s cubic-bezier(0.4,0,0.2,1); }
      `}</style>
    </main>
  );
}

function AnimatedStarField({ count = 60 }) {
  const [stars, setStars] = useState<{ left: number; top: number; size: number; duration: number; delay: number }[]>([]);
  useEffect(() => {
    const generated = Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 4,
    }));
    setStars(generated);
  }, [count]);
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {stars.map((star, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: 'white',
            opacity: 0.7,
            filter: 'drop-shadow(0 0 6px #7b5cff88) drop-shadow(0 0 12px #00eaff88)',
            animation: `star-twinkle ${star.duration}s infinite alternate`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes star-twinkle {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 