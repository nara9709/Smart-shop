import React from 'react';
import styles from './Quiz.module.css';
import { Button } from '@mui/material';

function Quiz({ quizData, goToNext }) {
  const onNext = () => {
    goToNext();
  };

  return (
    <div className={styles.div}>
      {quizData && <h1 className={styles.question}>{quizData.question}</h1>}
      <ul>
        {quizData &&
          Object.keys(quizData.options).map((key) => {
            return <li key={key}>{quizData.options[key]}</li>;
          })}
      </ul>
      <Button onClick={onNext} variant="contained">
        Next
      </Button>
    </div>
  );
}

export default Quiz;
