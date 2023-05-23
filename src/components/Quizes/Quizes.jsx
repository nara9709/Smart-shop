import React, { useEffect, useState } from 'react';
import styles from './Quizes.module.css';
import { getQuiz } from '../../service/firebase';
import Quiz from '../Quiz/Quiz';
import { useNavigate } from 'react-router';
import useProducts from '../../hooks/useProducts';

function Quizes() {
  const [quizData, setQuizData] = useState(null);
  const [quizindex, setIndex] = useState(0);
  const navigate = useNavigate();
  const {
    productsQuery: { data: products },
  } = useProducts();
  const [scoreObj, setScoreObj] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  async function getQuizData() {
    const data = await getQuiz();
    setQuizData(data);
  }

  const getSkinType = () => {
    const sumScore = Object.values(scoreObj).reduce((a, b) => a + b);

    console.log(sumScore);
    switch (true) {
      case sumScore >= 4 && sumScore <= 7:
        return 'Dry';

      case sumScore >= 8 && sumScore <= 10:
        return 'Slightly Dry';

      case sumScore >= 11 && sumScore <= 13:
        return 'Combination';

      case sumScore >= 14 && sumScore <= 16:
        return 'Oily';

      default:
        return null;
    }
  };

  // Go to next question
  const goToNext = (key) => {
    // If the quiz is the last quiz, go to result page
    if (quizindex === quizData.length - 1) {
      const type = getSkinType();
      const product = getRecomProduct(type);

      navigate('/result', {
        state: { type, product },
      });
    }
    // If the quiz is not the last quiz, save score
    const score = calScore(key);
    scoreObj[quizindex] = score;
    // Change the index of question
    setIndex(() => {
      return quizindex + 1;
    });
  };

  const goBack = () => {
    if (quizindex === 0) {
      return navigate('/myskintypetest');
    }
    setIndex(() => {
      return quizindex - 1;
    });
    scoreObj[quizindex] = 0;
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
    let score = null;

    switch (key) {
      case 'a':
        score = 1;
        break;
      case 'b':
        score = 2;
        break;
      case 'c':
        score = 3;
        break;
      case 'd':
        score = 4;
        break;

      default:
        score = 0;
        break;
    }

    return score;
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
          goBack={goBack}
          key={quizindex}
        />
      )}
    </section>
  );
}

export default Quizes;
