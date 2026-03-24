import React, { useState, useRef } from 'react';
import { Camera, Ruler, Weight, Sparkles, User } from 'lucide-react';
import './StylistForm.css';

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
    } catch (error: any) {
      alert('오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stylist-form-container">
      <div className="stylist-card">
        <header className="form-header">
          <h1>AI Personal Stylist</h1>
          <p>당신에게 가장 잘 어울리는 스타일을 찾아드릴게요.</p>
        </header>

        {!result ? (
          <form onSubmit={handleSubmit} className="stylist-form">
            <div className="photo-upload-section">
              <div 
                className={`photo-upload-area ${isDragging ? 'dragging' : ''}`}
                onClick={handlePhotoClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {photo ? (
                  <img src={photo} alt="Preview" className="photo-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <Camera size={48} strokeWidth={1.5} />
                    <span>사진을 클릭하거나 드래그하여 업로드하세요</span>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />
              </div>
            </div>

            <div className="input-field">
              <label><User size={18} /> 성별</label>
              <div className="gender-group">
                {['male', 'female', 'other'].map((g) => (
                  <button 
                    key={g}
                    type="button" 
                    className={`gender-button ${gender === g ? 'active' : ''}`}
                    onClick={() => setGender(g)}
                  >
                    {g === 'male' ? '남성' : g === 'female' ? '여성' : '기타'}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <label><Ruler size={18} /> 키 (cm)</label>
                <input type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} required />
              </div>
              <div className="input-field">
                <label><Weight size={18} /> 몸무게 (kg)</label>
                <input type="number" placeholder="65" value={weight} onChange={(e) => setWeight(e.target.value)} required />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <label>나이</label>
                <input type="number" placeholder="29" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
              <div className="input-field">
                <label>피부 톤</label>
                <input type="text" placeholder="웜톤, 쿨톤 등" value={skinTone} onChange={(e) => setSkinTone(e.target.value)} required />
              </div>
            </div>

            <div className="input-field">
              <label>선호하는 스타일</label>
              <input type="text" placeholder="심플&모던, 스트릿, 빈티지 등" value={preferredStyle} onChange={(e) => setPreferredStyle(e.target.value)} required />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? '분석 중...' : <><Sparkles size={20} /> 스타일 분석 시작하기</>}
            </button>
          </form>
        ) : (
          <div className="result-container">
            <h2>스타일 컨설팅 보고서</h2>
            <div className="result-content" style={{ whiteSpace: 'pre-wrap', textAlign: 'left', marginTop: '20px' }}>
              {result}
            </div>
            <button onClick={() => setResult(null)} className="submit-button" style={{ marginTop: '20px' }}>
              다시 하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StylistForm;
