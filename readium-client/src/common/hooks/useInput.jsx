import { useState } from "react";

export default function useInput(value = "") {
  const [inputValue, changeInputValue] = useState(value);
  const handleInput = (e) => changeInputValue(e.target.value);
  const setInput = (input) => changeInputValue(input ?? "");
  return [inputValue, handleInput, setInput];
}
