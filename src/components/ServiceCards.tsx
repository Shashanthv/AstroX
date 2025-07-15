"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";

const services = [
  {
    image: "/servise2.jpg",
    title: "Video Editing",
    desc: "Professional video editing for ads, vlogs, and more.",
    subs: ["Ads", "Vlogs", "Social Media"],
    bg: "from-[#ff7bca] to-[#7b5cff]",
  },
  {
    image: "/servise1.jpg",
    title: "Photo Editing",
    desc: "High-quality photo retouching and creative edits.",
    subs: ["Retouch", "Creative", "Branding"],
    bg: "from-[#7b5cff] to-[#00eaff]",
  },
  {
    image: "/servise1.jpg",
    title: "Logo Designing",
    desc: "Unique, memorable logos for your business.",
    subs: ["Brand Identity", "Design", "Creativity"],
    bg: "from-[#ff7bca] to-[#7b5cff]",
  },
  {
    image: "/servise1.jpg",
    title: "Social Media Marketing",
    desc: "Grow your audience and engagement across platforms.",
    subs: ["Instagram", "Facebook", "Campaigns"],
    bg: "from-[#7b5cff] to-[#00eaff]",
  },
  {
    image: "/servise1.jpg",
    title: "Website Development",
    desc: "Modern, responsive websites that convert.",
    subs: ["Web Design", "SEO", "E-commerce"],
    bg: "from-[#ff7bca] to-[#7b5cff]",
  },
  {
    image: "/servise1.jpg",
    title: "Application Development",
    desc: "Custom mobile and web apps for your business.",
    subs: ["iOS", "Android", "Web Apps"],
    bg: "from-[#7b5cff] to-[#00eaff]",
  },
  {
    image: "/servise1.jpg",
    title: "360 Business Street View",
    desc: "Immersive 360° virtual tours for your business.",
    subs: ["Virtual Tour", "Google Maps", "3D"],
    bg: "from-[#ff7bca] to-[#7b5cff]",
  },
  {
    image: "/servise1.jpg",
    title: "Ads",
    desc: "Targeted ad campaigns for maximum ROI.",
    subs: ["Google Ads", "Meta Ads", "Strategy"],
    bg: "from-[#7b5cff] to-[#00eaff]",
  },
  {
    image: "/servise1.jpg",
    title: "Vlogging Ads",
    desc: "Creative video ads for vlogs and influencers.",
    subs: ["YouTube", "Influencer", "Editing"],
    bg: "from-[#ff7bca] to-[#7b5cff]",
  },
  {
    image: "/servise1.jpg",
    title: "WhatsApp API Integration",
    desc: "Automate and scale communication with WhatsApp API.",
    subs: ["Automation", "CRM", "Integration"],
    bg: "from-[#7b5cff] to-[#00eaff]",
  },
  {
    image: "/servise1.jpg",
    title: "Comic Ads",
    desc: "Engaging comic-style ads for unique brand storytelling.",
    subs: ["Storytelling", "Creative", "Social Media"],
    bg: "from-[#ff7bca] to-[#7b5cff]",
  },
  {
    image: "/servise1.jpg",
    title: "UI/UX Designing",
    desc: "User-centric UI/UX design for web and mobile.",
    subs: ["Wireframes", "Prototyping", "User Research"],
    bg: "from-[#7b5cff] to-[#00eaff]",
  },
];

export default function ServiceCards() {
  const memoServices = useMemo(() => services, []);
  return (
    <section className="w-full px-2 sm:px-0 py-6 sm:py-10">
      <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-8 px-2 sm:px-0">
        Our <span className="bg-gradient-to-r from-[#7b5cff] to-[#00eaff] bg-clip-text text-transparent">Core Services</span>
      </h2>
      <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-3 hide-scrollbar snap-x snap-mandatory w-full mx-auto px-0 sm:px-2 relative" style={{ scrollBehavior: 'smooth' }}>
        {memoServices.map((service, i) => (
          <motion.div
            key={i + service.title}
            className={
              `service-card snap-center min-w-[200px] max-w-[90vw] xs:min-w-[220px] sm:min-w-[280px] md:min-w-[340px] sm:max-w-md h-[320px] flex flex-col justify-end bg-white/20 backdrop-blur-md rounded-2xl shadow-xl relative group overflow-hidden transition-all duration-300`
            }
            whileHover={{ scale: 1.08, boxShadow: "0 8px 40px 0 rgba(123,92,255,0.25)" }}
          >
            {/* Image as full background */}
            <Image src={service.image} alt={service.title} fill priority={i === 0} style={{ objectFit: 'cover', zIndex: 0, borderRadius: '1rem', opacity: 1 }} />
            {/* Light reflection at top */}
            <div className="absolute top-0 left-0 w-full h-1/3 rounded-t-2xl z-20 pointer-events-none" style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 100%)',
              opacity: 0.35,
            }} />
            {/* No glass overlay, image is fully visible */}
            {/* Info bar */}
            <div className="relative z-20 p-3 pt-16 flex flex-col justify-end h-full">
              <div className="mt-auto">
                <div className="font-bold text-white text-base md:text-lg drop-shadow mb-1">{service.title}</div>
                <div className="text-xs text-white/80 mb-1">{service.desc}</div>
                <div className="flex flex-wrap gap-2 mb-1">
                  {service.subs.map((sub) => (
                    <span key={sub} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-sm">{sub}</span>
                  ))}
                </div>
                <button className="mt-1 px-3 py-1 rounded-full bg-[#7b5cff] hover:bg-[#5a3fd7] text-white font-semibold shadow transition-all text-xs">Enquire Now</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Optional: Hide scrollbar utility
// Add this to your global CSS if you want to hide the scrollbar
// .hide-scrollbar::-webkit-scrollbar { display: none; }
// .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } 