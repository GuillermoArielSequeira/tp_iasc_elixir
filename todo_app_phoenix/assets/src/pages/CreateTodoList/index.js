import React, { useState } from "react";
import CardBase from "../../components/CardBase";
import "./index.scss";

const CreateTodoList = () => {
  const [newTask, setNewTask] = useState("");
  const [items, setItems] = useState([]);

  const handleOnChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setItems([
        ...items,
        {
          id: items.length,
          description: newTask,
          completed: false
        }
      ]);
    }
  };

  return (
    <div className='create-todo-list'>
      <CardBase className='create-todo-list-container'>
        <h1>Nueva Lista de tareas:</h1>
        <form
          className='create-todo-list-container-form'
          onSubmit={handleSumbit}
        >
          <input
            className='create-todo-list-container-form-input'
            value={newTask}
            onChange={handleOnChange}
            maxlength='80'
            placeholder='Ingrese una tarea a realizar...'
          />
        </form>
        <div className='create-todo-list-container-description'>
          {items.map((item, id) => (
            <span
              className='create-todo-list-container-description-item'
              key={item.id}
            >{`${id}. ${item.description}`}</span>
          ))}
        </div>
        {items.length > 0 && (
          <a className='create-todo-list-container-button'>
            Crear lista de tareas
          </a>
        )}
      </CardBase>
    </div>
  );
};

export default CreateTodoList;
