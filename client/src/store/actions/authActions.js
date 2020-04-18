import axios from 'axios';
import { returnErrors } from './errorActions';


import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

export function addFavorite(id) {
  return {
    type: "ADD_FAVORITE",
    itinerary: id
  };
}

export function removeFavorite(id) {
  return {
    type: "REMOVE_FAVORITE",
    itinerary: id
  };
}

//check token & load user
export const loadUser =() => (dispatch, getState) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios.get('/auth/user', tokenConfig(getState))
  .then(res => dispatch({ 
    type: USER_LOADED,
    payload: res.data //return from backend: user {id, name, email}
  }))
  .catch(err => {
    dispatch(returnErrors(err.msg, err.status));
    dispatch({
      type: AUTH_ERROR
    })
  })
}

//Register user
export const register = ({ name, email, password }) => dispatch =>{
  const config = { //Headers
    headers: {
      'Content-type': 'application/json'
    }
  }
  //Request body from server
  const body = JSON.stringify({ name, email, password });

  axios.post('/users', body, config)
  .then(res => dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data //got response from backend: token, user {id, name, email}
  }))
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({
      type: REGISTER_FAIL
    });
  });
}

//Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/auth', body, config) //need to be authenticated before login
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//Logout User
export const logout = () => { //no need dispatch
  return {
    type: LOGOUT_SUCCESS
  };
}

export const postFavorite = (id) => (dispatch, getState) => {
  axios
    .put(
      "/users/favorites",
      {
        itinerary: id
      },
      tokenConfig(getState)
    )
    .then(res => {
      if (res.status === 201) {
        console.log(`Itinerary ${res.data} ADDED to your favorites.`);
        dispatch(addFavorite(res.data));
      } else if (res.status === 202) {
        console.log(`Itinerary ${res.data} REMOVED from your favorites.`);
        dispatch(removeFavorite(res.data));
      }
    })
    .catch(err => {
      console.log(err);
    });
}

//Setup config/headers & token, that will be reusable
export const tokenConfig = getState => {
  //Get token from localstorage
  const token = getState().auth.token; //auth reducer from rootreducer. token stored in localstorage
  
  //Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  
  //if token, add to the header
  if(token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}


