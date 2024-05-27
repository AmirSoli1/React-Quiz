import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload, status: "ready" };
    case "ERROR":
      return { ...state, status: "error" };
    default:
      throw new Error("Unhandled action type: " + action.type);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/questions");
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
        <p>1/15</p>
        <p>Question 1</p>
      </Main>
    </div>
  );
}
