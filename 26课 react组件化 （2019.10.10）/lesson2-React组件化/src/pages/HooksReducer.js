import React, { useEffect, useReducer } from "react";
import { FruitList } from "../components/Fruit";
//add : [...state, action.payload]
function fruitsReducer(state, action) {
  switch (action.type) {
    case "init":
    case "replace":
      return action.payload;
    default:
      return state;
  }
}

export default function HooksReducer() {
  const [fruits, dispatch] = useReducer(fruitsReducer, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "init", payload: ["apple", "banana"] });
    }, 1000);
    return () => {};
  }, []);

  return (
    <div>
      HooksReducer
      <FruitList
        fruits={fruits}
        setFruits={newFruitList =>
          dispatch({ type: "replace", payload: newFruitList })
        }
      />
    </div>
  );
}
