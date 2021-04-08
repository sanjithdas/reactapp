/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-10-23 19:42:47
 * @modify date 2021-04-07 12:17:35
 * @desc [Actions - dispatch actions here , calls the appropriate actions, contact the server]
 */
import {
  GET_TASKS,
  GET_TASK,
  DELETE_TASK,
  DEL_ERROR,
  ADD_TASK,
  UPDATE_TASK,
  TASK_COMPLETED,
  TASK_NOT_COMPLETED,
} from "../actions/types";
import axios from "axios";

/**
 * fetch all the task details from the database through this API call
 */
export const getTasks = (token) => async (dispatch) => {
  axios.defaults.headers.common["Authorization"] = token;
  const res = await axios.get("http://localhost:8000/api/tasks");

  dispatch({
    type: GET_TASKS,
    payload: res.data,
  });
};
/**
 * get a room details with given id
 * @param {*} id
 */

export const getTask = (taskid, token) => async (dispatch) => {
  axios.defaults.headers.common["Authorization"] = token;
  const res = await axios.get(`http://localhost:8000/api/tasks/${taskid}`);

  dispatch({
    type: GET_TASK,
    payload: res.data.data,
  });
  // console.log(res.data);
};

export const deleteTask = (taskid, token) => async (dispatch) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    await axios.delete(`http://localhost:8000/api/tasks/${taskid}`);
    dispatch({
      type: DELETE_TASK,
      payload: taskid,
    });
  } catch (error) {
    dispatch({
      type: DEL_ERROR,
      payload: error,
    });
  }
};

// /**
//  * create a new task
//  * @param {} room
//  */

export const addTask = (token, task) => async (dispatch) => {
  
  axios.defaults.headers.common["Authorization"] = token;
  const res = await axios.post(`http://localhost:8000/api/tasks`, task);
  dispatch({
    type: ADD_TASK,
    payload: res.data,
  });
  // history.push("/admin/room/show");
};

export const updateTask = (token, task) => async (dispatch) => {
  axios.defaults.headers.common["Authorization"] = token;
  try {
    const res = await axios.put(
      `http://localhost:8000/api/tasks/${task.id}`,
      task
    );

    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
  } catch (error) {
   // console.log(error);
  }
};

export const setTaskCompleted = (id, token) => async (dispatch) => {
  //console.log("isTaskCompleted");
  axios.defaults.headers.common["Authorization"] = token;
  try {
    const res = await axios.patch(
      `http://localhost:8000/api/tasks/${id}`
      // task
    );
    
    dispatch({
      type: TASK_COMPLETED,
      payload: res.data,
    });
  } catch (error) {
   
    dispatch({
      type: TASK_NOT_COMPLETED,
      payload: error,
    });
  }
};
