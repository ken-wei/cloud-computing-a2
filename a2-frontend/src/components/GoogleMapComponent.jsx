import React, { Component } from "react";
import { Map, Marker } from 'google-maps-react';



const mapStyles = {
    position: 'static',
    width: '90vw',
    height: '40vh',
    margin: 0,
    padding: 0,
    left: '0',
    right: '0'
};

const containerStyle = {
    position: 'static',  
    width: '90vw',
    height: '40vh'
  }


class GoogleMapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { userLocation: { lat: -37.840935, lng: 144.946457 },
                       loading: true,
                       prevCoor: {lat: null, lng: null},
                       nearbyPlaces: null, 
                    };
    }

    componentDidMount(props) {
        // Check if the geolocation has been set
        if (navigator.geolocation) 
        {
            navigator.geolocation.getCurrentPosition (
                position => {
                    // Set up the lattitude and longitude from the geoleocation
                    const { latitude, longitude } = position.coords;

                    this.setState({
                        userLocation: { lat: latitude, lng: longitude },
                        loading: false,
                    });
                }
            );
        }
        // If no location has been shared 
        if (this.state.loading)
        {
            // Else set a default initial center for the map
            this.setState({
                userLocation: { lat: -37.840935, lng: 144.946457 },
                loading: false
            });
        }   
    }

    callback = (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          this.props.handlePlacesFound(results);
          this.setState({ nearbyPlaces: results })
        } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            this.props.handlePlacesFound(results);
        }
    }

    componentWillReceiveProps(props) {
        // If a location has been entered in the search bar
        if (props.coordinates.lat !== null) 
        {
            var userLat= parseFloat(props.coordinates.lat);
            var userLng= parseFloat(props.coordinates.lng);
            var request = {
                location: new window.google.maps.LatLng(userLat,userLng),
                radius: '500',
                type: ['tourist_attraction']
            };
            this.state.service.nearbySearch(request, this.callback);
            this.setState({userLocation: props.coordinates, prevCoor : props.coordinates});    
        }
    }

    fetchPlaces = (mapProps, map) => {
        this.setState({service : new window.google.maps.places.PlacesService(map)}) 
    }

    onMapClicked = () => {
    }  

    render () {
        const loading = this.state.loading;
        var userLat  = this.state.userLocation['lat'];
        userLat  = parseFloat(this.state.userLocation['lat']);
        var userLng  = this.state.userLocation['lng'];
        userLng  = parseFloat(this.state.userLocation['lng']);

        // If geolocation has not been provided render default initial center
        if (loading) 
        {
            return null;
        }

        return (
            <div className="google-map" style={{ height: '40vh', width: '90vw'}}>
                <Map 
                    containerStyle={containerStyle}
                    google={window.google} 
                    initialCenter={{ lat: userLat, lng: userLng }}
                    center= {{lat: userLat, lng: userLng}}
                    zoom={15}
                    onClick={this.onMapClicked} 
                    style={mapStyles}
                    onReady={this.fetchPlaces}
                >
                    { this.state.nearbyPlaces !== null 
                        ?   
                            this.state.nearbyPlaces.map( place => 
                                    <Marker key={place.place_id} 
                                        title={place.name}
                                        position={{ 
                                            lat: place.geometry.location.lat(),
                                            lng: place.geometry.location.lng() 
                                        }}
                                    >
                                    </Marker>
                            )
                        :
                        ""
                    }
                    <Marker position={{ lat: userLat, lng: userLng }} title="Your Current location"/>
                </Map>
            </div>
        );
    }
}

export default (GoogleMapComponent)
