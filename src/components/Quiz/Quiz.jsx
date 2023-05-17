import React from 'react';

function Quiz({ quizData, goToNext }) {
  const onNext = () => {
    goToNext();
  };

  return (
    <div>
      {quizData && <h1>{quizData.question}</h1>}
      {quizData &&
        Object.keys(quizData.options).map((key) => {
          return <p key={key}>{quizData.options[key]}</p>;
        })}
      <button onClick={onNext}>Next</button>
    </div>
  );
}

export default Quiz;
