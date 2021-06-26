const initialState = {
  loading: false,
  todoLists: [],
  error_fetch: "",
  success_fetch: "",
  success_new_task: "",
  error_new_task: "",
  success_edit_task: "",
  error_edit_task: "",
  listName: "",
  taskId: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "fetch-todo-list":
      return {
        ...state,
        loading: true
      };
    case "fetch-todo-list-success":
      return {
        ...state,
        success_fetch: action.message,
        todoLists: [...state.todoLists, ...action.payload],
        loading: false
      };
    case "fetch-todo-list-success-channel":
      return {
        ...state,
        success_fetch: action.message,
        todoLists: [...action.payload],
        loading: false
      };
    case "fetch-todo-list-error":
      return {
        ...state,
        error_fetch: action.message,
        loading: false
      };
    //
    case "add-new-task":
      return {
        ...state,
        loading: true
      };
    case "add-new-task-success":
      return {
        ...state,
        success_new_task: action.payload,
        loading: false
      };
    case "add-new-task-error":
      return {
        ...state,
        error_new_task: action.payload,
        loading: false,
        listName: action.listName
      };
    case "clear-messages-new-task":
      return {
        ...state,
        error_new_task: "",
        success_new_task: "",
        listName: ""
      };
    //
    case "edit-task":
      return {
        ...state,
        loading: false
      };
    case "edit-task-success":
      return {
        ...state,
        success_edit_task: action.payload,
        loading: false
      };
    case "edit-task-error":
      return {
        ...state,
        error_edit_task: action.payload,
        loading: false,
        listName: action.listName,
        taskId: action.taskId
      };
    case "clear-edit-task":
      return {
        ...state,
        success_edit_task: "",
        error_edit_task: "",
        listName: "",
        taskId: ""
      };
    default:
      throw new Error();
  }
}

export { initialState, reducer };
