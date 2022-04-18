import { useState } from "react";

export function useInput() {
  const [Input, setInput] = useState("");
  const targetInput = (e) => {
    setInput(e.target.value);
  };
  return { Input, targetInput };
}
