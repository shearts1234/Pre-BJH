import React, { useState, useRef } from 'react';
import { Camera, Ruler, Weight, Sparkles, User, ArrowLeft } from 'lucide-react';

const StylistForm: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gender, setGender] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [skinTone, setSkinTone] = useState<string>('');
  const [preferredStyle, setPreferredStyle] = useState<string>('');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [hairImage, setHairImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gender) {
      alert('성별을 선택해 주세요!');
      return;
    }

    setLoading(true);
    setResult(null);
    setHairImage(null);

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          photo, gender, height, weight, age, skinTone, preferredStyle 
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
      if (data.hairImage) {
        setHairImage(data.hairImage);
      }
    } catch (error: any) {
      alert('오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center">
            <div 
              className={`relative w-full aspect-video max-w-lg rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden flex flex-col items-center justify-center cursor-pointer
                ${isDragging ? 'border-secondary bg-secondary/5 scale-[1.02]' : 'border-outline-variant hover:border-secondary hover:bg-surface-container-low'}`}
              onClick={handlePhotoClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {photo ? (
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <Camera className="w-12 h-12 text-secondary mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-on-surface-variant font-medium">Click or drag your photo here</p>
                  <p className="text-xs text-outline mt-2">Professional portrait recommended for best results</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Gender Selection */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary">
                <User size={16} /> Gender Identity
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['male', 'female', 'other'].map((g) => (
                  <button 
                    key={g}
                    type="button" 
                    className={`py-3 px-4 rounded-lg border font-bold text-sm transition-all duration-200
                      ${gender === g 
                        ? 'bg-primary text-on-primary border-primary shadow-lg' 
                        : 'border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'}`}
                    onClick={() => setGender(g)}
                  >
                    {g.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info Group */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary">
                  <Ruler size={16} /> Height (cm)
                </label>
                <input 
                  type="number" 
                  placeholder="175" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  required 
                  className="w-full bg-surface-container p-4 rounded-lg border-none focus:ring-2 focus:ring-secondary/50 font-body"
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary">
                  <Weight size={16} /> Weight (kg)
                </label>
                <input 
                  type="number" 
                  placeholder="68" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  required 
                  className="w-full bg-surface-container p-4 rounded-lg border-none focus:ring-2 focus:ring-secondary/50 font-body"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-secondary">Age</label>
              <input 
                type="number" 
                placeholder="28" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                required 
                className="w-full bg-surface-container p-4 rounded-lg border-none focus:ring-2 focus:ring-secondary/50 font-body"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-secondary">Skin Complexion</label>
              <input 
                type="text" 
                placeholder="Warm ivory, Cool sand, etc." 
                value={skinTone} 
                onChange={(e) => setSkinTone(e.target.value)} 
                required 
                className="w-full bg-surface-container p-4 rounded-lg border-none focus:ring-2 focus:ring-secondary/50 font-body"
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-secondary">Preferred Aesthetic</label>
              <input 
                type="text" 
                placeholder="Minimalist, Streetwear, Avant-garde, etc." 
                value={preferredStyle} 
                onChange={(e) => setPreferredStyle(e.target.value)} 
                required 
                className="w-full bg-surface-container p-4 rounded-lg border-none focus:ring-2 focus:ring-secondary/50 font-body"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-on-primary py-6 rounded-xl font-black text-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-2xl disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">Curating Your Style...</span>
            ) : (
              <>
                <Sparkles size={24} /> Generate Digital Lookbook
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <header className="flex justify-between items-end border-b border-outline-variant/30 pb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-2 block">Diagnosis Result</span>
              <h2 className="font-headline text-4xl md:text-6xl font-black italic tracking-tighter">Your Digital <br/>Lookbook</h2>
            </div>
            <button 
              onClick={() => { setResult(null); setHairImage(null); }} 
              className="flex items-center gap-2 text-sm font-bold hover:text-secondary transition-colors pb-1"
            >
              <ArrowLeft size={16} /> Start Over
            </button>
          </header>
          
          <div className="grid md:grid-cols-12 gap-12">
            {hairImage && (
              <div className="md:col-span-5">
                <div className="sticky top-32 space-y-6">
                  <div className="bg-white p-2 rounded-2xl editorial-shadow">
                    <img 
                      src={hairImage} 
                      alt="Recommended Hairstyles" 
                      className="w-full rounded-xl"
                    />
                  </div>
                  <div className="bg-secondary-container p-6 rounded-xl">
                    <h4 className="font-headline font-bold text-xl mb-2 italic">Hair Curation</h4>
                    <p className="text-sm text-on-secondary-container leading-relaxed">
                      AI-generated 3x3 grid exploring volume, texture, and silhouette variations while maintaining facial integrity.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className={`${hairImage ? 'md:col-span-7' : 'md:col-span-12'} space-y-12`}>
              <div className="prose prose-neutral max-w-none">
                <div 
                  className="font-body text-on-surface-variant leading-[1.8] text-lg space-y-8"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {result}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StylistForm;
