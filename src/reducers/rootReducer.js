/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2020-11-06 14:45:13
 * @modify date 2021-03-06 22:56:18
 * @desc [Root Reducer - combine task, user, UI reducers]
 */
// redux import
import { combineReducers } from "redux";

// reducers import

import userReducer from "./userReducer";
import uiReducer from "./uiReducer";
import tasksReducer from "./tasksReducer";

// combine the reducers and export it
export default combineReducers({
  user: userReducer,
  UI: uiReducer,
  task: tasksReducer,
});
