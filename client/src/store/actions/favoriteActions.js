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
    .get(`/itineraries/find/favorites/user`, tokenConfig(getState))
    .then(res => {
      console.log(
        `Fontend Favorites itineraries: (${res.data.length}) ${res.data.map(
          it => it.title
        )}`
      );
      dispatch(fetchFavoritesSuccess(res.data));
    })
    .catch(err => {
      console.log(err.response);
      dispatch(fetchFavoritesFailure(err.response.data));
    });
}
