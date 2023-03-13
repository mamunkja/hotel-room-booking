import React, { Component } from "react";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { fetchAllBookings, fetchCategories } from "../../redux/actionCreators";
import Spinner from "../Spinner/Spinner";
import Rooms from '../../assets/rooms';
import CategoryItem from "./CategoryItem";
import { authCheck } from "../../redux/authActionCreators";

const mapStateToProps = state => {
    return {
        categories: state.categories,
        bookings: state.bookings,
        token: state.token,
        categoryLoading: state.categoryLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchAllBookings: (token) => dispatch(fetchAllBookings(token)),
    }
}

class Gallery extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchCategories();
        if (this.props.token !== null || localStorage.getItem("token") !== null) {
            this.props.fetchAllBookings(localStorage.getItem("token"));
        }
    }

    render() {
        document.title = "Rooms Category";
        let categoryItems = null;

        if (this.props.categoryLoading) {
            return <Spinner />;
        }

        let error = null;
        if (this.props.bookingErr) {
            error = <Alert isOpen={this.state.isOpen} color="danger">{this.props.bookingsMsg}</Alert>;
        }

        let booked = [];
        if (this.props.token !== null) {
            if (this.props.bookings.length !== 0) {
                booked = this.props.bookings.map(item => {
                    return parseInt(item.roomNo);
                })
            }
        }

        if (Rooms !== null) {
            categoryItems = Rooms.map(item => {
                return (
                    <CategoryItem key={item.id} category={item}
                        bookings={this.props.bookings} booked={booked} />
                )
            });
        }

        return (
            <div className="container" >
                <div className="row">
                    {error}
                    <span style={{ marginLeft: "10px", fontWeight: "bold" }}>Choose Your Room</span>
                    <div className="col-12 col-md-12 col-sm-4">
                        {categoryItems}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);