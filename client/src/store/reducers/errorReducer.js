import {GET_ERRORS, CLEAR_ERRORS} from '../actions/types';

const initialState = {
  msg: {},
  status: null,
  id: null
}

export default function(state = initialState, action) { //action is from action file
  switch(action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg, //payload from errorActions
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS: 
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}