import React from "react";

const Task = ({ id, msg, isChecked, onDelete, onToggleCheck }) => {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onClick={() => onToggleCheck(id)}
        />
        <i></i>
        <span>{msg}</span>
        <a href="#" onClick={() => onDelete(id)}>
          -
        </a>
      </label>
    </li>
  );
};

export default Task;
