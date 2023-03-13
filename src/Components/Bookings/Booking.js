import React from "react";

const Booking = props => {
    return (
        <div style={{
            boxShadow: "4px 2px olive",
            borderRadius: "20px",
            padding: "10px",
            marginBottom: "10px"
        }} >
            <p>Room No: {props.booking.roomNo} </p>
            Room Name: {props.booking.roomName} <br />
            Room Type: {props.booking.roomType} <br />
            <p>Maximum Accomodation: {props.booking.maxAccom} Persons</p>
            <p><strong>Rate (Per night): {props.booking.price} BDT</strong></p>
        </div>
    )
}

export default Booking;