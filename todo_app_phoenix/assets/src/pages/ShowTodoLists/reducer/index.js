const initialState = {
  loading: false,
  todoLists: [],
  error_fetch: "",
  success_fetch: ""
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
    case "fetch-todo-list-error":
      return {
        ...state,
        error_fetch: action.message,
        loading: false
      };
    default:
      throw new Error();
  }
}

export { initialState, reducer };
