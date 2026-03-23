import React, { useState, useRef } from 'react';
import { Camera, Ruler, Weight, Sparkles, User } from 'lucide-react';
import './StylistForm.css';

const StylistForm: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [gender, setGender] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gender) {
      alert('성별을 선택해 주세요!');
      return;
    }
    console.log({ photo, gender, height, weight });
    alert('스타일 분석을 시작합니다!');
  };

  return (
    <div className="stylist-form-container">
      <div className="stylist-card">
        <header className="form-header">
          <h1>AI Personal Stylist</h1>
          <p>당신에게 가장 잘 어울리는 스타일을 찾아드릴게요.</p>
        </header>

        <form onSubmit={handleSubmit} className="stylist-form">
          <div className="photo-upload-section">
            <div 
              className="photo-upload-area" 
              onClick={handlePhotoClick}
            >
              {photo ? (
                <img src={photo} alt="Preview" className="photo-preview" />
              ) : (
                <div className="upload-placeholder">
                  <Camera size={48} strokeWidth={1.5} />
                  <span>본인 사진을 업로드해 주세요</span>
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

          <div className="input-field" style={{ marginBottom: '8px' }}>
            <label>
              <User size={18} />
              성별
            </label>
            <div className="gender-group">
              <button 
                type="button" 
                className={`gender-button ${gender === 'male' ? 'active' : ''}`}
                onClick={() => setGender('male')}
              >
                남성
              </button>
              <button 
                type="button" 
                className={`gender-button ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
              >
                여성
              </button>
              <button 
                type="button" 
                className={`gender-button ${gender === 'other' ? 'active' : ''}`}
                onClick={() => setGender('other')}
              >
                기타
              </button>
            </div>
          </div>

          <div className="input-group">
            <div className="input-field">
              <label>
                <Ruler size={18} />
                키
              </label>
              <div className="input-wrapper">
                <input 
                  type="number" 
                  placeholder="170" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  required
                />
                <span className="unit">cm</span>
              </div>
            </div>

            <div className="input-field">
              <label>
                <Weight size={18} />
                몸무게
              </label>
              <div className="input-wrapper">
                <input 
                  type="number" 
                  placeholder="65" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  required
                />
                <span className="unit">kg</span>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            <Sparkles size={20} />
            스타일 분석 시작하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default StylistForm;
