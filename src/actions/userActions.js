/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-11-06 12:15:37
 * @modify date 2021-03-17 09:47:50
 * @desc [User Action - login , Logout , SIgnup , setAuthorizationHeader]
 */
import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
} from "../actions/types";
import axios from "axios";

// user login

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    axios.post("http://localhost:8000/api/login", userData).then((res) => {
      
      if (res.data.status === "failed") {
        dispatch({ type: SET_UNAUTHENTICATED, payload: res.data });
        dispatch({ type: SET_ERRORS, payload: res.data });
        return;
      }

      if (res.data.validation_errors) {
        dispatch({ type: SET_UNAUTHENTICATED, payload: res.data });
        dispatch({ type: SET_ERRORS, payload: res.data });
        return;
      }
      
      console.log(res);
      
      setAuthorizationHeader(res.data.token);
      setUserName(res.data.data.name);

      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_AUTHENTICATED,
        payload: res.data,
      });
      console.log(res.data.data);

      history.push({
        pathname: "/tasks",
        user: res.data.data.name,
      });
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

// user signup
export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("http://localhost:8000/api/register", newUserData)
    .then((res) => {
      console.log("signupUser", res.data.validation_errors);
      if (res.data.validation_errors) {
        dispatch({ type: SET_UNAUTHENTICATED });
        dispatch({ type: SET_ERRORS, payload: res.data });
      } else {
        if (res.status === "failed") {
          dispatch({
            type: SET_UNAUTHENTICATED,
            payload: res.data,
          });
        } else {
          dispatch({
            type: SET_UNAUTHENTICATED,
            payload: res.data,
          });
        }

        dispatch({ type: CLEAR_ERRORS });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_UNAUTHENTICATED,

        payload: err.response.data,
      });
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// logout user
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

// set authorisation token in the local storage
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

const setUserName = (userName) => {
  localStorage.setItem("user", userName);
};

// export const getUserData = (token) => (dispatch) => {
//   console.log(token);
//   axios.defaults.headers.common["Authorization"] = token;
//   axios
//     .get("http://localhost:8000/api/user")
//     .then((res) => {
//       console.log(res);
//       // setAuthorizationHeader(res.data.token);
//       dispatch({
//         type: SET_USER,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
// };
