import React, { useState, useEffect } from "react";
import { getIcon } from "../../../../icons";
import { editTaskService } from "../../../../services";
import "./index.scss";

const EditItem = ({
  task,
  closeInput,
  listName,
  dispatch,
  state,
  inputType,
  todoList
}) => {
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setNewTask("");
  }, [inputType]);

  const handleOnChange = (e) => {
    if (state.success_edit_task || state.error_edit_task)
      dispatch({ type: "clear-edit-task" });
    setNewTask(e.target.value);
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    if (state.success_edit_task || state.error_edit_task)
      dispatch({ type: "clear-edit-task" });
    if (newTask) {
      dispatch({ type: "edit-task" });
      editTaskService(listName, task.id, newTask)
        .then((response) => {
          dispatch({
            type: "edit-task-success",
            payload: "La tarea se completo con exito"
          });
        })
        .catch((error) => {
          dispatch({
            type: "edit-task-error",
            payload: `Error al completar la tarea: ${error.data}`,
            listName,
            taskId: task.id
          });
        });
      closeInput(e);
    } else {
      dispatch({
        type: "edit-task-error",
        payload: "ingrese un nuevo nombre para continuar",
        listName,
        taskId: task.id
      });
    }
  };

  const handleChangePositionTask = (e) => {
    e.preventDefault();
  };

  return (
    <div className='edit-item'>
      {inputType === "input" ? (
        <input
          className='create-todo-list-container-form-input'
          maxLength='80'
          value={newTask}
          onChange={handleOnChange}
          placeholder='Actualize la tarea a realizar...'
        />
      ) : (
        <>
          <label for='positions'>Cambiar la tarea de posicion: </label>
          <select
            onChange={handleOnChange}
            className='edit-item-selector'
            id='positions'
          >
            {todoList.map((item) => {
              return item.id !== task.id ? (
                <option value={`${item.id}`}>{item.id}</option>
              ) : null;
            })}
          </select>
        </>
      )}
      <>
        <a
          onClick={
            inputType === "input" ? handleEditTask : handleChangePositionTask
          }
        >
          {getIcon("check", "green")}
        </a>
        <a onClick={closeInput}>{getIcon("close", "red")}</a>
      </>
    </div>
  );
};

export default EditItem;
