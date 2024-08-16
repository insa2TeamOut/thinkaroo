import React from 'react';
import { useAppContext } from '../AppContext'; // 파일 경로를 맞게 조정하세요
import axios from 'axios';
import SketchCanvas from './SketchCanvas'; // 파일 경로를 맞게 조정하세요

const CheckAnswer = () => {
  const { question, userAnswer, setUserAnswer, evaluation, setEvaluation } = useAppContext();
  const [userImage, setUserImage] = React.useState(null);
  const [sketchImage, setSketchImage] = React.useState(null);

  const handleSubmitAnswer = async () => {
    try {
      const formData = new FormData();
      formData.append('question', question);
      formData.append('correct_answer', ''); // 정답을 서버에서 설정할 수 있습니다.
      formData.append('user_image', userImage);
      if (sketchImage) {
        formData.append('sketch_image', sketchImage); // 스케치 이미지를 서버로 전송
      }

      const response = await axios.post('http://localhost:8000/check_answer/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEvaluation(response.data.evaluation);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleSaveSketch = (image) => {
    setSketchImage(image);
  };

  return (
    <div className="check-answer-container">
      <h1 className="title">Submit Your Answer</h1>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer"
      />
      <input
        type="file"
        onChange={(e) => setUserImage(e.target.files[0])}
      />
      <SketchCanvas onSave={handleSaveSketch} />
      <button onClick={handleSubmitAnswer}>Submit Answer</button>
      {evaluation && (
        <div className="evaluation-display">
          <h2 className="evaluation-title">Evaluation:</h2>
          <p className="evaluation-text">{evaluation}</p>
        </div>
      )}
    </div>
  );
};

export default CheckAnswer;
