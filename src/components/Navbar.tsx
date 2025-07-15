"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#0f1020]/90 via-[#1a1b2b]/80 to-transparent backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="relative flex items-center gap-2 h-12 sm:h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2" style={{ overflow: 'visible' }}>
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
              <Image src="/logo1.png" alt="Astro X Logo 1" fill style={{ objectFit: 'contain' }} />
            </div>
            <div className="relative w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20">
              <Image src="/logo.png" alt="Astro X Logo" fill style={{ objectFit: 'contain' }} />
            </div>
          </Link>
        </div>
        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Nav Links */}
        <ul
          className={clsx(
            "flex gap-6 text-lg font-medium transition-all",
            "md:flex md:static md:flex-row md:gap-6 md:bg-transparent md:p-0 md:shadow-none",
            "fixed top-0 right-0 h-screen w-2/3 bg-[#1a1b2b] shadow-2xl flex-col items-start p-8 z-40 transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full",
            "md:translate-x-0 md:h-auto md:w-auto md:items-center md:justify-end"
          )}
        >
          {navLinks.map((link) => (
            <li key={link.href} className="w-full md:w-auto mb-4 md:mb-0">
              <Link
                href={link.href}
                className={clsx(
                  "transition-colors hover:text-[#7b5cff] px-2 py-1 rounded block",
                  pathname === link.href && "bg-white/10 text-[#7b5cff]"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Overlay for mobile menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </nav>
  );
} 