import React, { useReducer, useEffect } from "react";
import CardBase from "../../components/CardBase";
import TodoList from "./components/Todolist";
import { initialState, reducer } from "./reducer";
import { fetchAllTodoLists } from "../../services";
import "./index.scss";

const ShowTodoLists = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "fetch-todo-list" });
    fetchAllTodoLists()
      .then((response) =>
        dispatch({
          type: "fetch-todo-list-success",
          message: "ok",
          payload: response
        })
      )
      .catch((error) =>
        dispatch({
          type: "fetch-todo-list-error",
          message: `ocurrio el siguiente error: ${error.message}`
        })
      );
  }, []);

  return (
    <div className='show-todo-list'>
      {state.error_fetch && (
        <span className='show-todo-list-error_fetch'>{state.error_fetch}</span>
      )}
      {state.todoLists.map((todoList) => (
        <CardBase key={todoList.id} className='show-todo-list-container'>
          <TodoList todoList={todoList} state={state} dispatch={dispatch} />
        </CardBase>
      ))}
    </div>
  );
};

export default ShowTodoLists;
