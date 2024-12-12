import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import quotes from '../data/quotes.json'; // JSON 데이터베이스
import './FilsaPage.css';

function FilsaPage() {
  const [currentQuote, setCurrentQuote] = useState({});
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  // 랜덤 대사 가져오기
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    setInputText('');
  };

  // 입력 텍스트 비교
  const renderHighlightedText = () => {
    const text = currentQuote.quote || '';
    return text.split('').map((char, index) => {
      const inputChar = inputText[index] || '';
      return (
        <span key={index} style={{ color: inputChar !== char ? 'red' : 'black' }}>
          {char}
        </span>
      );
    });
  };

  // 이미지 저장 화면으로 이동
  const goToSaveImage = () => {
    navigate('/save-image', { state: { currentQuote } });
  };

  useEffect(() => {
    getRandomQuote(); // 첫 대사 가져오기
  }, []);

  return (
    <div className="filsa-page">
      <h1>필사 연습</h1>
      <button onClick={getRandomQuote} className="button">
        새로운 대사
      </button>
      <button onClick={goToSaveImage} className="button" disabled={!currentQuote.quote}>
        이미지 저장 화면으로 이동
      </button>

      <div className="quote-section">
        <h2>대사:</h2>
        <div className="highlighted-text">{renderHighlightedText()}</div>
        <p className="quote-info">
          - {currentQuote.author || '작가 미상'}, {currentQuote.book || '제목 미상'}
        </p>
      </div>

      <textarea
        placeholder="여기에 필사하세요..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="input-area"
      />
    </div>
  );
}

export default FilsaPage;
