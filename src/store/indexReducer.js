import { combineReducers } from "redux";
import * as reducer from "./reducers";

const reducers = combineReducers({
  mode: reducer.uiReducer,
  template: reducer.templateReducer,
});

export default reducers;
