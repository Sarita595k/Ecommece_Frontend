import axios from 'axios';
import {
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../Constants/UserConstant';

// Use your environment variable if you aren't relying on a local dev proxy configuration
const API_URL = import.meta.env.VITE_URL || "";

// Load User Action (Checks if user is logged in via cookie)
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        // withCredentials ensures the browser sends the HTTP-Only cookie along with the request
        const { data } = await axios.get(`${API_URL}/api/user/me`, { withCredentials: true });

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response?.data?.errMessage || "Login to continue"
        });
    }
};

// Login Action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true // CRITICAL: Allows Axios to accept and store cookies from backend
        };

        const { data } = await axios.post(`${API_URL}/api/user/login`, { email, password }, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response?.data?.errMessage || "Invalid Credentials"
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// Logout User Action
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${API_URL}/api/user/logout`, { withCredentials: true });
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response?.data?.errMessage || "Failed to logout"
        });
    }
};