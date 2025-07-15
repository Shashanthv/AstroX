import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Asto X | Award-Winning Digital Marketing Agency",
  description: "Discover, create, and elevate your brand with Asto X. Digital marketing, branding, creative design, and more.",
};

const sora = Sora({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-sora" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`bg-gradient-to-br from-[#0f1020] via-[#1a1b2b] to-[#23244a] min-h-screen text-white ${sora.className}`}>
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
