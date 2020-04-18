const initialState = {
  payload: [], //array of comments
  isLoading: false,
  error: {},
  toast: false
};

//the actions call this function, depending on the action type it does...
export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    //when the call is ongoing
    case "FETCH_COMMENTS_DATA":
      return {
        ...state,
        isLoading: true
      };
    //when the call to the API is a success
    case "FETCH_COMMENTS_SUCCESS":
      return {
        ...state,
        payload: action.comments, //dispatch the fetchCommentsSuccess(comment) in commentActions
        error: {},
        isLoading: false
      };
    //when it's been an error during the API call
    case "FETCH_COMMENTS_FAILURE":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case "POST_COMMENT":
      return {
        ...state,
        toast: false,
        payload: [action.comments, ...state.payload]
      };
    case "DEL_COMMENT":
      return {
        ...state,
        payload: state.payload.filter(comment => comment._id !== action.id) //action.id is dispatching deleteCommentSuccess(id) in commentActions
      };
    case "CHANGE_TOAST":
      return {
        ...state,
        toast: action.toast
      };
    default:
      return state;
  }
}
