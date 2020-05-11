import axios from "axios";
import { tokenConfig } from './authActions';

export function readingItineraries() {
  return { type: "READ_ITINERARIES_DATA" };
}

export function readItinerariesSuccess(itineraries) {
  return {
    type: "READ_ITINERARIES_SUCCESS",
    itineraries //res.data
  };
}

export function readItinerariesFailure(error) {
  return {
    type: "READ_ITINERARIES_FAILURE",
    error
  };
}

export const readItineraries = (cityId) => (dispatch, getState) => {
  dispatch(readingItineraries());
  axios
    .get(`/itineraries/${cityId}`, tokenConfig(getState))
    .then(res => {
      dispatch(readItinerariesSuccess(res.data));//itineraries in SUCCESS                
      // console.log(
      //   `Itineraries for this city: (${res.data.length}) , cityID: ${cityId}, ${res.data.map(
      //     iti => iti.title
      //   )}`
      // );
    })
    .catch(err => {
      //console.log('itinerayActions error:', err.response.data);
      dispatch(readItinerariesFailure(err.response.data));
    });
}
