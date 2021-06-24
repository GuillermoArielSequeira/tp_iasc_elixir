import React from 'react';
import CardBase from '../../components/CardBase';
import { todoLists } from '../../mock/todoLists';
import TodoList from './components/Todolist';
import './index.scss';

const ShowTodoLists = () => {
  return (
    <div className="show-todo-list">
      {todoLists.map((todoList) => (
        <CardBase key={todoList.id} className="show-todo-list-container">
          <TodoList todoList={todoList} />
          <a className="show-todo-list-container-button">Actualizar Lista de tareas</a>
        </CardBase>
      ))}
    </div>
  );
};

export default ShowTodoLists;
