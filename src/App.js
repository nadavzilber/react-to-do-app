import React from "react";
import "./App.css";
import TasksContainer from "./components/TasksContainer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home />
        {/* <TasksContainer /> */}
      </header>
    </div>
  );
}

export default App;
