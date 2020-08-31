import React, { useState, useEffect } from "react";
import { FruitList, AddFruit } from "../components/Fruit";

export default function HooksPage() {
  const [date, setDate] = useState(new Date());
  const [fruits, setFruits] = useState(["apple", "banana"]);
  useEffect(() => {
    console.log("useEffect");
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, [date]);
  //const addFruit=()
  return (
    <div>
      HooksPage
      <p>{date.toLocaleTimeString()}</p>
      <AddFruit addFruit={item => setFruits([...fruits, item])} />
      <FruitList fruits={fruits} setFruits={setFruits} />
    </div>
  );
}
