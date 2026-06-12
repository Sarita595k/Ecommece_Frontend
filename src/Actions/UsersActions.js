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

// Load User Action (Checks if user is logged in)
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        // This route looks at your browser cookies for the JWT token
        const { data } = await axios.get('/api/user/me', { withCredentials: true });
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.errMessage || "Login to continue"
        });
    }
};

// Login Action (To replace the fetch in your Login component)
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post('/api/user/login', { email, password }, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.errMessage
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};

// Logout User Action
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/user/logout', { withCredentials: true });

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.errMessage || "Failed to logout"
        });
    }
};