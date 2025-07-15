export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start pt-24 px-2 sm:px-4">
      <h1 className="font-sora text-4xl sm:text-5xl font-bold text-white mb-6 mt-8 text-center">Terms of Service</h1>
      <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 text-center">By using our website and services, you agree to the following terms and conditions.</p>
      <section className="w-full max-w-3xl bg-white/10 rounded-2xl p-4 sm:p-8 mb-10 shadow-lg">
        <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-4">Use of Services</h2>
        <p className="text-white/80 mb-4">You agree to use our services only for lawful purposes and in accordance with these terms.</p>
        <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-4 mt-8">Intellectual Property</h2>
        <p className="text-white/80 mb-4">All content, trademarks, and intellectual property on this site are owned by Asto X or its licensors.</p>
        <h2 className="font-sora text-2xl sm:text-3xl font-bold text-white mb-4 mt-8">Limitation of Liability</h2>
        <p className="text-white/80">We are not liable for any damages arising from the use of our website or services.</p>
      </section>
    </main>
  );
} 