const axios = require("axios");

const createTodoListService = (list_name, tasks) => {
  return axios
    .post("http://localhost:4000/api/todo_lists", {
      list_name,
      tasks
    })
    .then((response) => response);
};

const fetchAllTodoLists = async () => {
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

const addTaskToList = (list_name, new_task) => {
  return axios
    .post(`http://localhost:4000/api/todo_lists/${list_name}`, {
      name: new_task
    })
    .then((response) => response);
};

const removeTask = (list_name, task_id) => {
  return axios
    .delete(`http://localhost:4000/api/todo_lists/${list_name}/${task_id}`)
    .then((response) => response);
};

const resolveTask = (list_name, task_id) => {
  return axios
    .patch(`http://localhost:4000/api/todo_lists/${list_name}/${task_id}`, {
      resolve: true
    })
    .then((response) => response);
};

const editTaskService = (list_name, task_id, name) => {
  return axios
    .patch(`http://localhost:4000/api/todo_lists/${list_name}/${task_id}`, {
      name
    })
    .then((response) => response);
};

export {
  createTodoListService,
  fetchAllTodoLists,
  addTaskToList,
  removeTask,
  resolveTask,
  editTaskService
};
