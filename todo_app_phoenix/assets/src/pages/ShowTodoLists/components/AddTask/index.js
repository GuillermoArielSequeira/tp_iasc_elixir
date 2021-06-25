import React from "react";
import "./index.scss";
import { addTaskToList } from "../../../../services";

const AddTask = ({ newTask, setNewTask, state, dispatch, listName }) => {
  const handleOnChange = (e) => {
    if (state.error_new_task || state.success_new_task)
      dispatch({ type: "clear-messages-new-task" });
    setNewTask(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask) {
      dispatch({ type: "add-new-task" });
      addTaskToList(listName, newTask)
        .then((response) => {
          setNewTask("");
          dispatch({
            type: "add-new-task-success",
            payload: "Se agrego una tarea con exito"
          });
        })
        .catch((error) => {
          setNewTask("");
          dispatch({
            type: "add-new-task-error",
            payload: `Error al crear la tarea${error.data}`,
            listName
          });
        });
    } else {
      dispatch({
        type: "add-new-task-error",
        payload: "Complete el campo para poder avanzar",
        listName
      });
    }
  };

  return (
    <div className='add-task'>
      <div>
        <input
          className='add-task-input'
          maxLength='80'
          value={newTask}
          onChange={handleOnChange}
          placeholder='Agregue una tarea nueva...'
        />

        <a className='add-task-button' onClick={handleAddTask}>
          Agregar nueva tarea
        </a>
      </div>
      {state.error_new_task && listName === state.listName && (
        <span className='add-task-error'>{state.error_new_task}</span>
      )}
    </div>
  );
};

export default AddTask;
