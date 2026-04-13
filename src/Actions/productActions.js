import axios from "axios";
// Import your constants so they aren't 'undefined'
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL
} from "../Constants/productConstants";

export const getProducts = (currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`/api/products?page=${currentPage}`);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data // This sends the whole response object to the reducer
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            // This targets the message sent by your Express error handler
            payload: error.response?.data?.message || error.message || "Server Error"
        });
    }
};

export const productDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data.product // This sends the whole response object to the reducer
        });
    } catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            // This targets the message sent by your Express error handler
            payload: error.response?.data?.message || error.message || "Server Error"
        });
    }
};

// Simplified Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};