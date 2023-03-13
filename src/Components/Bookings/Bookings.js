import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBookings } from "../../redux/actionCreators";
import Spinner from "../Spinner/Spinner";
import Booking from "./Booking";

const mapStateToProps = (state) => {
    return {
        bookings: state.bookings,
        bookingsLoading: state.bookingsLoading,
        bookingErr: state.bookingErr,
        token: state.token,
        userId: state.userId,
        email: state.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookings: (token, userId) => dispatch(fetchBookings(token, userId))
    }
}

class Bookings extends Component {
    componentDidMount() {
        this.props.fetchBookings(this.props.token, this.props.userId);
    }

    render() {
        let bookings;
        let totalPrice = 0;
        if (this.props.bookingErr) {
            bookings = (<p style={{
                bbooking: "1px solid grey",
                bbookingRadius: "5px",
                padding: "10px",
                marginRight: "10px",
            }}> Sorry Failed to load Bookings!</p>);
        } else {
            if (this.props.bookings.length === 0) {
                bookings = (<p style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: "10px",
                    marginRight: "10px",
                    backgroundColor: "cream"
                }}> You have no booking!</p>);
            } else {
                bookings = this.props.bookings.map(booking => {
                    totalPrice += parseInt(booking.price);
                    return (
                        <Booking booking={booking} key={Math.random()} />
                    )
                })
            }
        }

        return (
            <div>
                <span style={{ backgroundColor: "rgb(214, 250, 206)" }}>
                    User Email: <strong style={{ textDecoration: "underline", color: "olive" }}>{this.props.email}</strong>
                    <br />
                    Total Room Cost: <strong style={{ fontWeight: "bold", color: "red" }}>{totalPrice} BDT</strong>
                </span>
                <hr />
                <div style={{ fontSize: "20px", textDecoration: "underline", textAlign: "center", fontWeight: "bold" }}>My Bookings</div>
                {this.props.bookingsLoading ? <Spinner /> : bookings}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);