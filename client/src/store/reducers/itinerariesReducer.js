const initialState = {
  itineraries: [], //will be used as props (mapStateToProps: this.props.itineraries.itineraries) in itineraries components
  isLoading: false,
  error: {}
};

export default function itinerariesReducer(state = initialState, action) {
  switch (action.type) {
    //reading
    case "READ_ITINERARIES_DATA":
      return {
        ...state,
        isLoading: true
      };
    //API call is a success
    case "READ_ITINERARIES_SUCCESS":
      return {
        ...state,
        itineraries: action.itineraries, //res.data in itineraryActions
        error: {},
        isLoading: false
      };
    //API call failure
    case "READ_ITINERARIES_FAILURE":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
}
