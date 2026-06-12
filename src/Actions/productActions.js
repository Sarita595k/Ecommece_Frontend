import axios from "axios";
// 1. Added NEW_PRODUCT constants to your imports
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,  // Make sure these are declared in your productConstants.js
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL
} from "../Constants/productConstants";

// Fetch All Products (Public)
export const getProducts = (currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`/api/products?page=${currentPage}`);

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response?.data?.message || error.message || "Server Error"
        });
    }
};

// Fetch Single Product Details (Public)
export const productDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: error.response?.data?.message || error.message || "Server Error"
        });
    }
};

// 2. Added Admin Create Product Action 
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true // Essential for sending admin JWT cookies to your backend
        };

        // This path must match your backend router route (e.g., /api/admin/product/new)
        const { data } = await axios.post(`/api/admin/product/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response?.data?.message || error.message || "Failed to create product"
        });
    }
};

// Simplified Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};