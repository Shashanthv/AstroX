export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-24 px-2 sm:px-4">
      <h1 className="font-sora text-4xl sm:text-5xl font-bold text-white mb-6 mt-8 text-center">Privacy Policy</h1>
      <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 text-center">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
      <section className="w-full max-w-3xl bg-white/10 rounded-2xl p-4 sm:p-8 mb-10 shadow-lg">
        <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-4">Information We Collect</h2>
        <p className="text-white/80 mb-4">We collect information you provide directly, such as when you fill out a form or contact us. We may also collect usage data through cookies and analytics tools.</p>
        <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-4 mt-8">How We Use Information</h2>
        <p className="text-white/80 mb-4">We use your information to provide services, improve our website, and communicate with you. We do not sell your data to third parties.</p>
        <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-4 mt-8">Your Rights</h2>
        <p className="text-white/80">You can request access, correction, or deletion of your personal data at any time by contacting us.</p>
      </section>
    </main>
  );
} 