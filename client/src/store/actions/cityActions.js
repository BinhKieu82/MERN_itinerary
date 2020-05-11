import axios from 'axios';
//import { tokenConfig } from './authActions';


export function readingCities() {
  return { type: 'READ_CITIES' };
}

export function readCitiesSuccess(cities) {
  return {
    type: 'READ_CITIES_SUCCESS',
    cities
  };
}

export function readCitiesFailure(error) {
  return {
    type: 'READ_CITIES_FAILURE',
    error
  };
}

export function postingCities() {
  return { type: 'POST_CITIES' };
}

export function postCitiesSuccess(cities) {
  return {
    type: 'POST_CITIES_SUCCESS',
    cities
  };
}

export function postCitiesFailure(error) {
  return {
    type: 'POST_CITIES_FAILURE',
    error
  };
}

export function readCities() {
  return dispatch => {
    dispatch(readingCities());
    axios
      .get('/cities/all')
      .then(res => {
        dispatch(readCitiesSuccess(res.data));        
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        dispatch(readCitiesFailure(err.response.statusText));
      });
  };
}

//postCity function will be launch later
/* export const postCities = () => (dispatch, getState) => {
  dispatch(postingCities());
  const body = JSON.stringify({ name, country });
  axios
    .post('/cities', body, tokenConfig(getState))
    .then(res => {
      dispatch(postCitiesSuccess(res.data));        
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      dispatch(postCitiesFailure(err.response.statusText));
    });
} */