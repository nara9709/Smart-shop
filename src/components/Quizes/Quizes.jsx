import React, { useEffect, useState } from 'react';
import styles from './Quizes.module.css';
import { getQuiz } from '../../service/firebase';
import Quiz from '../Quiz/Quiz';
import { useNavigate } from 'react-router';

function Quizes() {
  const [quizData, setQuizData] = useState(null);
  const [quizindex, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  async function getQuizData() {
    const data = await getQuiz();
    setQuizData(data);
  }

  // Go to next question
  const goToNext = (key) => {
    calScore(key);
    if (quizindex === quizData.length - 1) {
      navigate('/result', {
        state: { score },
      });
    }

    // Change the index of question
    setIndex(() => {
      return quizindex + 1;
    });
  };

  // Calculate the score by selected option
  const calScore = (key) => {
    switch (key) {
      case 'a':
        setScore(() => score + 1);
        break;
      case 'b':
        setScore(() => score + 2);
        break;
      case 'c':
        setScore(() => score + 3);
        break;
      case 'd':
        setScore(() => score + 4);
        break;

      default:
        setScore(() => score + 0);
        break;
    }
  };

  // Get quiz data from Firebase
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
