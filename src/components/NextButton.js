function NextButton({ dispatch, answer }) {
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
}

export default NextButton;
