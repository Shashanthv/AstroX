"use client";
import HeroSection from "../components/HeroSection";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaBullhorn, FaChartLine, FaMobileAlt, FaCamera, FaUsers, FaRobot, FaRocket, FaGlobe } from "react-icons/fa";
import FloatingLogo from "../components/FloatingLogo";

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
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">How We Work</h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center items-center">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center relative">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white text-2xl font-bold mb-3 shadow-lg">{s.step}</div>
            <div className="font-semibold text-lg text-[var(--text-primary)] mb-1">{s.title}</div>
            <div className="text-[var(--text-primary)]/70 text-sm mb-2 max-w-xs">{s.desc}</div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute right-[-40px] top-6 w-20 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-60 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Services Section (Expanded) ---
const services = [
  {
    icon: <FaRocket className="text-4xl text-[#7b5cff] mb-2 drop-shadow-glow" />, 
    title: "Creative Design", 
    desc: "Branding, graphics, and visual storytelling that set you apart."
  },
  {
    icon: <FaGlobe className="text-4xl text-[#00eaff] mb-2 drop-shadow-glow" />, 
    title: "Web Development", 
    desc: "Modern, responsive websites and web apps that convert."
  },
  {
    icon: <FaBullhorn className="text-4xl text-[#7b5cff] mb-2 drop-shadow-glow" />, 
    title: "Digital Marketing", 
    desc: "SEO, SEM, and campaigns to grow your audience and reach."
  },
  {
    icon: <FaChartLine className="text-4xl text-[#00eaff] mb-2 drop-shadow-glow" />, 
    title: "Analytics & Strategy", 
    desc: "Data-driven insights and strategies for business growth."
  },
  {
    icon: <FaMobileAlt className="text-4xl text-[#7b5cff] mb-2 drop-shadow-glow" />, 
    title: "App Development", 
    desc: "Custom mobile and web apps for your business."
  },
  {
    icon: <FaCamera className="text-4xl text-[#00eaff] mb-2 drop-shadow-glow" />, 
    title: "Photo & Video", 
    desc: "Professional editing and production for all your needs."
  },
  {
    icon: <FaUsers className="text-4xl text-[#7b5cff] mb-2 drop-shadow-glow" />, 
    title: "Social Media", 
    desc: "Engagement strategies and content for every platform."
  },
  {
    icon: <FaRobot className="text-4xl text-[#00eaff] mb-2 drop-shadow-glow" />, 
    title: "Automation & AI", 
    desc: "Smart solutions to automate and scale your business."
  },
];

function ServicesSection() {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-transparent">
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
        Our <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">Services</span>
      </h2>
      <p className="text-lg sm:text-xl text-[var(--text-primary)]/80 max-w-2xl mb-12 text-center">
        Explore our full suite of digital marketing, creative design, branding, web development, SEO, and technology solutions.
      </p>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {services.map((s, i) => (
          <div key={i} className="flex flex-col items-center bg-[var(--card-bg)] backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-[var(--border-color)] transition-transform hover:scale-105 hover:shadow-[0_0_32px_var(--accent-secondary)] group relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              {s.icon}
              <div className="font-semibold text-lg text-[var(--text-primary)] mb-2 text-center drop-shadow-[0_0_8px_var(--accent-primary)]">{s.title}</div>
              <div className="text-[var(--text-primary)]/70 text-sm text-center">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- About Section ---
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

function AboutSection() {
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
    <section className="w-full py-16 flex flex-col items-center bg-transparent">
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
        About <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">Astro X</span>
      </h2>
      <p className="text-lg sm:text-xl text-[var(--text-primary)]/80 max-w-3xl mb-12 text-center">
        Asto X is an award-winning digital marketing agency dedicated to helping brands grow through creative design, technology, and data-driven strategy.
      </p>
      
      {/* Mission & Values */}
      <div className="w-full max-w-4xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 drop-shadow-[0_0_8px_var(--accent-secondary)]">Our Mission</h3>
            <p className="text-[var(--text-primary)]/80">To inspire and empower brands to reach their full potential through creativity, technology, and strategic thinking.</p>
          </div>
          <div className="bg-[var(--card-bg)] rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 drop-shadow-[0_0_8px_var(--accent-primary)]">Our Values</h3>
            <ul className="list-disc list-inside text-[var(--text-primary)]/80 space-y-2">
              <li>Innovation & Excellence</li>
              <li>Client Success First</li>
              <li>Integrity & Transparency</li>
              <li>Collaboration & Growth</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="w-full max-w-3xl mb-12">
        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6 text-center drop-shadow-[0_0_8px_var(--accent-secondary)]">Our Story</h3>
        <div className="flex flex-col gap-4">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-16 text-right text-[var(--accent-primary)] font-bold text-lg sm:text-xl group-hover:scale-110 transition-transform">{m.year}</div>
              <div className="flex-1 px-4 py-2 text-[var(--text-primary)]/80 text-base sm:text-lg transition-colors">{m.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="w-full max-w-3xl">
        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6 text-center drop-shadow-[0_0_8px_var(--accent-secondary)]">By the Numbers</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center px-6 py-4 text-[var(--text-primary)]/90 min-w-[90px]">
              <span className="text-3xl sm:text-4xl font-bold text-[var(--accent-primary)] drop-shadow">{counts[i]}{s.suffix || ''}</span>
              <span className="text-xs sm:text-sm mt-1 text-[var(--text-primary)]/70 uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Projects Section ---
const projects = [
  { title: "Brand Launch for NovaTech", desc: "Full branding, web, and digital campaign for a tech startup.", image: "/logo.png" },
  { title: "E-commerce Growth for StyleHub", desc: "SEO, social media, and conversion optimization for a fashion retailer.", image: "/logo1.png" },
  { title: "Rebrand for GreenLeaf", desc: "Logo, website, and content for a sustainable brand.", image: "/logo.png" },
  { title: "App Launch for FitLife", desc: "UI/UX, app store SEO, and influencer campaign.", image: "/logo1.png" },
];

function ProjectsSection() {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-transparent">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
        Our <span className="bg-gradient-to-r from-[#7b5cff] to-[#00eaff] bg-clip-text text-transparent">Projects</span>
      </h2>
      <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-12 text-center">
        A showcase of our recent work in branding, web development, digital marketing, and creative campaigns.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
        {projects.map((proj, i) => (
          <div key={i} className="bg-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-lg hover:scale-105 transition-transform backdrop-blur-md">
            <div className="relative w-24 h-24 mb-4">
              <Image src={proj.image} alt={proj.title} fill style={{ objectFit: 'contain' }} />
            </div>
            <h3 className="font-sora text-xl sm:text-2xl font-bold text-white mb-2 text-center drop-shadow-[0_0_8px_#00eaff88]">{proj.title}</h3>
            <p className="text-white/80 text-center text-base sm:text-lg">{proj.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Contact Section ---
function ContactSection() {
  return (
    <section className="w-full py-16 flex flex-col items-center bg-transparent">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
        Get In <span className="bg-gradient-to-r from-[#7b5cff] to-[#00eaff] bg-clip-text text-transparent">Touch</span>
      </h2>
      <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-12 text-center">
        Ready to grow your brand? Reach out to our team for a free consultation or to learn more about our services.
      </p>
      <div className="w-full max-w-lg bg-white/10 rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-md">
        <form className="flex flex-col gap-4 sm:gap-6">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="px-3 sm:px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#7b5cff] text-base sm:text-lg" 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="px-3 sm:px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#7b5cff] text-base sm:text-lg" 
          />
          <textarea 
            placeholder="Your Message" 
            rows={5} 
            className="px-3 sm:px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#7b5cff] resize-none text-base sm:text-lg" 
          />
          <button 
            type="submit" 
            className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#7b5cff] to-[#00eaff] text-white font-bold shadow hover:from-[#5a3fd7] hover:to-[#00bfff] transition-all text-lg sm:text-xl"
          >
            Send Message
          </button>
        </form>
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
      <FloatingLogo />
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto">
        <HeroSection />
      </section>
      

      {/* Services Section (Expanded Grid) */}
      <section id="services" className="w-full max-w-7xl mx-auto">
        <ServicesSection />
      </section>
      
      {/* About Section */}
      <section id="about" className="w-full max-w-7xl mx-auto">
        <AboutSection />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="w-full max-w-7xl mx-auto">
        <ProjectsSection />
      </section>
      
      {/* Process Section */}
      <section className="w-full max-w-7xl mx-auto">
        <ProcessSection />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="w-full max-w-7xl mx-auto">
        <ContactSection />
      </section>
      
      {/* FAQ Section */}
      <section className="w-full max-w-7xl mx-auto">
        <FAQSection />
      </section>
    </main>
  );
}
