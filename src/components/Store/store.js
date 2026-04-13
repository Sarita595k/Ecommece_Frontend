import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productDetailsReducer, productReducer } from '../Reducers/productReducers'; // Adjust path as needed

// 1. Combine all reducers into one root reducer
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer
    // You can add more reducers here (e.g., cart: cartReducer)
});

// 2. Initial state for the entire store
let initialState = {};

// 3. Middleware (Thunk allows us to return functions in actions)
const middleware = [thunk];

// 4. Create the store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;