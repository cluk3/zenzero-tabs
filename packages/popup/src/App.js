import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href={chrome.runtime.getURL("index.html")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Zenzero
        </a>
      </header>
    </div>
  );
}

export default App;
