// App.js
import React from 'react';
import { AppProvider } from './AppContext'; // 파일 경로를 맞게 조정하세요import GenerateQuestion from './front/GenerateQuestion';
import CheckAnswer from './front/CheckAnswer'; // 이 컴포넌트도 동일하게 컨텍스트를 사용하여 관리합니다
import GenerateQuestion from './front/GenerateQuestion';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <GenerateQuestion />
        <CheckAnswer />
      </div>
    </AppProvider>
  );
}

export default App;
