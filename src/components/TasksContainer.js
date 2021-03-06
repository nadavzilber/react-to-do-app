import React, { useRef, useState, useEffect } from "react";
import Task from "./Task";
import {
  authenticate,
  addNewRow,
  updateRow,
  deleteRow,
  getExistingData,
} from "../services/SpreadSheet";
import "../App.css";

const TasksContainer = () => {
  const newTaskInput = useRef(null);
  const [taskList, setTaskList] = useState([
    // { id: 1, msg: "do this", isChecked: false },
    // { id: 2, msg: "do that", isChecked: false },
    // { id: 3, msg: "and then this", isChecked: false },
    // { id: 4, msg: "then do that", isChecked: false },
    // { id: 5, msg: "and this", isChecked: false },
  ]);
  const [isFetchingData, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await authenticate();
      let existingData = await getExistingData();
      let newTaskList = existingData.map((row) => {
        return {
          id: row.id,
          msg: row.msg,
          isChecked: row.isChecked == "TRUE",
          date: row.date,
        };
      });
      await setTaskList(newTaskList);
      await setIsFetching(false);
    };
    fetchData();
  }, []);

  const keyPressHandler = async (e) => {
    let code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      let newTask = newTaskInput.current.value;
      newTask = newTask.replace(/ +?/g, "");
      if (newTask == "") {
        return;
      } else {
        await addTask();
        await resetInput();
      }
    }
  };

  const addTask = async () => {
    let tempTasks = [...taskList];
    let newTask = {
      id:
        taskList.length > 0
          ? parseInt(taskList[taskList.length - 1].id) + 1
          : 1,
      msg: newTaskInput.current.value,
      isChecked: false,
    };
    tempTasks.push(newTask);
    await setTaskList(tempTasks);
    await addNewRow(newTask);
  };

  const resetInput = () => {
    newTaskInput.current.value = "";
  };

  const renderTasks = () => {
    return taskList.map((task, index) => {
      return (
        <Task
          key={index}
          id={task.id}
          isChecked={task.isChecked}
          msg={task.msg}
          onToggleCheck={onToggleCheck}
          onDelete={onTaskDelete}
        />
      );
    });
  };

  const onToggleCheck = (taskID) => {
    let isChecked;
    let tempList = taskList.map((task) => {
      if (task.id === taskID) {
        task.isChecked = !task.isChecked;
        isChecked = task.isChecked;
      }
      return task;
    });
    setTaskList(tempList);
    updateRow(taskID, isChecked);
  };

  const onTaskDelete = (taskID) => {
    let tempList = taskList.filter((task) => {
      return task.id !== taskID;
    });
    setTaskList(tempList);
    deleteRow(taskID);
  };

  return (
    <>
      {isFetchingData ? (
        <h4>Fetching Data</h4>
      ) : (
        <div className="tasks-container">
          <div className="tdl-holder">
            <h2>TO DO LIST</h2>
            <div className="tdl-content">
              <ul>{renderTasks()}</ul>
            </div>
            <input
              type="text"
              className="tdl-new"
              onKeyDown={(e) => keyPressHandler(e)}
              placeholder="Write new task and hit 'Enter'..."
              ref={newTaskInput}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TasksContainer;
