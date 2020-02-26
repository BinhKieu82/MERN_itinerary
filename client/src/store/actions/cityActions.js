import axios from 'axios';
//import * as types from './actionTypes';

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

export function readCities() {
  return dispatch => {
    dispatch(readingCities());
    axios
      .get('cities/all')
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
