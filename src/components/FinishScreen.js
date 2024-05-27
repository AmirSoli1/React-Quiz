function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong>
        {` (${Math.ceil(percentage)}%)`}
        {percentage >= 80 ? " 🎉" : percentage >= 50 ? " 😐" : " 😢"}
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESTART" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
