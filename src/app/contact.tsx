export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-24 px-2 sm:px-4 bg-gradient-to-br from-[#1a1440]/90 via-[#23244a]/95 to-[#00eaff]/80 relative overflow-hidden">
      {/* Space star field background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 20%, #7b5cff33 0%, transparent 70%), radial-gradient(ellipse at 30% 80%, #00eaff22 0%, transparent 80%)' }} />
      <ContactStarField />
      <h1 className="font-sora text-4xl sm:text-5xl font-bold text-white mb-6 mt-8 text-center drop-shadow-[0_0_8px_#7b5cff88]">Contact Us</h1>
      <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 text-center">Ready to grow your brand? Reach out to our team for a free consultation or to learn more about our digital marketing, design, and technology services.</p>
      <form className="w-full max-w-lg bg-white/10 rounded-2xl p-4 sm:p-8 shadow-lg flex flex-col gap-4 sm:gap-6 mx-auto">
        <input type="text" placeholder="Your Name" className="px-3 sm:px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#7b5cff] text-base sm:text-lg" />
        <input type="email" placeholder="Your Email" className="px-3 sm:px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#7b5cff] text-base sm:text-lg" />
        <textarea placeholder="Your Message" rows={5} className="px-3 sm:px-4 py-3 rounded bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#7b5cff] resize-none text-base sm:text-lg" />
        <button type="submit" className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#7b5cff] to-[#00eaff] text-white font-bold shadow hover:from-[#5a3fd7] hover:to-[#00bfff] transition-all text-lg sm:text-xl">Send Message</button>
      </form>
    </main>
  );
}

function ContactStarField({ count = 30 }) {
  const stars = Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 4,
  }));
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