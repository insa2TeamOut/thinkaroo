// GenerateQuestion.js
import React, { useState } from 'react';
import { useAppContext } from '../AppContext'; // 파일 경로를 맞게 조정하세요
import axios from 'axios';
// import './GenerateQuestion.css'; // CSS 파일을 별도로 만듭니다.

const GenerateQuestion = () => {
  const { question, setQuestion } = useAppContext();
  const [keyword, setKeyword] = useState(''); // 사용자 입력값을 저장할 상태 추가

  const handleGenerateQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:8000/generate/', {
        params: {
          keyword: keyword, // 사용자 입력값을 파라미터로 전달
          max_length: 500,
          temperature: 1.0,
        },
      });
      setQuestion(response.data.question);
    } catch (error) {
      console.error('Error generating question:', error);
    }
  };

  return (
    <div className="generate-question-container">
      <h1 className="title">Generate a Question</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} // 사용자 입력값 상태 업데이트
        placeholder="Enter a keyword"
        className="keyword-input"
      />
      <button className="generate-button" onClick={handleGenerateQuestion}>
        Generate Question
      </button>
      {question && (
        <div className="question-display">
          <h2 className="question-title">Generated Question:</h2>
          <p className="question-text">{question}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateQuestion;
