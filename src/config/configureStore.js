import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";

const reduxStore = createStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(thunk)
);

export default reduxStore;
