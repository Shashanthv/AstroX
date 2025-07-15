"use client";
import HeroSection from "../components/HeroSection";
import ServiceCards from "../components/ServiceCards";
import { useEffect } from "react";
import { FaPaintBrush, FaCode, FaBullhorn, FaChartLine, FaMobileAlt, FaCamera, FaUsers, FaRobot } from "react-icons/fa";

// --- Process Section ---
const steps = [
  { step: 1, title: "Discover", desc: "We learn about your brand, goals, and audience." },
  { step: 2, title: "Create", desc: "We design, develop, and craft your digital presence." },
  { step: 3, title: "Launch", desc: "We launch, promote, and optimize for results." },
  { step: 4, title: "Grow", desc: "We analyze, iterate, and help you scale." },
];

function ProcessSection() {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-transparent">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">How We Work</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center items-center">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center relative">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#7b5cff] to-[#00eaff] text-white text-2xl font-bold mb-3 shadow-lg">{s.step}</div>
            <div className="font-semibold text-lg text-white mb-1">{s.title}</div>
            <div className="text-white/70 text-sm mb-2 max-w-xs">{s.desc}</div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute right-[-40px] top-6 w-20 h-1 bg-gradient-to-r from-[#7b5cff] to-[#00eaff] opacity-60 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// --- FAQ Section ---
const faqs = [
  { q: "What services do you offer?", a: "We offer digital marketing, web development, branding, creative design, SEO, and more." },
  { q: "How do I start a project?", a: "Contact us via our website or email, and we'll schedule a discovery call." },
  { q: "What is your process?", a: "We discover, create, launch, and help you grow. See our process section above!" },
  { q: "Do you work with startups?", a: "Absolutely! We love helping startups and established brands alike." },
];

function FAQSection() {
  return (
    <section className="w-full py-10 sm:py-16 flex flex-col items-center bg-transparent">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">Frequently Asked Questions</h2>
      <div className="w-full max-w-3xl flex flex-col gap-3 sm:gap-4 px-2 sm:px-0">
        {faqs.map((f, i) => (
          <details key={i} className="bg-white/10 rounded-xl p-3 sm:p-4 border border-white/10 group w-full">
            <summary className="font-semibold text-white cursor-pointer outline-none group-open:text-[#00eaff] transition-colors text-base sm:text-lg">{f.q}</summary>
            <div className="text-white/80 text-sm mt-2 pl-0 sm:pl-2 break-words">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen flex flex-col justify-center w-full px-2 sm:px-4 md:px-8">
      <section className="w-full max-w-7xl mx-auto">
        <HeroSection />
      </section>
      <section className="w-full max-w-7xl mx-auto">
        <ServiceCards />
      </section>
      <section className="w-full max-w-7xl mx-auto">
        <ProcessSection />
      </section>
      <section className="w-full max-w-7xl mx-auto">
        <FAQSection />
      </section>
    </main>
  );
}
