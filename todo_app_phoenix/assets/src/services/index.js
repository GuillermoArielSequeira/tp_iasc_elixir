const axios = require("axios");

export const createTodoListService = (list_name, tasks) => {
  return axios
    .post("http://localhost:4000/api/todo_lists", {
      list_name,
      tasks
    })
    .then((response) => response);
};
