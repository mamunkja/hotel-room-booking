import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Header from "./Header/Header";
import Bookings from "./Bookings/Bookings";
import { connect } from "react-redux";
import { authCheck } from "../redux/authActionCreators";
import Logout from "./Auth/Logout";
import Gallery from "./RoomBooking/Gallery";
import Footer from "./Footer/Footer";

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.authCheck();
    }

    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (<Routes>
                <Route exact="true" path="/" element={<Gallery />} />
                <Route exact="true" path="/login" element={<Auth />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>);
        } else {
            routes = (<Routes>
                <Route exact="true" path="/bookings" element={<Bookings />} />
                <Route exact="true" path="/" element={<Gallery />} />
                <Route exact="true" path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>);
        }
        return (
            <div>
                <Header />
                <div className="container">
                    {routes}
                </div>
                <Footer />

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);