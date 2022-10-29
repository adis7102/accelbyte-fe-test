const initialState = {
  loading: false,
  listData: [],
  page: 1
}

export default (state = initialState, action) => {
  const { type } = action || {};

  switch(type) {
    case "LOADING":
      return {
        ...state,
        loading: action?.loading
      }
    case "GET_LIST_DATA":
      return {
        ...state,
        listData: action?.listData
      }
    case "ERROR":
      return {
        ...state,
        error: action?.error
      }
    default:
      return state
  }
}