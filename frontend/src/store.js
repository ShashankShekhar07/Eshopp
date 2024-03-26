import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productDetailsReducer, productReducer} from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  products: productReducer, // Combine multiple reducers here if needed
  productDetails: productDetailsReducer,
  user: userReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
