import React from "react";
import { getIcon } from "../../../../icons";
import { removeTask, resolveTask } from "../../../../services";
import "./index.scss";

const TaskActions = ({
  task,
  editTask,
  state,
  dispatch,
  listName,
  setInputType
}) => {
  const handleDeleteTask = (e) => {
    e.preventDefault();
    if (state.success_edit_task || state.error_edit_task)
      dispatch({ type: "clear-edit-task" });
    dispatch({ type: "edit-task" });
    removeTask(listName, task.id)
      .then((response) => {
        dispatch({
          type: "edit-task-success",
          payload: "Se elimino una tarea con exito"
        });
      })
      .catch((error) => {
        dispatch({
          type: "edit-task-error",
          payload: `Error al eliminar la tarea: ${error.data}`,
          listName,
          taskId: task.id
        });
      });
  };

  const handleResolveTask = (e) => {
    e.preventDefault();
    if (state.success_edit_task || state.error_edit_task)
      dispatch({ type: "clear-edit-task" });
    dispatch({ type: "edit-task" });
    resolveTask(listName, task.id)
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
  };

  const handleEditIcon = (e) => {
    setInputType("input");
    editTask(task.id, e, true);
  };

  const handleListIcon = (e) => {
    setInputType("selector");
    editTask(task.id, e, true);
  };

  return (
    <div className='task-actions'>
      <div className='task-actions-container'>
        {task["resolve?"] && (
          <p className='task-actions-completed'>completada!</p>
        )}
        {!task["resolve?"] && (
          <>
            <a onClick={handleListIcon}>{getIcon("list")}</a>
            <a onClick={handleEditIcon}>{getIcon("edit")}</a>
          </>
        )}
        <a onClick={handleResolveTask}>{getIcon("check", "green")}</a>
        <a onClick={handleDeleteTask}>{getIcon("delete", "red")}</a>
      </div>
      {state.error_edit_task &&
        listName === state.listName &&
        task.id === state.taskId && (
          <span className='task-actions-error'>{state.error_edit_task}</span>
        )}
    </div>
  );
};

export default TaskActions;
