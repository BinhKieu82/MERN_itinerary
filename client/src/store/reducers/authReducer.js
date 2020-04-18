import {
  USER_LOADED, 
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  image: null,
  favorites: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        image: action.user.google ? action.user.google.image : null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
      case "ADD_FAVORITE":
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload,
          favorites: [...state.favorites, action.itinerary] //dispatch addFavorite(id) in authActions
        };
      case "REMOVE_FAVORITE":
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload,
          favorites: state.favorites.filter(
            itinerary => itinerary !== action.itinerary
          )
        };
    default:
      return state;
  }
}