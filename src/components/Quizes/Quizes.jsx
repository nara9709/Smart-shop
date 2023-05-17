import React, { useEffect, useState } from 'react';
import styles from './Quizes.module.css';
import { getQuiz } from '../../service/firebase';
import Quiz from '../Quiz/Quiz';

function Quizes() {
  const [quizData, setQuizData] = useState(null);
  const [quizindex, setIndex] = useState(0);

  async function getQuizData() {
    const data = await getQuiz();
    setQuizData(data);
  }

  // Go to next question
  const goToNext = () => {
    if (quizindex === quizData.length - 1) {
      finishQuiz();
    }
    setIndex(() => {
      return quizindex + 1;
    });
  };

  const finishQuiz = () => {
    console.log('finish!');
  };

  useEffect(() => {
    getQuizData();
  }, []);

  console.log(quizindex);

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
