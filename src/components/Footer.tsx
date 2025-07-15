"use client";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://wa.me/", icon: FaWhatsapp, label: "WhatsApp" },
];

const moreLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 pt-12 pb-6 mt-16 overflow-hidden animate-footer-fade rounded-2xl shadow-xl mx-auto" style={{maxWidth: '100vw', border: '1.5px solid rgba(255,255,255,0.13)', boxShadow: '0 8px 48px 0 rgba(123,92,255,0.10), 0 1.5px 8px 0 rgba(0,234,255,0.10)'}}>
      {/* Enhanced Glassmorphism background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#23244a]/80 via-[#7b5cff]/50 to-[#00eaff]/40 backdrop-blur-3xl rounded-2xl" style={{opacity:0.92}} />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-10 px-4 sm:px-8 w-full relative z-10">
        {/* Logo and About */}
        <div className="flex flex-col gap-4 items-center md:items-start w-full md:w-auto md:min-w-[220px] text-center md:text-left">
          <div className="flex items-center gap-3 mb-2 justify-center md:justify-start w-full">
            <div className="relative w-10 h-10">
              <Image src="/logo1.png" alt="Astro X Logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <div className="relative w-24 h-10">
              <Image src="/logo.png" alt="Astrox Logo" fill style={{ objectFit: 'contain' }} />
            </div>
          </div>
          <p className="text-white/80 text-sm max-w-xs mx-auto md:mx-0">Award-winning digital marketing agency. We help brands grow with creative design, technology, and strategy.</p>
          <div className="text-white/70 text-sm mt-2 space-y-1">
            <div>Email: <a href="mailto:hello@astrox.com" className="underline hover:text-[#7b5cff]">hello@astrox.com</a></div>
            <div>Phone: <a href="tel:+1234567890" className="underline hover:text-[#7b5cff]">+1 234 567 890</a></div>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[160px] text-center md:text-left items-center md:items-start">
          <div className="font-semibold text-white text-base mb-1 tracking-wide">Quick Links</div>
          <ul className="flex flex-col gap-1 text-white/80 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#7b5cff] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            {moreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#7b5cff] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Newsletter & Social */}
        <div className="flex flex-col gap-4 w-full md:w-auto md:min-w-[220px] text-center md:text-left items-center md:items-start">
          <div className="font-semibold text-white text-base mb-1 tracking-wide">Stay in the Loop</div>
          <form className="flex flex-col xs:flex-row gap-2 w-full max-w-xs mx-auto md:mx-0">
            <input type="email" placeholder="Your email" className="px-3 py-2 rounded bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#7b5cff] w-full text-sm transition-all" />
            <button type="submit" className="px-5 py-2 rounded bg-[#7b5cff] text-white font-semibold hover:bg-[#5a3fd7] transition-colors text-sm">Subscribe</button>
          </form>
          <div className="flex gap-4 mt-2 justify-center md:justify-start w-full">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-2xl text-white/80 hover:text-[#7b5cff] transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-white/10 my-8 relative z-10" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 px-4 sm:px-8 relative z-10">
        <div className="text-xs text-white/60">© {new Date().getFullYear()} Asto X. All rights reserved.</div>
        <div className="text-xs text-white/60">Empowering Brands. Inspiring Results.</div>
      </div>
      <style>{`
        @keyframes footer-fade {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-footer-fade {
          animation: footer-fade 1.2s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </footer>
  );
} 