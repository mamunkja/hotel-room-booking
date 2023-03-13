import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
    bookings: [],
    bookingsLoading: true,
    bookingsMsg: null,
    bookingSuccess: false,
    bookingErr: false,
    token: null,
    email: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
    categoryLoading: null,
    categoryErr: null
}

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CATEGORIES_LOADING:
            return {
                ...state,
                categoryLoading: true,
                categoryErr: null,
                categories: []
            }
        case actionTypes.LOAD_CATEGORIES:
            return {
                ...state,
                categoryLoading: false,
                categoryErr: null,
                categories: action.payload
            }
        case actionTypes.CATEGORIES_FAILED:
            return {
                ...state,
                categoryLoading: false,
                categoryErr: action.payload,
                categories: []
            }
        case actionTypes.BOOK_ROOM:
            return {
                ...state,
                bookingErr: false,
                bookingSuccess: true,
                bookingsMsg: "You have booked the room successfully. Please see in 'bookings' menu!",
            }
        case actionTypes.LOADING_BOOKINGS:
            return {
                ...state,
                bookingsLoading: true,
                bookings: []
            }
        case actionTypes.LOAD_BOOKINGS:
            const bookings = [];
            for (let key in action.payload) {
                bookings.push(action.payload[key]);
            }
            return {
                ...state,
                bookings: bookings,
                bookingsLoading: false,
                bookingErr: false,
                bookingSuccess: false,
            }
        case actionTypes.BOOKING_LOAD_FAILED:
            return {
                ...state,
                bookingErr: true,
                bookingsLoading: false,
                bookingsMsg: action.payload,
                bookingSuccess: false,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                email: action.payload.email,
                authFailedMsg: null,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                authFailedMsg: null
            }
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
                bookingErr: false,
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload
            }
        default:
            return state;
    }
}