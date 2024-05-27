import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
  currentQuestion: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload, status: "ready" };
    case "ERROR":
      return { ...state, status: "error" };
    case "SET_ACTIVE":
      return { ...state, status: "active" };
    default:
      throw new Error("Unhandled action type: " + action.type);
  }
}

export default function App() {
  const [{ questions, status, currentQuestion }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/questions");
        if (!response.ok) {
          throw new Error("Fetch failed");
        }

        const data = await response.json();
        console.log(data);

        dispatch({ type: "SET_QUESTIONS", payload: data });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question question={questions[currentQuestion]} />
        )}
      </Main>
    </div>
  );
}
