import React, { useState } from 'react';
import styles from './Quiz.module.css';
import { Button, IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function Quiz({ quizData, goToNext, goBack }) {
  const [active, setActive] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const onNext = () => {
    if (active === null) {
      setShowAlert(true);
    } else {
      goToNext(active);
    }
  };

  const onGoBack = () => {
    goBack();
  };

  // Updated selected option
  const selectOption = (key) => {
    setActive(key);
  };

  return (
    <div className={styles.div}>
      {quizData && <h1 className={styles.question}>{quizData.question}</h1>}
      <ul>
        {quizData &&
          Object.keys(quizData.options).map((key) => {
            return (
              <li
                key={key}
                className={
                  active === key ? `${styles.active}` : `${styles.inactive}`
                }
                onClick={() => {
                  selectOption(key);
                }}
              >
                {quizData.options[key]}
              </li>
            );
          })}
      </ul>
      {showAlert && (
        <Alert className={styles.alert} severity="error">
          Please select an option!
        </Alert>
      )}
      <div className={styles.btnContainer}>
        <IconButton onClick={onGoBack} size="large">
          <ArrowCircleLeftIcon
            className={styles.btn}
            fontSize="large"
          ></ArrowCircleLeftIcon>
        </IconButton>
        <IconButton onClick={onNext} size="large">
          <ArrowCircleRightIcon
            className={styles.btn}
            fontSize="large"
          ></ArrowCircleRightIcon>
        </IconButton>
      </div>
    </div>
  );
}

export default Quiz;
