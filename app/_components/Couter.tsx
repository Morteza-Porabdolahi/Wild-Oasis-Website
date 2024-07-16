"use client"

import { useState } from "react";

export default function Counter({ users }) {
  console.log(users)
  const [count, setCount] = useState(0);

  return (
    <div>
      {count}
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  )
}
