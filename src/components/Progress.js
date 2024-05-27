function Progress({
  currentQuestion,
  numQuestions,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currentQuestion + Number(answer !== null)}
      ></progress>

      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
