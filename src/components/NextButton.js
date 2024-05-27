function NextButton({ dispatch, answer, currentQuestion, numQuestions }) {
  if (answer === null) return null;

  if (currentQuestion < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "NEXT_QUESTION" });
        }}
      >
        Next
      </button>
    );

  if (currentQuestion === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "FINISH" });
        }}
      >
        Finish
      </button>
    );
}

export default NextButton;
