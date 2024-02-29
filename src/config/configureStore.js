import { createStore, combineReducers } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";

const reduxStore = createStore(
  combineReducers({
    ...reducers,
  })
);

export default reduxStore;
