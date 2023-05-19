import React, { useState } from 'react';
import { useLocation } from 'react-router';

function QuizResult() {
  const [result, setResult] = useState(null);
  const score = useLocation().state.score;

  console.log(score);

  return <div>Result page</div>;
}

export default QuizResult;
