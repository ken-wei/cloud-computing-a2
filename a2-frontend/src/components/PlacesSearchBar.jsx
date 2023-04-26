import React, { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


class PlacesSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '',
                       coordinates: 
                        {
                          lat: null,
                          lng: null 
                        },
                        noMatch: false
                      };
      }
    
      handleChange = async address => {
        this.setState({ address , noMatch:false});
      };


    
      handleSelect = async address => {

        try {
          const results = await geocodeByAddress(address);
          const latLng = await getLatLng(results[0]);
          this.props.handleLocationChange(latLng);
          this.setState({ address, coordinates: latLng, noMatch: false});
        } catch {
          this.setState({ noMatch: true });
        }
        
      };
    
      render() {
        return (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                {/* <p>Latitude: {this.state.coordinates.lat}, Longitude: {this.state.coordinates.lng}</p> */}
                <input
                  {...getInputProps({
                    placeholder: 'Search for a location ...',
                    className: 'search-input',
                    spellCheck: false
                  })}
                />
                <div className="autocomplete-dropdown-container"
                 style={{borderBottomLeftRadius: '10', borderBottomRightRadius: '10'}}>
                  {/* {loading && <div>Loading...</div>} */}
                  {this.state.noMatch && <div style={{backgroundColor: '#363636', color: '#e0e0e0'}}><span>No Match Found</span></div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#737373', cursor: 'pointer' , color: '#e0e0e0'}
                      : { backgroundColor: '#363636', cursor: 'pointer' , color: '#e0e0e0' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          
        );
      }
}

export default PlacesSearchBar;
