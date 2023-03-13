import React, { Component } from "react";
import { Alert, Button, Card, CardBody, CardText, CardTitle, Form, FormGroup, Input, Label } from "reactstrap";
import { bookRoom } from "../../redux/actionCreators";
import { connect } from "react-redux";
import RoomBooked from "./RoomBooked";

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token,
        bookings: state.bookings,
        bookingErr: state.bookingErr,
        bookingsMsg: state.bookingsMsg,
        bookingSuccess: state.bookingSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        bookRoom: (room, token, userId) => dispatch(bookRoom(room, token, userId)),
    }
}

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomNo: "",
            isOpen: false
        };
    }

    handleSubmit = (event) => {
        if (event.target.roomNo.value !== "") {
            let category = { ...this.props.category, roomNo: event.target.roomNo.value };
            this.props.bookRoom(category, this.props.token, this.props.userId);
            this.setState({
                isOpen: true
            })
            setTimeout(() => {
                this.setState({
                    isOpen: false
                })
            }, 4000);
        }
        event.preventDefault();
    }

    changeValue = event => {
        this.setState({
            roomNo: event.target.value
        })
    }

    render() {
        const category = this.props.category;
        let bookRoomBtn = null;

        if (this.props.token !== null) {
            bookRoomBtn = <Button type="submit" color="success" style={{ marginTop: "5px", textAlign: "right" }}>Book The Room</Button>;
        }
        else {
            bookRoomBtn = <Button disabled className="btn btn-general" style={{ marginLeft: "50px" }}>Login First</Button>;
        }

        let error = null;
        let success = null;
        if (this.props.bookingErr) {
            error = <Alert isOpen={this.state.isOpen} color="danger">{this.props.bookingsMsg}</Alert>;
        } else if (this.props.bookingSuccess) {
            success = <Alert isOpen={this.state.isOpen} color="success">{this.props.bookingsMsg}</Alert>;
        }


        return (
            <div style={{ width: "100%", display: "inline-block" }}>
                {error}
                {success}
                <Card style={{ margin: "4px", }}>
                    <CardBody>
                        <CardTitle>
                            <strong style={{ textDecoration: "underline" }}>{category.roomName}</strong>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="roomNo">Select Room No.
                                        <span style={{ color: "red" }}>(Already booked rooms can not be selected!)</span></Label>
                                    <RoomBooked booked={this.props.booked} rooms={category.roomNo}
                                        inputValue={this.state.roomNo}
                                        onChange={this.changeValue} />
                                    {bookRoomBtn}
                                </FormGroup>
                            </Form>
                        </CardTitle >
                        <CardText>
                            Room Type: {category.type}
                        </CardText>
                        <CardText>
                            Maximum Accomodation: {category.maxAccom}
                        </CardText>
                        <CardText>
                            Price: {category.price}
                        </CardText>
                        <CardText style={{ textAlign: "justify" }}>
                            {category.description}
                        </CardText>
                    </CardBody>
                </Card>
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);