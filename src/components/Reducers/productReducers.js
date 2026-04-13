import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../../Constants/productConstants"; // Adjust the path to your file

const initialState = {
    products: []
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST: // No quotes! It's the variable now.
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage
            };
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

// Initial state for single product should be an empty object
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCTS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PRODUCTS_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload // Usually the backend sends one product object
            };
        case PRODUCTS_DETAILS_FAIL:
            return {
                loading: false, // Set loading to false on failure
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};