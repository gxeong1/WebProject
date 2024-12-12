import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import './SaveImagePage.css';

function SaveImagePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentQuote } = location.state || {};
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState('#000000');
  const [font, setFont] = useState('Pretendard-Regular'); // 기본 폰트 설정
  const [imageUrl, setImageUrl] = useState('5.png');

  const images = [
    { src: '5.png', name: '카드 1' },
    { src: '2.png', name: '카드 2' },
    { src: '3.png', name: '카드 3' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
    }
  };

  const downloadImage = () => {
    const element = document.getElementById('image-container');
    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'filsa-work.png';
      link.click();
    });
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="save-image-page">
      <div className="settings-container">
        <h1>다님길</h1>
        <div className="settings">
          <label>
            폰트:
            <select value={font} onChange={(e) => setFont(e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Pretendard-Regular">Pretendard-Regular</option>
              <option value="GmarketSansMedium">GmarketSansMedium</option>
              <option value="Ownglyph_ParkDaHyun">Ownglyph_ParkDaHyun</option>
              <option value="ChosunCentennial">ChosunCentennial</option>
            </select>
          </label>
          <label>
            크기:
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              min="12"
              max="48"
            />
          </label>
          <label>
            색깔:
            <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
          </label>
        </div>

        <h3>배경 이미지 선택</h3>
        <div className="image-selector">
          {images.map((image) => (
            <div
              key={image.src}
              className={`image-option ${image.src === imageUrl ? 'selected' : ''}`}
              onClick={() => setImageUrl(image.src)}
            >
              <img src={image.src} alt={image.name} className="image-thumbnail" />
              <p>{image.name}</p>
            </div>
          ))}
        </div>

        <h3>이미지 불러오기</h3>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
      </div>

      <div className="image-container">
        <div id="image-container" style={{
          position: 'relative',
          width: '600px',
          height: '400px',
          margin: '0 auto',
          border: '1px solid #ddd',
        }}>
          <img src={imageUrl} alt="Background" style={{ width: '100%', height: '100%' }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: `${fontSize}px`,
            color: fontColor,
            fontFamily: font,
          }}>
            {currentQuote?.quote}
            <br />
            - {currentQuote?.author}, {currentQuote?.book}
          </div>
        </div>

        <button onClick={downloadImage}>이미지 저장</button>
        <button onClick={goBack}>필사 화면으로 돌아가기</button>
      </div>
    </div>
  );
}

export default SaveImagePage;
