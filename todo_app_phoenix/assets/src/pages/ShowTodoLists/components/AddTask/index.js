import React from 'react';
import './index.scss';

const AddTask = ({ newTask, onChange, addTask }) => {
  return (
    <div className="add-task">
      <input
        className="add-task-input"
        maxLength="80"
        value={newTask}
        onChange={onChange}
        placeholder="Agregue una tarea nueva..."
      />

      <a className="add-task-button" onClick={addTask}>
        Agregar nueva tarea
      </a>
    </div>
  );
};

export default AddTask;
