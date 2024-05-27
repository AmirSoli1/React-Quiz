function FinishScreen({ points, maxPoints }) {
  const percentage = (points / maxPoints) * 100;

  return (
    <p className="result">
      You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong>
      {percentage >= 80 ? " 🎉" : percentage >= 50 ? " 😐" : " 😢"}
      points!
    </p>
  );
}

export default FinishScreen;
