import React, { Component } from "react";
import CustomChatBot from "./CustomChatbot";
import GoogleMapComponent from "./GoogleMapComponent";

class MapComponent extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    clickEventHandler = redirect_link => {
        if (redirect_link === "home") 
        {
            this.props.history.push('/home')
        } 
        else if (redirect_link === "account") 
        {
            this.props.history.push('/map')
        } 
        else if (redirect_link === "bookmark") 
        {
            this.props.history.push('/home')
        }
        else 
        {
            this.props.history.push('/home')
        }   
    };

    render() {
        return (
            <div>
                <div className="TouristApp">
                    <h1>Map</h1>
                    <GoogleMapComponent />
                </div>
                <CustomChatBot eventHandler={this.clickEventHandler} />
            </div>   
        )
    }
}

export default MapComponent;