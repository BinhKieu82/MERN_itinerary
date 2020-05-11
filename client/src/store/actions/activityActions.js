import axios from "axios";
import { tokenConfig } from './authActions';

export function readingActivities() {
  return { type: "READ_ACTIVITIES_DATA" };
}

export function readActivitiesSuccess(activities) {
  return {
    type: "READ_ACTIVITIES_SUCCESS",
    activities
  };
}

export function readActivitiesFailure(error) {
  return {
    type: "READ_ACTIVITIES_FAILURE",
    error
  };
}

export const readActivities = cityId => (dispatch, getState) => {
  dispatch(readingActivities());
  axios
    .get(`/activities/${cityId}`, tokenConfig(getState))
    .then(res => {
      dispatch(readActivitiesSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(readActivitiesFailure(err));
    });
}