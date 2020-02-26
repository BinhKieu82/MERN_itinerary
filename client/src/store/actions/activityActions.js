import axios from "axios";

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

export function readActivities(cityId) {
  return dispatch => {
    dispatch(readingActivities());
    axios
      .get(`/activities/${cityId}`)
      .then(res => {
        dispatch(readActivitiesSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(readActivitiesFailure(err.response.data));
      });
  };
}
