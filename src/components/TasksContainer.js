import React, { useRef, useState } from "react";
import Task from "./Task";

const TasksContainer = () => {
  const newTaskInput = useRef(null);
  const [taskList, setTaskList] = useState([
    { id: 1, msg: "do this", isChecked: false },
    { id: 2, msg: "do that", isChecked: false },
    { id: 3, msg: "and then this", isChecked: false },
    { id: 4, msg: "then do that", isChecked: false },
    { id: 5, msg: "and this", isChecked: false },
  ]);

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
      id: taskList[taskList.length - 1].id + 1,
      msg: newTaskInput.current.value,
      isChecked: false,
    };
    tempTasks.push(newTask);
    await setTaskList(tempTasks);
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
    let tempList = taskList.map((task) => {
      if (task.id === taskID) {
        task.isChecked = !task.isChecked;
      }
      return task;
    });
    setTaskList(tempList);
  };

  const onTaskDelete = (taskID) => {
    let tempList = taskList.filter((task) => {
      return task.id !== taskID;
    });
    setTaskList(tempList);
  };

  return (
    <div className="tasks-container">
      <div class="tdl-holder">
        <h2>TO DO LIST</h2>
        <div class="tdl-content">
          <ul>{renderTasks()}</ul>
        </div>
        <input
          type="text"
          class="tdl-new"
          onKeyDown={(e) => keyPressHandler(e)}
          placeholder="Write new task and hit 'Enter'..."
          ref={newTaskInput}
        />
      </div>
    </div>
  );
};

export default TasksContainer;
