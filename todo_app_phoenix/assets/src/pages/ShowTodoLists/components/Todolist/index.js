import React, { useState } from "react";
import EditItem from "../EditItem";
import AddTask from "../AddTask";
import { getIcon } from "../../../../icons";
import "./index.scss";

const ShowTodoLists = ({ todoList }) => {
  const [todoListEditable, setTodoListEditable] = useState(todoList);
  const [newTask, setNewTask] = useState("");

  const handleOnChange = (e) => {
    setNewTask(e.target.value);
  };
  const handleAddTask = () => {
    setTodoListEditable({
      id: todoListEditable.id,
      tasks: [
        ...todoListEditable.tasks,
        {
          id: todoListEditable.tasks.length + 1,
          name: newTask,
          completed: false
        }
      ]
    });
  };

  const markTaskAsCompleted = (id, e) => {
    e.preventDefault();
    const foundTask = todoListEditable.tasks.find((task) => task.id === id);
    foundTask.completed = true;
    foundTask.edit = false;
    setTodoListEditable({
      id: todoListEditable.id,
      tasks: [...todoListEditable.tasks]
    });
  };

  const deleteTask = (id, e) => {
    e.preventDefault();
    const filteredTasks = todoListEditable.tasks.filter(
      (task) => task.id !== id
    );
    setTodoListEditable({
      id: todoListEditable.id,
      tasks: [...filteredTasks]
    });
  };

  const editTask = (id, e, openInput = false) => {
    e.preventDefault();
    const foundTask = todoListEditable.tasks.find((task) => task.id === id);
    foundTask.edit = openInput;
    setTodoListEditable({
      id: todoListEditable.id,
      tasks: [...todoListEditable.tasks]
    });
  };

  const changeName = (id, name) => {
    const foundTask = todoListEditable.tasks.find((task) => task.id === id);
    if (name.trim() !== "") {
      foundTask.name = name;
      setTodoListEditable({
        id: todoListEditable.id,
        tasks: [...todoListEditable.tasks]
      });
    }
  };
  debugger;
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
                    changename={changeName}
                    idTask={task.id}
                    editTask={editTask}
                  />
                )}
              </div>
              <div className='todo-item-right-content'>
                {task.completed && (
                  <p className='todo-item-right-content-completed'>
                    completada!
                  </p>
                )}
                {!task.completed && (
                  <a onClick={(e) => editTask(task.id, e, true)}>
                    {getIcon("edit")}
                  </a>
                )}
                <a onClick={(e) => markTaskAsCompleted(task.id, e)}>
                  {getIcon("check", "green")}
                </a>
                <a onClick={(e) => deleteTask(task.id, e)}>
                  {getIcon("delete", "red")}
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className='no-todo-item'>No hay mas tareas para eliminar</p>
        )}
      </div>
      <AddTask
        newTask={newTask}
        onChange={handleOnChange}
        addTask={handleAddTask}
      />
    </>
  );
};

export default ShowTodoLists;
