import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
            email: email,
        }
    }
}

export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true,
    };
    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const API_KEY = "AIzaSyAog9JA6BkAos2OgP0FhjugwYBqknT4fxg";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            if (response.status === 200) {

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email', authData.email);
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expirationTime', expirationTime); dispatch(authLoading(false));
                dispatch(authSuccess(response.data.idToken, response.data.localId, authData.email));
            }
        })
        .catch(error => {
            dispatch(authLoading(false));
            dispatch(authFailed(error.response.data.error.message));
        })
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout);
    } else {
        const expirationTime = new Date(localStorage.expirationTime);
        if (new Date() >= expirationTime) {
            dispatch(logout);
        } else {
            const userId = localStorage.getItem('userId');
            const email = localStorage.getItem('email');
            dispatch(authSuccess(token, userId, email));
        }
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('email');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg
    }
}