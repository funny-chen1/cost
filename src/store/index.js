// store.js
import { createStore, combineReducers } from "redux";
import Reducer from "./userReducer/index";
const rootReducer = combineReducers({
  data: Reducer,
  // other reducers...
});
const store = createStore(rootReducer);

export default store;
