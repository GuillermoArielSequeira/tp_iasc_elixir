const initialState = { loading: false, error: "", success: "" };

function reducer(state, action) {
  switch (action.type) {
    case "create-list":
      return {
        ...state,
        loading: true
      };
    case "success":
      return {
        ...state,
        success: action.payload,
        loading: false
      };
    case "error":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      throw new Error();
  }
}

export { initialState, reducer };
