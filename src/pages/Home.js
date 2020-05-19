import React, { useState } from "react";
import TasksContainer from "../components/TasksContainer";
import FormContainer from "../components/FormContainer";
import "./home-style.css";

const Home = () => {
  const [selectedComponent, select] = useState(null);

  const renderComponent = (page) => {
    switch (page) {
      case "5MJ-Morning":
        return <FormContainer formName="Five Minute Journal - Morning"/>;
      case "Tasks":
        return <TasksContainer />;
      default:
        return <h1>404 page not found</h1>;
    }
  };

  return (
    <>
      <form className="selection-form">
        <div className="selection-radio">
          <input
            type="radio"
            name="5MJ-Morning"
            value="5MJ-Morning"
            onChange={() => select("5MJ-Morning")}
          />
          <p>5MJ Morning</p>
        </div>
        <div className="selection-radio">
          <input
            type="radio"
            name="Tasks"
            value="Tasks"
            onChange={() => select("Tasks")}
          />
          <p>Tasks</p>
        </div>
        <div className="selection-radio">
          <input
            type="radio"
            name="fruit"
            value="melon"
            label="melon"
            onChange={() => select("Melon")}
          />
          <p>Melon</p>
        </div>
      </form>

      {selectedComponent && renderComponent(selectedComponent)}
    </>
  );
};

export default Home;
