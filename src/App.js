import React, { useState } from "react";
import "./App.css";
import FinancialForm from "./FinancialForm";
import Result from "./Result";

function App() {
  const [result, setResult] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Metrics Analysis</h1>
      </header>

      <Result result={result} />

      <FinancialForm setResult={setResult} />
    </div>
  );
}

export default App;
