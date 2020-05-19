import React from "react";
import "./App.css";
import TasksContainer from "./components/TasksContainer";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TasksContainer />
      </header>
    </div>
  );
}

export default App;
