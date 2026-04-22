import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productDetailsReducer, productReducer } from '../Reducers/productReducers'; // Adjust path as needed
import { authReducer } from "../Reducers/UserReducers";

// 1. Combine all reducers into one root reducer (Only do this once!)
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer // This provides the isAuthenticated state globally
});

// 2. Initial state
let initialState = {};

// 3. Middleware
const middleware = [thunk];

// 4. Create the store
const store = createStore(
    reducer, // The combined reducer goes here
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;