import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";
import commentsReducer from "./commentsReducer";
import favoritesReducer from "./favoritesReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  activities: activitiesReducer,
  comments: commentsReducer,
  favorites: favoritesReducer,
  error: errorReducer,
  auth: authReducer
});
export default rootReducer;