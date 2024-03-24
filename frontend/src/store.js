import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productReducer} from "./reducers/productReducer";

const rootReducer = combineReducers({
  products: productReducer, // Combine multiple reducers here if needed
});

const initialState = {
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
