import { useState, useRef } from 'react';
import StylistForm from './components/StylistForm';
import './App.css';

function App() {
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const diagnosisRef = useRef<HTMLDivElement>(null);

  const startDiagnosis = () => {
    setShowDiagnosis(true);
    setTimeout(() => {
      diagnosisRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-surface font-body text-on-surface">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#fcf9f8]/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#1A1A1A] cursor-pointer">menu</span>
            <h1 className="font-headline font-black text-2xl italic tracking-tighter text-[#1A1A1A]">Style AI</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a className="text-[#1A1A1A] font-bold hover:text-[#775a19] transition-colors duration-300" href="#">Home</a>
            <a className="text-[#1A1A1A]/60 hover:text-[#775a19] transition-colors duration-300" href="#">Outfits</a>
            <a className="text-[#1A1A1A]/60 hover:text-[#775a19] transition-colors duration-300" href="#">Upload</a>
            <a className="text-[#1A1A1A]/60 hover:text-[#775a19] transition-colors duration-300" href="#">Profile</a>
          </nav>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20">
            <img 
              alt="User profile" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv5ciHoaea3cXMj6bp0_jFUZ0loxVi6rnAImHK0ihQTKzi0EZa2stY-VheiTnHrHt0nqoVcxs23csgHJ40G7uXyJIlx2LT_SaTMU-j9Q_UqEEFfxqhpVhyQIhpbBiYspHixZpzgwIUwcJlqhgMTQLj0GQqzI-WnQwFKswJ4Xn_JWGqtKbGafzIP12m8wHfy7CLIk6V5a0DVWwHtqoSH5wS9uLZ9HbWpoY-VzDPBVHmEr3dp5wrljF2P98o0ORLTX8EXV5dkfqVqYo"
            />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-8 items-center min-h-[70vh]">
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
              <button className="border-b-2 border-secondary text-on-surface px-8 py-5 font-bold hover:text-secondary transition-colors flex items-center justify-center">
                Explore Looks
              </button>
            </div>
          </div>
          <div className="md:col-span-5 relative h-full min-h-[400px]">
            <div className="absolute inset-0 bg-surface-container-low rounded-3xl overflow-hidden md:-mr-24 transform translate-y-12 md:translate-y-0">
              <img 
                alt="Fashion model" 
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

        {/* Diagnosis Section */}
        {showDiagnosis && (
          <section ref={diagnosisRef} className="max-w-7xl mx-auto px-6 mt-32 md:mt-48 scroll-mt-24">
            <div className="text-center mb-16">
              <h3 className="font-headline text-4xl md:text-6xl font-bold text-primary mb-4 tracking-tight">Style Diagnosis</h3>
              <p className="font-body text-on-surface-variant">Fill in your details for a personalized AI styling report.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-3xl editorial-shadow">
              <StylistForm />
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 mt-32 md:mt-48">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="max-w-xl">
              <h3 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-primary">Precision Curation</h3>
              <p className="text-on-surface-variant font-body leading-relaxed">Sophisticated algorithms replacing guesswork with aesthetic science.</p>
            </div>
            <div className="h-px bg-outline-variant/30 flex-grow mx-12 hidden md:block mb-4"></div>
            <span className="font-headline italic text-xl text-secondary">01 — 03</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between min-h-[320px] group hover:bg-surface-container-high transition-colors">
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">accessibility_new</span>
                <h4 className="font-headline text-2xl font-bold mb-4">Body Type Analysis</h4>
                <p className="text-on-surface-variant leading-relaxed">Advanced geometric scanning to identify your silhouette and suggest cuts that elevate your natural form.</p>
              </div>
              <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest">Discover</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </div>
            <div className="bg-primary p-8 rounded-xl flex flex-col justify-between min-h-[320px] text-on-primary group shadow-2xl">
              <div>
                <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6">palette</span>
                <h4 className="font-headline text-2xl font-bold mb-4 text-white">Skin Tone Color Matching</h4>
                <p className="text-primary-fixed-dim leading-relaxed">A digital seasonal color analysis using spectrophotometry to find the shades that illuminate your complexion.</p>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest">Discover</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl flex flex-col justify-between min-h-[320px] group hover:bg-surface-container-high transition-colors">
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">auto_awesome</span>
                <h4 className="font-headline text-2xl font-bold mb-4">AI Hair Styling</h4>
                <p className="text-on-surface-variant leading-relaxed">Generate 9 diverse hairstyle recommendations in a 3x3 grid while preserving your original facial features.</p>
              </div>
              <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest">Discover</span>
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-on-primary py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-headline font-black text-4xl italic tracking-tighter mb-8">Style AI</h2>
            <p className="text-primary-fixed-dim max-w-sm leading-relaxed mb-8">
              Redefining personal style through the lens of artificial intelligence and high-end aesthetic curation.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-primary-fixed-dim">
              <li><a href="#" className="hover:text-white transition-colors">Atelier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Science</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Connect</h4>
            <ul className="space-y-4 text-primary-fixed-dim">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/10 text-primary-fixed-dim text-xs flex justify-between">
          <span>&copy; 2024 Style AI Digital Atelier. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
