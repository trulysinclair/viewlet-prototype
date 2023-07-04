import { useState } from "react";
import "./App.css";

type Props = {
  name: string;
};

function App(props: Props) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="font-bold font-mono text-6xl">{props.name}</h1>
      <div className="card flex flex-col justify-center">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
