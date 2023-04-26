import React, { Component } from "react";
import GoogleMapComponent from "./GoogleMapComponent";
import '../css/Home.css'
import PlacesSearchBar from "./PlacesSearchBar";
import TouristSpotsComponents from "./TouristSpotsComponent";
import WeatherComponent from "./WeatherComponent";

class HomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = { coordinates: {lat: null, lng: null},
                       places: null,
                     };
    }

    componentDidMount() {
    }

    handleLocationChange = coordinates => {
        this.setState({ coordinates });
    }

    // Found tourist places and set the state of the Parent (Home)
    handlePlacesFound = places => {

        this.setState({ places });

    }

    clickEventHandler = link => {
        if (link === "home") 
        {
            this.props.history.push('/home')
        } 
        else if (link === "account") 
        {
            this.props.history.push('/map')
        } 
        else if (link === "bookmark") 
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
                <div className="home">

                    <div className="map-sidebar">
                        <PlacesSearchBar handleLocationChange={this.handleLocationChange} />
                    </div>

                    <div className="map-component">
                        <GoogleMapComponent coordinates={this.state.coordinates} handlePlacesFound={this.handlePlacesFound} />
                    </div>

                    <div className="weather-component">
                        <WeatherComponent coordinates={this.state.coordinates} />
                    </div>
                    
                    <div className="tourist-spots-details">
                        <TouristSpotsComponents coordinates={this.state.coordinates} places={this.state.places} />
                    </div>
                    
                    {/* <CustomChatBot/> */}
                </div>
                
            </div>   
        )
    }
}

export default HomeComponent;