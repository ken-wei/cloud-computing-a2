import React, { Component } from "react";
import BookmarkService from "../api/BookmarkService";
import AuthenticationService from "../api/AuthenticationService";
import { Card, CardGroup } from 'react-bootstrap'
import '../css/Bookmark.css'


class BookmarkComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookmarks: [],
        }
    }
    
    /** After mounting get all bookmarks of the current user */
    componentDidMount() {
        BookmarkService.getBookmarks(AuthenticationService.getCurrentUser())
        .then(
            response => {

                // Convert the json data into an array to use map
                var bookmarks = Object.keys(response.data).map(
                    (key) => response.data[key]
                );

                /** Request the details regarding each bookmark from Places Library */
                for (var i = 0; i < bookmarks.length; ++i) {
                    this.placeDetailsRequest(bookmarks[i]);
                }

                this.setState({ bookmarks: bookmarks })
            }
        )
    }
 
    /** Delete Bookmark by sending a delete request to the backend server- Bookmark-API */
    handleDelete = (placeID, event) => {
        /** Prevent the default behavior of button click */
        event.preventDefault();
        /** Delete the bookmark by sending a delete request to the backend */
        BookmarkService.removeBookmark(AuthenticationService.getCurrentUser(), placeID)
        .then(
            response => {
                /**
                 * When some bookmark is deleted rerender the page with the new update bookmark list
                 * From the backend Bookmark-API 
                 * */ 
                BookmarkService.getBookmarks(AuthenticationService.getCurrentUser())
                .then(
                    response => {

                        var bookmarks = Object.keys(response.data).map(
                            (key) => response.data[key]
                        );

                        /** Request the details regarding each bookmark from Places Library */
                        for (var i = 0; i < bookmarks.length; ++i) {
                            this.placeDetailsRequest(bookmarks[i]);
                        }

                        this.setState({bookmarks: bookmarks})

                    }
                )
            }  
        )
    }

    placeDetailsRequest = (bookmark) => {
        
        // The service to request places' details from google map places API
        var service = new window.google.maps.places.PlacesService(document.createElement('div'));

        var request = {
            placeId: bookmark.placeID,
        }
        
        service.getDetails(request, (result, status) => this.callback(result, status, bookmark) )
        
    }

    callback = (place, status, bookmark) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            /** Update the state based on the request received */
            this.setState(prevState => ({
                
                bookmarks: prevState.bookmarks.map(
                    bookmark => bookmark.placeID === place.place_id 
                    ?   {
                            ...bookmark, 
                            address: place.formatted_address,
                            photoUrl: place.photos[0].getUrl({maxWidth: 2000, maxHeight: 2000}),
                        } 
                    : bookmark 
                )
            }))
        } else if (status === window.google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
            setTimeout(() => {
                this.placeDetailsRequest(bookmark);
            }, 300);
        }   
    }

    render() {

        return(
            <div className="bookmark-container">
                <h5 className="display-5 jumbotron">
                        Bookmarks
                    </h5>
                <CardGroup className="bookmark-carddeck">
                    {
                        this.state.bookmarks.map((bookmark, index) =>
                            
                            <Card key={index}>
                                <Card.Img variant="top" src={bookmark.photoUrl} />
                                <Card.Body>
                                    <Card.Title>{bookmark.placeName}</Card.Title>
                                    <Card.Text>
                                        Address: <i className="fas fa-map-marker-alt"></i> {bookmark.address}
                                    </Card.Text>
                                    <Card.Text>
                                        Rating: <i className="fas fa-star"></i> {bookmark.rating}
                                    </Card.Text>
                                    <Card.Text>
                                        <i className="fas fa-star-half-alt"></i>Total Ratings: {bookmark.totalRatings}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <button className="btn btn-danger delete-bookmark" onClick={this.handleDelete.bind(this, bookmark.placeID)}>
                                        Remove
                                    </button>
                                </Card.Footer>
                            </Card>

                        )
                    }
                </CardGroup>

            </div>
        )
    }
}

export default BookmarkComponent;