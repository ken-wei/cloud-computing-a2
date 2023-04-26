import React, { Component } from "react";
import { Card, CardDeck } from 'react-bootstrap';
import AuthenticationService from "../api/AuthenticationService";
import '../css/TouristSpots.css'
import '../images/no-image.jpg'
import BookmarkService from "../api/BookmarkService";


class TouristSpotsComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touristSpots: null,
            currentCoord: {
                lat: null,
                lng: null
            },
            prevCoordinates: {
                lat: null,
                lng: null
            },
            setPlaces: false,
            showTouristSpots: true,
            placesPhoto: [],
        }
    }

    componentWillReceiveProps(props) {
        // For non zero-results found touristspots
        if (props.places !== null && props.coordinates.lat !== null 
            && JSON.stringify(props.places) !== JSON.stringify(this.state.touristSpots))
        {
            var touristSpots = props.places.length === 0 ? null : props.places;
            this.setState(
                { 
                    touristSpots: touristSpots, 
                    currentCoord: props.coordinates,
                    placesPhoto: this.setPlacePhotosUrl(props.places),
                })
        }
        // For zero-results found touristspots
        else if (props.places !== null && props.coordinates.lat !== null 
                && this.state.currentCoord.lat === props.coordinates.lat 
                && this.state.currentCoord.lng === props.coordinates.lng) 
        {
            // Do nothing
        }
    }

    setPlacePhotosUrl = (places) => {
        var photosUrl = {};
        for (var index = 0; index < places.length; ++index) {
            if (places[index].photos !== undefined) {
                photosUrl[places[index].id] = places[index].photos[0].getUrl({maxHeight: 400, maxWidth: 400});
            } else {
                photosUrl[places[index].id] = "";
            }
        }
        return photosUrl;
    }

    handleToggle = () => {
        if (this.state.currentCoord.lat !== null && this.state.currentCoord.lng !== null) {
            this.setState({ showTouristSpots: !this.state.showTouristSpots });
        }    
    }

    /** Registering new bookmark by sending post request to BookmarkAPI */
    handleBookmark = (spot, event) => {

        var bookmark = {
            userID: AuthenticationService.getCurrentUser(),
            placeID: spot.place_id,
            placeName: spot.name,
            lat: spot.geometry.location.lat(),
            lng: spot.geometry.location.lng(),
            rating: spot.rating,
            totalRatings: spot.user_ratings_total,
            address: spot.vicinity,
        }
        BookmarkService.registerNewBookmark(bookmark)
        .then(
            response => {
            }
        );
    }


    render () {

        return (
            <div className="tourist-container">
                <div className="tourist-title">
                    <h5 className={this.state.showTouristSpots ? "display-5 jumbotron toggleOpen" : "display-5 jumbotron toggleClose" } onClick={this.handleToggle}>
                        Tourist Spots ( 2km ) 
                        {/* {this.state.placeName !== "" ? " (" + this.state.placeName + ")" : "" }  */}
                    </h5>
                </div>
                {/* to toggle open and close to show all touristSpots */}
                { this.state.showTouristSpots 
                    ?
                        <CardDeck className="tourist-carddeck">
                        {/* To display all tourist spots if there's any of them */}
                        { this.state.touristSpots !== null && this.state.showTouristSpots
                            ?   
                                this.state.touristSpots.map((spot) =>
                                <Card key={spot.id}>
                                    <Card.Img variant="top" src={this.state.placesPhoto[spot.id] !== "" ? this.state.placesPhoto[spot.id] : require("../images/no-image.jpg") } />
                                    
                                    {/* Display bookmark button if user is logged in */}
                                    {
                                        AuthenticationService.isUserLoggedIn() 
                                        ? <button className="btn" onClick={this.handleBookmark.bind(this, spot) }>Bookmark</button> 
                                        : <div></div> 
                                    }

                                    <Card.Title variant="top">{spot.name}</Card.Title>

                                    <Card.Body>
                                        
                                        <Card.Text>
                                          <i className="fas fa-star"></i> {spot.rating}
                                        </Card.Text>
                                        <Card.Text>
                                            {spot.name}
                                        </Card.Text>
                                    </Card.Body>
            
                                </Card>
                            ) 
                            :   <div className="spots-not-found">Tourist spots not found</div>}
                        </CardDeck>
                    :
                        <div></div>
                }
            </div>
        );
    }
}

export default TouristSpotsComponents;