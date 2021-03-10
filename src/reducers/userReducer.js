/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-11-06 14:49:24
 * @modify date 2021-03-06 16:34:35
 * @desc [User Reducer]
 */
// import the action types
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "../actions/types";

// initialise the state
const initialState = {
  authenticated: false,
  credentials: {},
};

// check the action type and update the state
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        ...action.payload,
        credentials: action.payload,
      };
    case SET_UNAUTHENTICATED:
      return { initialState, ...action.payload };
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
      };
    default:
      return state;
  }
}
