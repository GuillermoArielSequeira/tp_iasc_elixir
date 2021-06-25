const axios = require("axios");

export const createTodoListService = (list_name, tasks) => {
  return axios
    .post("http://localhost:4000/api/todo_lists", {
      list_name,
      tasks
    })
    .then((response) => response);
};

export const fetchAllTodoLists = async () => {
  let todoListsReturn = [];

  //obtengo la lista con todas la tareas
  try {
    const response = ["hola1", "hola2"];

    for (let list of response) {
      const request = await axios.get(
        `http://localhost:4000/api/todo_lists/${list}/entries`
      );
      todoListsReturn = [...todoListsReturn, { id: list, tasks: request.data }];
    }

    return todoListsReturn;
  } catch (error) {
    throw error;
  }
};
