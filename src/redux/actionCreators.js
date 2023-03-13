import * as actionTypes from './actionTypes';
import Rooms from '../assets/rooms';
import axios from 'axios';

export const bookRoom = (room, token, userId) => dispatch => {
    const roomInfo = {
        roomName: room.roomName,
        roomType: room.type,
        maxAccom: room.maxAccom,
        price: room.price,
        roomNo: room.roomNo,
        orderTime: Date(),
        userId: userId
    };
    //const queryParams = '&bookingBy="userId"&equalTo="' + userId + '"';
    axios.post('https://hotel-room-booking-e3fe0-default-rtdb.asia-southeast1.firebasedatabase.app/bookings.json?auth=' + token, roomInfo)
        .then(response => dispatch({
            type: actionTypes.BOOK_ROOM,
            payload: room,
        }))
        .catch(err => dispatch(bookingLoadFailure(err.message)));
}

export const loadingBookings = () => ({ type: actionTypes.LOADING_BOOKINGS });

export const loadBookings = bookings => {
    return {
        type: actionTypes.LOAD_BOOKINGS,
        payload: bookings
    }
}

export const bookingLoadFailure = (errMsg) => {
    return {
        type: actionTypes.BOOKING_LOAD_FAILED,
        payload: errMsg
    }
}

export const categoriesLoading = () => ({ type: actionTypes.CATEGORIES_LOADING });

export const categoriesFailed = (errMessage) => ({
    type: actionTypes.CATEGORIES_FAILED,
    payload: errMessage
})

export const fetchCategories = () => dispatch => {
    dispatch(categoriesLoading());
    dispatch({
        type: actionTypes.LOAD_CATEGORIES,
        payload: Rooms,
    });
}

export const fetchBookings = (token, userId) => dispatch => {
    dispatch(loadingBookings(true));
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://hotel-room-booking-e3fe0-default-rtdb.asia-southeast1.firebasedatabase.app/bookings.json?auth=' + token + queryParams)
        .then(response => {
            if (response.status == 200) {
                dispatch(loadingBookings(false));
                dispatch(loadBookings(response.data));
            }
        }
        )
        .catch(err => dispatch(bookingLoadFailure(err.message)));
}

export const fetchAllBookings = token => dispatch => {
    axios.get('https://hotel-room-booking-e3fe0-default-rtdb.asia-southeast1.firebasedatabase.app/bookings.json?auth=' + token)
        .then(response => dispatch(loadBookings(response.data)))
        .catch(err => dispatch(bookingLoadFailure(err.message)));
}