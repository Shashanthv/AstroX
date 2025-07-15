import Image from "next/image";

const projects = [
  { title: "Brand Launch for NovaTech", desc: "Full branding, web, and digital campaign for a tech startup.", image: "/logo.png" },
  { title: "E-commerce Growth for StyleHub", desc: "SEO, social media, and conversion optimization for a fashion retailer.", image: "/logo1.png" },
  { title: "Rebrand for GreenLeaf", desc: "Logo, website, and content for a sustainable brand.", image: "/logo.png" },
  { title: "App Launch for FitLife", desc: "UI/UX, app store SEO, and influencer campaign.", image: "/logo1.png" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-24 px-2 sm:px-4 bg-gradient-to-br from-[#1a1440]/90 via-[#23244a]/95 to-[#00eaff]/80 relative overflow-hidden">
      {/* Space star field background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 20%, #7b5cff33 0%, transparent 70%), radial-gradient(ellipse at 30% 80%, #00eaff22 0%, transparent 80%)' }} />
      <ProjectsStarField />
      <h1 className="font-sora text-4xl sm:text-5xl font-bold text-white mb-6 mt-8 text-center drop-shadow-[0_0_8px_#7b5cff88]">Our Projects</h1>
      <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 text-center">A showcase of our recent work in branding, web development, digital marketing, and creative campaigns for clients across industries.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl mb-16 z-10 relative px-2 sm:px-0">
        {projects.map((proj, i) => (
          <div key={i} className="bg-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-lg hover:scale-105 transition-transform backdrop-blur-md">
            <div className="relative w-24 h-24 mb-4">
              <Image src={proj.image} alt={proj.title} fill style={{ objectFit: 'contain' }} />
            </div>
            <h2 className="font-sora text-xl sm:text-2xl font-bold text-white mb-2 text-center drop-shadow-[0_0_8px_#00eaff88]">{proj.title}</h2>
            <p className="text-white/80 text-center text-base sm:text-lg">{proj.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function ProjectsStarField({ count = 40 }) {
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