import React, { useState, useReducer } from "react";
import CardBase from "../../components/CardBase";
import { createTodoListService } from "../../services";
import "./index.scss";
import { initialState, reducer } from "./reducer";

const CreateTodoList = () => {
  const [newTask, setNewTask] = useState("");
  const [items, setItems] = useState([]);
  const [nameTodoListInput, setNameTodoListInput] = useState("");
  const [nameTodoList, setNameTodoList] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOnChangeNewtask = (e) => {
    setNewTask(e.target.value);
  };

  const handleOnChangeNameTodoList = (e) => {
    setNameTodoListInput(e.target.value);
  };

  const handleSumbitTask = (e) => {
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
      setNewTask("");
    }
  };

  const handleSumbitNameTodoList = (e) => {
    e.preventDefault();
    setNameTodoList(nameTodoListInput);
    setNameTodoListInput("");
  };

  const createTodoList = (e) => {
    if (items.length > 0 && nameTodoList) {
      dispatch({ type: "create-list" });
      createTodoListService(nameTodoListInput, items)
        .then((res) => {
          setNameTodoList("");
          setNameTodoListInput("");
          setItems([]);
          setNewTask("");
          dispatch({
            type: "success",
            payload: "La lista se creo correctamente"
          });
        })
        .catch((err) => {
          dispatch({
            type: "error",
            payload: "Ocurrio un error intente nuevamente"
          });
        });
    }
  };

  return (
    <div className='create-todo-list'>
      <h1 className='create-todo-list-title'>Nueva Lista de la tareas</h1>
      <CardBase className='create-todo-list-container'>
        <form
          className='create-todo-list-container-form'
          onSubmit={handleSumbitNameTodoList}
        >
          <h4>Nombre de la nueva lista de tareas</h4>
          <input
            className='create-todo-list-container-form-input'
            value={nameTodoListInput}
            onChange={handleOnChangeNameTodoList}
            maxlength='80'
            placeholder='Ingrese el nuevo nombre de la lista de tareas...'
          />

          {nameTodoList && (
            <div className='create-todo-list-container-description'>
              <span className='create-todo-list-container-description-item'>
                {nameTodoList}
              </span>
            </div>
          )}
        </form>
        <form
          className='create-todo-list-container-form'
          onSubmit={handleSumbitTask}
        >
          <h4>Nombre de tarea a realizar</h4>
          <input
            className='create-todo-list-container-form-input'
            value={newTask}
            onChange={handleOnChangeNewtask}
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
        {items.length > 0 && nameTodoList && (
          <a
            onClick={createTodoList}
            className='create-todo-list-container-button'
          >
            Crear lista de tareas
          </a>
        )}
      </CardBase>
      {state.error && (
        <span className='create-todo-list-error'>{state.error}</span>
      )}
      {state.success && (
        <span className='create-todo-list-success'>{state.success}</span>
      )}
    </div>
  );
};

export default CreateTodoList;
