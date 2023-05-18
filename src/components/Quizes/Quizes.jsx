import React, { useEffect, useState } from 'react';
import styles from './Quizes.module.css';
import { getQuiz } from '../../service/firebase';
import Quiz from '../Quiz/Quiz';
import { useNavigate } from 'react-router';

function Quizes() {
  const [quizData, setQuizData] = useState(null);
  const [quizindex, setIndex] = useState(0);
  const navigate = useNavigate();

  async function getQuizData() {
    const data = await getQuiz();
    setQuizData(data);
  }

  // Go to next question
  const goToNext = () => {
    if (quizindex === quizData.length - 1) {
      navigate('/result');
    }
    setIndex(() => {
      return quizindex + 1;
    });
  };

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <section className={styles.section}>
      {quizData && (
        <Quiz
          quizData={quizData[quizindex]}
          goToNext={goToNext}
          key={quizindex}
        />
      )}
    </section>
  );
}

export default Quizes;
