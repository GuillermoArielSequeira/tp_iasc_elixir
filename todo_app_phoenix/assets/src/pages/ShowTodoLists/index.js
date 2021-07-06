import React, { useReducer, useEffect } from "react";
import CardBase from "../../components/CardBase";
import TodoList from "./components/Todolist";
import { initialState, reducer } from "./reducer";
import { fetchAllTodoLists } from "../../services";
import { Socket } from "phoenix";
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

  useEffect(() => {
    let socket = new Socket("/socket", {});
    socket.connect();
    let channelAux = socket.channel("todo", {});

    // se conecta al channel
    channelAux
      .join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        dispatch({
          type: "fetch-todo-list-error",
          message: `Fallo el broadcast debido a: ${resp.reason}`
        });
      });

    // escucha activa a las modificaciones
    channelAux.on("update_list", (payload) => {
      dispatch({ type: "fetch-todo-list" });
      fetchAllTodoLists()
        .then((response) =>
          dispatch({
            type: "fetch-todo-list-success-channel",
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
    });
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
