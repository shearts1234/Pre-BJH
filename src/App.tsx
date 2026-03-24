import { useState, useRef } from 'react';
import StylistForm from './components/StylistForm';

function App() {
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const diagnosisRef = useRef<HTMLDivElement>(null);

  const startDiagnosis = () => {
    setShowDiagnosis(true);
    setTimeout(() => {
      diagnosisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('이 기능은 현재 준비 중입니다. 곧 멋진 모습으로 찾아올게요!');
  };

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#fcf9f8]/80 dark:bg-[#1A1A1A]/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#1A1A1A] dark:text-[#fcf9f8] cursor-pointer" onClick={handleComingSoon}>menu</span>
            <h1 className="font-headline font-black text-2xl italic tracking-tighter text-[#1A1A1A] dark:text-[#fcf9f8] cursor-pointer" onClick={() => window.location.reload()}>Style AI</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a className="text-[#1A1A1A] dark:text-[#fcf9f8] font-bold hover:text-[#775a19] transition-colors duration-300" href="/">Home</a>
            <a className="text-[#1A1A1A]/60 dark:text-[#fcf9f8]/60 hover:text-[#775a19] transition-colors duration-300" href="#" onClick={handleComingSoon}>Outfits</a>
            <a className="text-[#1A1A1A]/60 dark:text-[#fcf9f8]/60 hover:text-[#775a19] transition-colors duration-300" href="#" onClick={handleComingSoon}>Upload</a>
            <a className="text-[#1A1A1A]/60 dark:text-[#fcf9f8]/60 hover:text-[#775a19] transition-colors duration-300" href="#" onClick={handleComingSoon}>Profile</a>
          </nav>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20 cursor-pointer" onClick={handleComingSoon}>
            <img 
              alt="User profile avatar" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv5ciHoaea3cXMj6bp0_jFUZ0loxVi6rnAImHK0ihQTKzi0EZa2stY-VheiTnHrHt0nqoVcxs23csgHJ40G7uXyJIlx2LT_SaTMU-j9Q_UqEEFfxqhpVhyQIhpbBiYspHixZpzgwIUwcJlqhgMTQLj0GQqzI-WnQwFKswJ4Xn_JWGqtKbGafzIP12m8wHfy7CLIk6V5a0DVWwHtqoSH5wS9uLZ9HbWpoY-VzDPBVHmEr3dp5wrljF2P98o0ORLTX8EXV5dkfxqfVqYo"
            />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32">
        {/* Hero Section: Intentional Asymmetry & Editorial Layout */}
        <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-8 items-center min-h-[707px]">
          <div className="md:col-span-7 z-10">
            <span className="inline-block bg-primary-fixed text-on-primary-fixed-variant px-4 py-1 rounded-full text-xs font-label uppercase tracking-widest mb-6">Autumn/Winter 2024</span>
            <h2 className="font-headline text-5xl md:text-8xl font-black text-primary leading-[1.1] tracking-tighter mb-8">
              Find Your <br/>Perfect <span className="text-secondary italic">Style</span> <br/>with AI
            </h2>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-lg mb-12 leading-relaxed">
              Experience the future of personal fashion. Our advanced AI curators analyze your unique features to deliver a bespoke digital atelier experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={startDiagnosis}
                className="bg-primary text-on-primary px-8 py-5 rounded-md font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
              >
                Start Style Diagnosis
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <button 
                onClick={scrollToFeatures}
                className="border-b-2 border-secondary text-on-surface px-8 py-5 font-bold hover:text-secondary transition-colors flex items-center justify-center"
              >
                Explore Looks
              </button>
            </div>
          </div>
          <div className="md:col-span-5 relative h-full min-h-[500px] md:min-h-screen">
            <div className="absolute inset-0 bg-surface-container-low rounded-3xl overflow-hidden md:-mr-24 transform translate-y-12 md:translate-y-0">
              <img 
                alt="High-end editorial fashion photography" 
                className="w-full h-full object-cover grayscale-[20%] contrast-[1.1] hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIRoOjFvRqd9prYemhGCWbkr0pn0HQsi4JlLqtOQMQuesgBwsOe9IU6hJG1n-1T31Z1zGCMIpkLm8kshLqZNHtH8Hk5BhYFujz8tAHbu3N60O8rVgjfM_H3ox-SlQaCt4C3FzR-rYRNggj_qhH2huReVyMNj-NQWFQg_nyxiwbn59SxHa_A6Od0EUMSWiayLxpfkrsc5Usiyygh8OqtmaT2yZzpEbx2-y2LiJvl1Tn-RqD2sNqdr9yI1udkIufFHkGSZEDmoc-kxs"
              />
            </div>
            {/* Floating Decorative Elements */}
            <div className="absolute -bottom-4 -left-8 bg-surface-container-lowest p-6 rounded-xl editorial-shadow hidden md:block max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Match Score</span>
              </div>
              <p className="font-headline text-3xl font-black italic">98%</p>
              <p className="text-xs text-on-surface-variant leading-tight mt-1">Perfect Harmony with skin tone and silhouette.</p>
            </div>
          </div>
        </section>

        {/* Diagnosis Form Section (Only shown when clicked) */}
        {showDiagnosis && (
          <section ref={diagnosisRef} className="max-w-7xl mx-auto px-6 mt-32 md:mt-48 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div className="max-w-xl">
                <h3 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-primary">Style Diagnosis</h3>
                <p className="text-on-surface-variant font-body leading-relaxed">Sophisticated algorithms replacing guesswork with aesthetic science.</p>
              </div>
              <div className="h-px bg-outline-variant/30 flex-grow mx-12 hidden md:block mb-4"></div>
              <span className="font-headline italic text-xl text-secondary">Diagnostic — Atelier</span>
            </div>
            <div className="bg-surface-container-low p-8 md:p-16 rounded-3xl editorial-shadow">
              <StylistForm />
            </div>
          </section>
        )}

        {/* Features Section: Bento-ish Grid */}
        <section id="features" className="max-w-7xl mx-auto px-6 mt-32 md:mt-48">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="max-w-xl">
              <h3 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-primary">Precision Curation</h3>
              <p className="text-on-surface-variant font-body leading-relaxed">Sophisticated algorithms replacing guesswork with aesthetic science.</p>
            </div>
            <div className="h-px bg-outline-variant/30 flex-grow mx-12 hidden md:block mb-4"></div>
            <span className="font-headline italic text-xl text-secondary">01 — 03</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between min-h-[320px] group hover:bg-surface-container-high transition-colors cursor-pointer" onClick={handleComingSoon}>
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">accessibility_new</span>
                <h4 className="font-headline text-2xl font-bold mb-4">Body Type Analysis</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm">Advanced geometric scanning to identify your silhouette and suggest cuts that elevate your natural form.</p>
              </div>
              <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest">Discover</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="bg-primary p-8 rounded-xl flex flex-col justify-between min-h-[320px] text-on-primary group shadow-2xl relative overflow-hidden cursor-pointer" onClick={handleComingSoon}>
              <div className="z-10">
                <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6">palette</span>
                <h4 className="font-headline text-2xl font-bold mb-4 text-white">Skin Tone Matching</h4>
                <p className="text-primary-fixed-dim leading-relaxed text-sm">A digital seasonal color analysis using spectrophotometry to find the shades that illuminate your complexion.</p>
              </div>
              <div className="pt-6 border-t border-primary-fixed-dim/20 flex justify-between items-center z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-fixed">Analysis</span>
                <span className="material-symbols-outlined text-secondary-fixed group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between min-h-[320px] group hover:bg-surface-container-high transition-colors duration-300 cursor-pointer" onClick={handleComingSoon}>
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">checkroom</span>
                <h4 className="font-headline text-2xl font-bold mb-4">Outfit Recommendations</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm">Daily curated looks synced with your calendar, local weather, and high-fashion trend forecasting.</p>
              </div>
              <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest">View Looks</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </div>
          </div>
        </section>

        {/* Aesthetic Highlight Section */}
        <section className="max-w-7xl mx-auto px-6 mt-32 md:mt-48 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="relative">
                <img 
                  alt="Fashion detail" 
                  className="rounded-2xl w-full h-[600px] object-cover editorial-shadow"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7DAkJAceUrEevY5t0u_Yo4BiProJtdNiZRuBo8EPNnGg3nka7wagR6qUFDIzMmf-vwypnWdvMYVfVqeQoMAZ5tSJOGcEHg1750pkU4MY0F-i0WFacNzQrTB7sfeFvkuXQVu68NPJUKBiBa2jljEAuOKOYTkUcneSlbvjq46R046alIKpD6LZldeWt2g30fIYmTX4DzVFGVXALDCVzZyCYxiWrMiWrX7JQ1iHypykMGjMoSCGSwLNLy3r4f6puz1Q8oRnSOWO1d80"
                />
                <div className="absolute -top-10 -right-10 w-48 h-48 border-2 border-secondary/20 rounded-full animate-pulse hidden lg:block"></div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="font-headline text-4xl md:text-6xl font-black italic mb-8 leading-tight text-primary uppercase">
                Elevated by Technology, Rooted in <span className="text-secondary underline decoration-1 underline-offset-8">Artistry</span>.
              </h3>
              <p className="text-on-surface-variant text-lg mb-8 leading-relaxed font-body">
                We don't just follow trends; we understand the architectural principles of style. Every recommendation is a dialogue between human creativity and algorithmic precision.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4 font-body text-primary">
                  <span className="text-secondary font-headline italic font-bold text-2xl">A.</span>
                  <div>
                    <h5 className="font-bold mb-1">Couture Logic</h5>
                    <p className="text-sm text-on-surface-variant">Patterns derived from centuries of master tailoring.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 font-body text-primary">
                  <span className="text-secondary font-headline italic font-bold text-2xl">B.</span>
                  <div>
                    <h5 className="font-bold mb-1">Sustainable Selection</h5>
                    <p className="text-sm text-on-surface-variant">Prioritizing timeless pieces and conscious labels.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 bg-[#ffffff]/80 dark:bg-[#1A1A1A]/80 backdrop-blur-xl border-t border-[#c4c7c7]/15 shadow-[0_-10px_40px_-5px_rgba(28,27,27,0.05)] z-50 rounded-t-xl">
        <a className="flex flex-col items-center justify-center text-[#1A1A1A] dark:text-[#fcf9f8] border-t-2 border-[#775a19] pt-2 active:scale-95 duration-200" href="/">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="font-manrope text-[10px] uppercase tracking-widest mt-1 font-bold">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#1A1A1A]/40 dark:text-[#fcf9f8]/40 pt-2 active:scale-95 duration-200" href="#" onClick={handleComingSoon}>
          <span className="material-symbols-outlined">person</span>
          <span className="font-manrope text-[10px] uppercase tracking-widest mt-1 font-bold">Profile</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#1A1A1A]/40 dark:text-[#fcf9f8]/40 pt-2 active:scale-95 duration-200" href="#" onClick={handleComingSoon}>
          <span className="material-symbols-outlined">cloud_upload</span>
          <span className="font-manrope text-[10px] uppercase tracking-widest mt-1 font-bold">Upload</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#1A1A1A]/40 dark:text-[#fcf9f8]/40 pt-2 active:scale-95 duration-200" href="#" onClick={handleComingSoon}>
          <span className="material-symbols-outlined">checkroom</span>
          <span className="font-manrope text-[10px] uppercase tracking-widest mt-1 font-bold">Outfits</span>
        </a>
      </nav>

      {/* Footer */}
      <footer className="bg-surface-container px-6 py-20 border-t border-outline-variant/10 font-body text-primary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-headline font-black text-3xl italic tracking-tighter mb-6">Style AI</h2>
            <p className="text-on-surface-variant max-w-sm mb-8 leading-relaxed">
              Redefining personal fashion through the lens of artificial intelligence and high-end editorial expertise.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-outline-variant/20 flex items-center justify-center hover:bg-secondary/20 transition-colors cursor-pointer" onClick={handleComingSoon}>
                <span className="material-symbols-outlined text-sm">share</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-outline-variant/20 flex items-center justify-center hover:bg-secondary/20 transition-colors cursor-pointer" onClick={handleComingSoon}>
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </div>
            </div>
          </div>
          <div>
            <h6 className="font-bold uppercase text-[10px] tracking-[0.2em] mb-6">Maison</h6>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a className="hover:text-secondary transition-colors font-medium" href="#" onClick={handleComingSoon}>Collections</a></li>
              <li><a className="hover:text-secondary transition-colors font-medium" href="#" onClick={handleComingSoon}>Philosophy</a></li>
              <li><a className="hover:text-secondary transition-colors font-medium" href="#" onClick={handleComingSoon}>Journal</a></li>
              <li><a className="hover:text-secondary transition-colors font-medium" href="#" onClick={handleComingSoon}>Careers</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold uppercase text-[10px] tracking-[0.2em] mb-6">Support</h6>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li><a className="hover:text-secondary transition-colors font-medium" href="#" onClick={handleComingSoon}>Privacy Policy</a></li>
              <li><a className="hover:text-secondary transition-colors font-medium" href="#" onClick={handleComingSoon}>Terms of Service</a></li>
              <li><a className="hover:text-secondary transition-colors font-medium" href="#" onClick={handleComingSoon}>Membership</a></li>
              <li><a className="hover:text-secondary transition-colors font-medium" href="#" onClick={handleComingSoon}>Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/20 flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-black">
          <p>© 2024 Style AI Digital Atelier. All Rights Reserved.</p>
          <p>Designed in London & Paris</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
