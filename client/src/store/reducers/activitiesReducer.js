const initialState = {
  activities: [],
  isLoading: false,
  error: {}
};

//the actions call this function, depending on the action type it does...
export default function activitiesReducer(state = initialState, action) {
  switch (action.type) {
    //when the call is ongoing
    case "READ_ACTIVITIES_DATA":
      return {
        ...state,
        isLoading: true
      };
    //when the call to the API is a success
    case "READ_ACTIVITIES_SUCCESS":
      return {
        ...state,
        activities: action.activities,
        error: {},
        isLoading: false
      };
    //when it's been an error during the API call
    case "READ_ACTIVITIES_FAILURE":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
}
