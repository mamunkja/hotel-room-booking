import React, { Component } from "react";
import { Input } from "reactstrap";

class RoomBooked extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const rooms = this.props.rooms.map(item => {
            if (this.props.booked.indexOf(item) !== -1) {
                return (
                    <option disabled key={item} color="danger" >{item}</option>
                )
            } else {
                return (
                    <option key={item} color="primary" style={{ backgroundColor: "rgb(193, 224, 138)" }}>{item}</option>
                )
            }
        })
        return (
            <div>
                <Input type="select" name="roomNo" style={{ width: "30%" }}
                    onChange={this.props.onChange} >
                    <option key={Math.random()} value="">Select a Room</option>
                    {rooms}
                </Input>
            </div>
        )
    }
}

export default RoomBooked;