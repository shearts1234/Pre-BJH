import React, { useState, useRef } from 'react';
import { Camera, ArrowLeft, Sparkles, Check, Plus, UploadCloud, Info, Share2, Download, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const StylistForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [gender, setGender] = useState<string>('male');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [skinTone, setSkinTone] = useState<string>('#F9E4D4');
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Minimal']);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hairImage, setHairImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const styleArchetypes = [
    { name: 'Casual', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgOM_eVvRTSQP36tZuP0G2KtOqGD_U7m2mOaZNDZtY1uRzEIRUjoxsXvnJWEXVesjrNHN5EAB8EfjSJivZoR_rRqF9YJ_TmgzCI7p04LoiAkQUe_X1HlP-cKWMK3zZtwe9TZ2AdfltlelLXK87Y4EzK2Rhc_EPHw4elfVr5sGbsqJ3DdPOttLu8ap6zJD7xao_4rMfJEC73f4gUin0TiO2seD4WrWaE-tt_FI15AEmmIpz4TpJMjlyxUBsDsf_atmQTFTfLGoZKvg' },
    { name: 'Minimal', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2-ztGjJR6DKhJPHjyNXPTw7B-nAQBYjCa2PM15tyDO6rG9VyehifhaXTmmhLtu80BMOvyDlR17ed0eebTiIdXdm1TnvPFguSwArSYpAlTqKB-JYTIIw5txEyUyDHDYREQXJ8IQ91KeIft0Z83ZGgQ5YfFqcxD8rN6pIO0i9r4wOtQ5CXdwHIONzBFDgvlL92lW3OqoWxoaB2iLg_N6rMmrpNZmCAgd81dzGmOLWI7FgIYuT9QywZRTdMqzRn8thSqGKl6Orf8Cik' },
    { name: 'Street', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu07NZ31C3KHD1jr2K3EfyAWbALOW0UWX-S-l0eGG21gr-T7VPyZIO8Jl62Kbl_oX6rrYpjrwdwLhJJwedDToV-yfv9aQNJAZQ_tJaJncjuEX32G7IkSNNePNaYqp1zaIS-x0r-9Mi2RyC6OeRTnxXG9cNlDcpPK5aVpbfxkAiYKMYgc8pGb4_Kwg4hxI4LQRWO5r_L4363K0eV_5IRl6APO7xnuefqqekP89B40PSyI_VFbBJnmd_ai4LjOWT86dJm-5kSBfykfU' },
    { name: 'Business', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0hY0iB977iMioSusIYLX3tyfAi0PCXXargQvOlsfyW3AZLU3x54maHXoUcSvWq7LRMaLjGPq2dx9DIzrrZ_JrKH_z4FZxj9OjGPQwQbE9b0kaqy54m0HeEFFqNtc-4zqLUfKeSBqT2ZZh7fauXw-p2BSVNRRqOGq2JknCN8mkzUv9tYUicjW6TxQw9ugqrA7wwgPb5CZ91hS7eAdTenWN5ai9q-Jaxq2zW4Wdylc1hNdc1mNNEwQSacM9tbRYyRkXOFHm4-ICDXM' },
    { name: 'Vintage', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUJJVSWO3_ZG_cLLT95UWkgGHs7zXJr5rHTiX66QfffsM3lPgr8VsLtC8_x5P2XRcWFSVrRMXRjKExuQvttcK8L_QV0gd0HCZS_XYoggFwbDJDrFC55U0Ep3x8SpX807LaF93QRPkguvs1qIOFWgE4dYPummagFAKTp3WLV19IcgjlqRhgOXw-6sczWaK6gkp2cNwi1UV2LHppjKH8h1XTOBvPZaWTHdhVoHU7tjpJqIlFIi-Lk07PTnaYpkwb465oLLzZ7F4R-Ig' },
  ];

  const toggleStyle = (name: string) => {
    setSelectedStyles(prev => 
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setHairImage(null);

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          photo, gender, height, weight, skinTone, 
          preferredStyle: selectedStyles.join(', ') 
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
      if (data.hairImage) setHairImage(data.hairImage);
    } catch (error: any) {
      alert('오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (result) {
    return (
      <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 text-left">
        {/* Hero Section: Editorial Header */}
        <section className="mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="font-label text-secondary uppercase tracking-[0.3em] text-xs font-bold block mb-4">Curated Analysis</span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-tight">Your Personal Style Report</h1>
            </div>
            <div className="flex gap-4 mb-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-low text-on-surface rounded-xl hover:bg-surface-container-high transition-all">
                <Share2 size={18} />
                <span className="font-label font-bold text-xs uppercase tracking-wider">Share Report</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl hover:opacity-90 transition-all">
                <Download size={18} />
                <span className="font-label font-bold text-xs uppercase tracking-wider">PDF</span>
              </button>
            </div>
          </div>
        </section>

        {/* Bento Grid: AI Analysis */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          {/* Main Analysis Card */}
          <div className="md:col-span-8 bg-surface-container-low rounded-3xl p-8 md:p-12 relative overflow-hidden group min-h-[500px]">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-headline text-3xl font-bold mb-6 italic">The Signature Profile</h3>
                <div className="space-y-8">
                  <div className="prose prose-neutral max-w-none">
                    <div className="font-body text-on-surface-variant leading-[1.8] text-lg" style={{ whiteSpace: 'pre-wrap' }}>
                      {result}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors duration-700"></div>
          </div>

          {/* Side Aesthetic Cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {hairImage ? (
              <div className="bg-white p-2 rounded-3xl editorial-shadow group overflow-hidden">
                <img src={hairImage} alt="Hairstyles" className="w-full rounded-2xl transition-transform duration-700 group-hover:scale-105" />
                <div className="p-6">
                  <h4 className="font-headline font-bold text-xl mb-2 italic">Hair Curation</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">AI-generated 3x3 grid for your silhouette.</p>
                </div>
              </div>
            ) : (
              <div className="bg-surface-container-lowest rounded-3xl p-8 flex-1 border border-outline-variant/10 shadow-sm">
                <Sparkles className="text-secondary w-8 h-8 mb-4" />
                <h4 className="font-headline text-xl font-bold mb-2">AI Insight</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed italic">"Your profile suggests a preference for timeless architectural pieces. Focus on high-quality fabrics like brushed wool and silk blends."</p>
              </div>
            )}
            
            <div className="bg-primary rounded-3xl p-8 flex-1 text-on-primary overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-headline text-xl font-bold mb-4">Style Score</h4>
                <div className="text-6xl font-black italic tracking-tighter">94<span className="text-xl">/100</span></div>
                <p className="text-xs text-on-primary/60 mt-4 uppercase tracking-[0.2em]">Based on signature match</p>
              </div>
              <div className="absolute right-[-10%] top-[-10%] opacity-20 transform rotate-12">
                <CheckCircle2 size={120} />
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Scroll: Recommended Outfits */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-3xl font-bold tracking-tight">Recommended Looks</h2>
            <div className="flex gap-2">
              <button onClick={() => scroll('left')} className="p-2 rounded-full border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
                <ChevronLeft />
              </button>
              <button onClick={() => scroll('right')} className="p-2 rounded-full border border-outline-variant/20 hover:bg-surface-container-low transition-colors">
                <ChevronRight />
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex overflow-x-auto gap-8 pb-12 hide-scrollbar snap-x snap-mandatory">
            {[
              { id: '01', title: 'The Metropolitan Layer', price: '$845', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EnjM2-YXso_PFYiio0JeXu_LKPETkr5gA3Z-wJkJ_PCIUeVyKJUnFu166WFp9fvXFu6r5EC_MZnTgnRZFlvno2goDB5dVPDAVeh8Uu8A0o0a75Jw7GQ7tUzo-SwpCM6fUs2OaO4Aoj8YHh6YAaeyoBUOag7YHd4YxdiSTNFs0xaDLZ48y5aa8gN4YuGD1qVmy8TYjLdFKIe1oJp4FCiypECaqDMtM2KBD_ydQsMJWgoWwDIghXi2ar3MOOTZ7VEqHQkubNkAOFQ' },
              { id: '02', title: 'Olive Drape Knit', price: '$320', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXHDllf9hWFKcMldT4ZbGt2FCVZuXWkm63mEuCxTrsm-weUT9Jb4Yq1r_DLS1MYus_t_L2KNrC_dNFBCxAtMNiQLi8Cd2Sf9zWnBoPxJy-EYLarNmBeAekqVEoYnx4_Vg8Vawit889wwAAlcq6M_DepNH65cFXQf48PxlNIOA-hIYpVs4rXH4z6KFl5UcEq-ycV0sa4MMyAspOxvYzb9Pc-AZpYnJrRLgkAeCKukoeGY-sn4Sh-zDVJvofV4i0aYzfJRpIOINZDtQ' },
              { id: '03', title: 'Sunset Blazer Chic', price: '$560', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWKtHcKAYQGFwMnYRwcswPDP91kJAdcdJOW_H5GlkM3Ujs2S7uRINQHmLiQw8MlHoo9niQ6ao6dOo9EAdy3GQVxEkddmqfTktVPegCyLma12BrDjw3TbF35tcfuZZefut161TKScVOuLQdqphxdg8OoLzu4BvhP-Wyy2Vwq7EQ9-1uEPlgMNd3lzjgwSmKHgVDw89KV0hHPeYD_H6hnmU8bF_-00Hy_obmo4SIV69IoD4sRodp2cS3QYEaSZSc3M9mEsZQsEUhDdg' }
            ].map(look => (
              <div key={look.id} className="min-w-[300px] md:min-w-[400px] snap-start group">
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4] mb-6 shadow-xl shadow-black/5">
                  <img src={look.img} alt={look.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">Look {look.id}</div>
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline text-xl font-bold">{look.title}</h3>
                    <span className="font-body font-bold text-secondary">{look.price}</span>
                  </div>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Perfectly balanced signature look for your curated visual identity.</p>
                  <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-label font-bold text-xs uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    Shop this Look <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-secondary-container/30 rounded-[3rem] p-12 text-center relative overflow-hidden mb-20">
          <div className="relative z-10">
            <h2 className="font-headline text-4xl font-bold mb-6">Refine Your Wardrobe</h2>
            <p className="text-on-surface-variant max-w-lg mx-auto mb-10 text-lg">Our AI continues to learn from your choices. Share this report with your personal stylist or start building your lookbook.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => { setResult(null); setStep(1); }} className="px-10 py-5 bg-primary text-on-primary rounded-full font-label font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform">Start New Analysis</button>
              <button className="px-10 py-5 border-2 border-primary text-primary rounded-full font-label font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all">Save to Lookbook</button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 text-left">
      {/* Step Indicator */}
      <div className="mb-12">
        <div className="flex items-baseline gap-2">
          <span className="font-headline text-5xl font-black italic text-secondary opacity-20">0{step}</span>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-primary">
            {step === 1 ? 'The Foundation' : 'Define Your Aesthetic'}
          </h2>
        </div>
        <p className="text-on-surface-variant font-medium mt-2">
          Step {step} of 2: {step === 1 ? 'Tell us about your physical profile.' : 'Upload reference imagery and curate your style profile.'}
        </p>
      </div>

      {step === 1 ? (
        <div className="w-full max-w-2xl bg-surface-container-lowest p-8 md:p-12 rounded-xl editorial-shadow border border-outline-variant/10 animate-in fade-in duration-500">
          <div className="space-y-12">
            <section>
              <label className="block font-headline text-sm uppercase tracking-widest text-secondary mb-6 font-bold">Identity</label>
              <div className="grid grid-cols-3 gap-4">
                {['male', 'female', 'other'].map((g) => (
                  <button 
                    key={g}
                    onClick={() => setGender(g)}
                    className={`group flex flex-col items-center justify-center p-6 bg-surface border-b-2 transition-all duration-300
                      ${gender === g ? 'border-primary shadow-lg' : 'border-transparent bg-surface-container-low hover:border-outline-variant'}`}
                    type="button"
                  >
                    <span className={`material-symbols-outlined text-3xl mb-2 ${gender === g ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {g === 'other' ? 'emergency' : g}
                    </span>
                    <span className={`text-[10px] font-label uppercase tracking-tighter font-bold ${gender === g ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {g}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-12 text-left">
              <div className="relative">
                <label className="block font-headline text-sm uppercase tracking-widest text-secondary mb-4 font-bold">Height (cm)</label>
                <input 
                  className="w-full bg-transparent border-b border-outline-variant py-4 px-0 text-2xl font-body focus:outline-none focus:border-secondary transition-colors placeholder:text-outline-variant/30" 
                  placeholder="180" type="number" value={height} onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="relative">
                <label className="block font-headline text-sm uppercase tracking-widest text-secondary mb-4 font-bold">Weight (kg)</label>
                <input 
                  className="w-full bg-transparent border-b border-outline-variant py-4 px-0 text-2xl font-body focus:outline-none focus:border-secondary transition-colors placeholder:text-outline-variant/30" 
                  placeholder="75" type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </section>

            <section>
              <label className="block font-headline text-sm uppercase tracking-widest text-secondary mb-6 font-bold">Tonal Palette</label>
              <div className="flex flex-wrap gap-4 items-center">
                {['#F9E4D4', '#F3D0B1', '#E2B28C', '#C68642', '#8D5524', '#4B2F1F'].map((tone) => (
                  <button 
                    key={tone}
                    onClick={() => setSkinTone(tone)}
                    className={`w-12 h-12 rounded-full border-2 border-white shadow-sm transition-all hover:scale-110 flex items-center justify-center
                      ${skinTone === tone ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:ring-2 hover:ring-outline-variant ring-offset-2'}`}
                    style={{ backgroundColor: tone }}
                    type="button"
                  >
                    {skinTone === tone && <Check size={16} className={tone === '#4B2F1F' || tone === '#8D5524' ? 'text-white' : 'text-primary'} />}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-on-surface-variant italic">Complement your natural complexion.</p>
            </section>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-500">
          <div className="col-span-12 lg:col-span-5 space-y-8">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="bg-surface-container-lowest rounded-xl p-8 border-2 border-dashed border-outline-variant flex flex-col items-center justify-center min-h-[400px] text-center hover:border-secondary transition-colors group cursor-pointer overflow-hidden relative"
            >
              {photo ? (
                <img src={photo} alt="Upload" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-secondary-container transition-colors">
                    <UploadCloud className="w-10 h-10 text-on-surface-variant group-hover:text-secondary" />
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-2">Upload Your Look</h3>
                  <p className="text-on-surface-variant max-w-[280px] mb-8">Help our AI understand your unique silhouette.</p>
                  <button className="bg-primary text-on-primary px-8 py-4 rounded-md font-bold text-sm tracking-widest uppercase">Select Files</button>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <Info className="text-secondary w-5 h-5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Curation Tip</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">For best results, upload clear portrait lighting.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <h3 className="font-headline text-2xl font-bold mb-6">Select Style Archetypes</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {styleArchetypes.map((style) => (
                <div 
                  key={style.name}
                  onClick={() => toggleStyle(style.name)}
                  className={`relative group cursor-pointer overflow-hidden rounded-xl aspect-[3/4] border-2 transition-all duration-300
                    ${selectedStyles.includes(style.name) ? 'border-secondary scale-[0.98]' : 'border-transparent hover:border-secondary'}`}
                >
                  <img src={style.img} alt={style.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${selectedStyles.includes(style.name) ? 'from-secondary/80' : 'from-primary/80'}`}></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <span className="font-headline text-on-primary text-xl font-bold">{style.name}</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${selectedStyles.includes(style.name) ? 'bg-on-primary' : 'border-2 border-on-primary'}`}>
                      {selectedStyles.includes(style.name) && <Check size={14} className="text-secondary" />}
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-surface-container flex flex-col items-center justify-center rounded-xl aspect-[3/4] text-on-surface-variant">
                <Plus size={32} className="mb-2" />
                <span className="font-bold text-[10px] uppercase tracking-widest font-bold">More</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedStyles.map(s => (
                <span key={s} className="px-5 py-2 bg-secondary text-on-secondary rounded-full text-sm font-bold tracking-tight shadow-lg animate-in zoom-in duration-300">{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest/90 backdrop-blur-xl py-6 px-6 z-40 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <button onClick={() => setStep(step === 1 ? 1 : step - 1)} className={`flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px] ${step === 1 ? 'opacity-0' : ''}`}>
            <ArrowLeft size={14} /> Back
          </button>
          <button 
            onClick={step === 1 ? () => setStep(2) : handleSubmit}
            disabled={loading}
            className="w-full md:w-auto bg-primary text-on-primary px-12 py-5 rounded-md font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all flex items-center justify-center gap-4 shadow-xl"
          >
            {loading ? 'Curating...' : step === 1 ? 'Next Step' : 'Analyze My Style'}
            {step === 2 && <Sparkles size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StylistForm;
