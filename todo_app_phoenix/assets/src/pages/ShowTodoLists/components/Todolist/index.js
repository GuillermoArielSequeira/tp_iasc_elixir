import React, { useState } from "react";
import EditItem from "../EditItem";
import AddTask from "../AddTask";
import TaskActions from "../TaskActions";
import "./index.scss";

const ShowTodoLists = ({ todoList, dispatch, ...props }) => {
  const [todoListEditable, setTodoListEditable] = useState(todoList);
  const [newTask, setNewTask] = useState("");

  const editTask = (id, e, openInput = false) => {
    e.preventDefault();
    const foundTask = todoListEditable.tasks.find((task) => task.id === id);
    foundTask.edit = openInput;
    if (!openInput) {
      dispatch({ type: "clear-edit-task" });
    }
    setTodoListEditable({
      id: todoListEditable.id,
      tasks: [...todoListEditable.tasks]
    });
  };

  return (
    <>
      <h2>{todoListEditable.id}</h2>
      <div>
        {todoListEditable.tasks.length > 0 ? (
          todoListEditable.tasks.map((task) => (
            <div className='todo-item'>
              <div className='todo-item-name'>
                <p key={task.id}>
                  {task.id}. {task.name}
                </p>
                {task.edit && (
                  <EditItem
                    closeInput={(e) => editTask(task.id, e)}
                    task={task}
                    listName={todoListEditable.id}
                    dispatch={dispatch}
                    {...props}
                  />
                )}
              </div>
              <TaskActions
                task={task}
                editTask={editTask}
                listName={todoListEditable.id}
                dispatch={dispatch}
                {...props}
              />
            </div>
          ))
        ) : (
          <p className='no-todo-item'>No hay mas tareas para eliminar</p>
        )}
      </div>
      <AddTask
        newTask={newTask}
        setNewTask={setNewTask}
        listName={todoListEditable.id}
        dispatch={dispatch}
        {...props}
      />
    </>
  );
};

export default ShowTodoLists;
