//import * as types from '../actions/actionTypes';

const initialState = {
  cities: [],
  isLoading: false,
  error: {}
};

export default function citiesReducer(state = initialState, action) {
  switch (action.type) {
    //fetching
    case "READ_CITIES":
      return {
        ...state,
        isLoading: true
      };
    //fetched well
    case "READ_CITIES_SUCCESS":
      return {
        ...state,
        cities: action.cities,
        error: {},
        isLoading: false
      };
    //fetch failed
    case "READ_CITIES_FAILURE":
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
}
