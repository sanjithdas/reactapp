/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-10-23 20:28:55
 * @modify date 2021-03-09 06:40:34
 * @desc [Reducer - update the state of the room]
 */

// import the action types
import {
  DEL_ERROR,
  GET_TASKS,
  GET_TASK,
  DELETE_TASK,
  ADD_TASK,
  UPDATE_TASK,
  TASK_COMPLETED,
} from "../actions/types";

// setting initial state (global)
const initialState = {
  tasks: [],
  task: {},
  errors: {},
  isTaskCompleted: false,
  completedTask: {},
};

// check the action type and update the state
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case GET_TASK:
      return {
        ...state,
        task: action.payload,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((tasks) => tasks.roomno !== action.payload),
      };
    case DEL_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: action.payload,
        room: action.payload,
      };
    case UPDATE_TASK:
      return {
        ...state,
        // tasks: state.tasks.map((task) =>
        //   task.id === action.payload.id ? (task = action.payload) : task
        // ),
      };

    case TASK_COMPLETED:
      return {
        ...state,
        completedTask: action.payload,
        // tasks: state.tasks.map((task) =>
        //   task.id === action.payload.id ? (task = action.payload) : task
        // ),

        isTaskCompleted: true,
      };

    default:
      return state;
  }
}
