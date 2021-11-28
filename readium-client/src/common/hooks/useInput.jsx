import { useState } from "react";

export default function useInput() {
  const [inputValue, changeInputValue] = useState("");
  const handleInput = (e) => changeInputValue(e.target.value);
  return [inputValue, handleInput];
}
