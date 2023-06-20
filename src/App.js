import React, { useState, useMemo } from "react";
import "./App.css";

//optimize the expensive operation
//Referential Equality

function App() {
  const [counter, setCounter] = useState(1);
  const result = useMemo(() => {
    return factorial(counter);
  }, [counter]); //this is heavy operation whenever counter value changed component re-rendered(every time while loop exe).
  const [name, setName] = useState(""); //soo we use the useMemo.it same as useEffect it has arrow function.we pass the dependency array whenever the counter value is changed useMemo executed
  return (
    <div className="App">
      <h1>
        Factorial of {counter} is:{result}
      </h1>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        Decrement
      </button>
      <hr />
      <label>Enter the name</label>
      <input
        type="text"
        placeholder="Enter the name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <hr />
      <DisplayName name={name} />
    </div>
  );
}
const DisplayName = React.memo(({ name }) => {
  console.log("rendered");
  return <p>My name is:{name}</p>; // when we click on inc or dec component re rendered but props(name) still same no displayname not rendered.. ref equality of prop is true then props are not changed.
});

function factorial(n) {
  //   let i = 0;
  //   while (i < 20) i++; // we add this loop it makes heavy operation because of this heavy operation it takes time run
  if (n < 0) return -1;
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

export default App;
