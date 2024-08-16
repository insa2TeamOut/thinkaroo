// AppContext.js
import React, { createContext, useState, useContext } from 'react';

// 컨텍스트 생성
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// 프로바이더 컴포넌트
export const AppProvider = ({ children }) => {
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState('');

  return (
    <AppContext.Provider
      value={{
        question,
        setQuestion,
        userAnswer,
        setUserAnswer,
        evaluation,
        setEvaluation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
