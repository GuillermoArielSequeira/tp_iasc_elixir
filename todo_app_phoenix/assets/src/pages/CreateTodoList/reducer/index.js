const initialState = { loading: false, error: "", success: "" };

function reducer(state, action) {
  switch (action.type) {
    case "create-list":
      return {
        ...state,
        loading: true
      };
    case "create-list-success":
      return {
        ...state,
        success: action.payload,
        loading: false
      };
    case "create-list-error":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case "clear-messages":
      return {
        ...state,
        error: "",
        success: ""
      };
    default:
      throw new Error();
  }
}

export { initialState, reducer };
