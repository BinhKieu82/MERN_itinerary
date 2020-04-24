import axios from "axios";
import { tokenConfig } from './authActions';

export function fetchingFavorites() {
  return { type: "FETCH_FAVORITES_DATA" };
}

export function fetchFavoritesSuccess(favorites) {
  return {
    type: "FETCH_FAVORITES_SUCCESS",
    favorites
  };
}

export function fetchFavoritesFailure(error) {
  return {
    type: "FETCH_FAVORITES_FAILURE",
    error
  };
}

export const fetchFavorites = () => (dispatch, getState) => {
  dispatch(fetchingFavorites());
  axios
    .get(`/users/favorites/user`, tokenConfig(getState)) //itineraries/find
    .then(res => {
      console.log( `fetchFavorites action: ${res.data}`);
      dispatch(fetchFavoritesSuccess(res.data));
    })
    .catch(err => {
      console.log('why?', err);
      dispatch(fetchFavoritesFailure(err));
    });
}
