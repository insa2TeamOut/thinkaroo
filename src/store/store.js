import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './front/GenerateQuestion';
import answerReducer from './front/CheckAnswer';

export const store = configureStore({
  reducer: {
    question: questionReducer,
    answer: answerReducer,
  },
});
