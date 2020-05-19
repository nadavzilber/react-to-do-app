import React, { useRef, useState, useEffect } from "react";
import Task from "./Task";
import { authenticate } from "../services/SpreadSheet";
import "../App.css";

const FormContainer = (props) => {
  const currentInput = useRef(null);

  //  const [journal, setJournal] = useState(true);

  const [currentHeaderIndex, setFormHeader] = useState(null);
  const { formName } = props;
  const morning = {
    sheetId: 30,
    headers: [
      "Daily Quote",
      "Today I am grateful for",
      "3 things that would make today great",
      "Affirmations",
    ],
    inputs: [],
  };

  useEffect(() => {
    const fetchData = async () => {
      await authenticate();
      await setFormHeader(0);
    };
    fetchData();
  }, []);

  const onNext = async (e, currentHeaderIndex) => {
    e.preventDefault();
    if (currentHeaderIndex !== 0) {
      //if (currentInput && currentInput.current && currentInput.current.value) {
      if (currentInput.current.value.trim(" ").length > 0) {
        morning.inputs[currentHeaderIndex] = currentInput.current.value;
        currentInput.current.value = "";
      } else {
        console.log("bad input, do something");
        //todo: do something
      }
    }
    await setFormHeader(currentHeaderIndex + 1);
  };

  const renderForm = (currentHeaderIndex) => {
    if (formName === "Five Minute Journal - Morning") {
      if (currentHeaderIndex <= morning.headers.length) {
        return (
          <>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              {morning.headers[currentHeaderIndex]}
            </label>
            {currentHeaderIndex !== 0 && (
              <input
                type="text"
                id="defaultFormLoginEmailEx"
                className="form-control"
                ref={currentInput}
              />
            )}
            <br />
            <div className="text-center mt-4">
              <button
                color="indigo"
                onClick={(e) => onNext(e, currentHeaderIndex)}
              >
                Next
              </button>
            </div>
          </>
        );
      } else {
        return <label>Finished</label>;
      }
    }
  };

  return (
    <div className="tasks-container">
      <div className="tdl-holder">
        <h2>{formName}</h2>
        <div className="tdl-content">
          <form> {renderForm(currentHeaderIndex)} </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
