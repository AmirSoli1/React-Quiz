import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
  currentQuestion: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SEC_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload, status: "ready" };
    case "ERROR":
      return { ...state, status: "error" };
    case "SET_ACTIVE":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "SET_ANSWER":
      const question = state.questions[state.currentQuestion];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      };
    case "FINISH":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "RESTART":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };
    case "TICK":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unhandled action type: " + action.type);
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      currentQuestion,
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

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
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              currentQuestion={currentQuestion}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[currentQuestion]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                currentQuestion={currentQuestion}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}
