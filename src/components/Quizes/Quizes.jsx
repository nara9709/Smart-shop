import React, { useEffect, useState } from 'react';
import styles from './Quizes.module.css';
import { getQuiz } from '../../service/firebase';
import Quiz from '../Quiz/Quiz';
import { useNavigate } from 'react-router';
import useProducts from '../../hooks/useProducts';

function Quizes() {
  const [quizData, setQuizData] = useState(null);
  const [quizindex, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const {
    productsQuery: { data: products },
  } = useProducts();

  async function getQuizData() {
    const data = await getQuiz();
    setQuizData(data);
  }
  const getSkinType = (score) => {
    switch (true) {
      case score >= 4 && score <= 7:
        return 'Dry';

      case score >= 8 && score <= 10:
        return 'Slightly Dry';

      case score >= 11 && score <= 13:
        return 'Combination';

      case score >= 14 && score <= 16:
        return 'Oily';

      default:
        return null;
    }
  };

  // Go to next question
  const goToNext = (key) => {
    calScore(key);
    // If the quiz is the last quiz, go to result page
    if (quizindex === quizData.length - 1) {
      const type = getSkinType(score);
      const product = getRecomProduct(type);

      navigate('/result', {
        state: { type, product },
      });
    }

    // Change the index of question
    setIndex(() => {
      return quizindex + 1;
    });
  };

  // Get recommendation product for for the skin type
  const getRecomProduct = (type) => {
    let userType = type;
    // If user's type is 'slightly dry', change the type to 'Dry' to match with product data
    if (type === 'Slightly Dry') {
      userType = 'Dry';
    }

    return products[
      Object.keys(products).find((key) => products[key].skintype === userType)
    ];
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
