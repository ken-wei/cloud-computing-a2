import React, { Component } from "react";
import moment from 'moment'
import { Button, ButtonGroup} from 'react-bootstrap';
import '../css/owfont-regular.css'
import '../css/Weather.css'

const openWeatherApiKey = '991fc40872cc8fda8f0fcfbfd9457db0';

class WeatherComponent extends Component {
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            coordinates: 
            {
                lat: null,
                lng: null,   
            },
            placeName: "",
            responseData: [],
            dailyData: [],
            selectedValue: "today",
            day: "",
            showWeather: true,
        }
    }

    componentDidMount() 
    {
    }

    componentWillReceiveProps(props) 
    {
        if (props.coordinates.lat !== null && props.coordinates.lng !== null)
        {
            this.setState({ coordinates: props.coordinates });
            /**
             * Weather API returns readings every 3 hours for 5 days 
             * Each day consists of 8 objects
             * Total 40 readings in the response data
             * */ 
            const WeatherApiURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${props.coordinates.lat}&lon=${props.coordinates.lng}&units=metric&APPID=${openWeatherApiKey}`; 
            fetch(WeatherApiURL)
            .then(response => response.json())
            .then(data => 
                {
                    // Filter the response data and get only 1 reading from the response
                    // To get today's weather
                    const dailyData = data.list.filter(reading => moment(reading.dt * 1000).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD"))
                    
                    this.setState
                    ({
                        placeName: data.city.name,
                        responseData: data.list,
                        dailyData: dailyData,
                        day: moment().format('dddd'),
                    })
                }    
            )
        } 
    }

    getDate = (readingDt) => {
        let newDate = new Date();
        const weekday = readingDt * 1000
        newDate.setTime(weekday)
        return newDate;
    }

    // Handle the select chosen by user
    handleSelection = (value) => {
        switch(value) 
        {
            case "today":
                return 0;
            case '1day':
                return 1;
            case "2days":
                return 2;
            case "3days":
                return 3;
            case "4days":
                return 4;
            default:
                return 0;
        }
    }

    /**
     * Handle the change on selection tag 
     *  to change the weather based on the days ahead based on forecast
     */
    handleChange = (event) => {
        const dailyData = this.state.responseData.filter(reading => 
            moment(reading.dt * 1000)
            .format("YYYY-MM-DD") === moment().add(this.handleSelection(event.target.value), 'd')
            .format("YYYY-MM-DD"))
        this.setState({ 
            selectedValue: event.target.value, 
            dailyData: dailyData,
            day: moment().add(this.handleSelection(event.target.value), 'd').format('dddd')
         });
        if (this.state.dailyData.length === 0) 
        {
            this.setState({selectedValue: "today"})
        }
    }

    handleToggle = () => {
        // Can only toggle when there's weather data
        if (this.state.responseData.length !== 0) {
            this.setState({ showWeather : !this.state.showWeather })
        }   
    }

    render() 
    {
        return (
            <div className="weather-container">
                <div className="weather-title">
                    <h5 className={this.state.showWeather ? "display-5 jumbotron toggleOpen" : "display-5 jumbotron toggleClose" } onClick={this.handleToggle}>
                        Weather Forecast 
                        {this.state.placeName !== "" ? " (" + this.state.placeName + ")" : "" } 
                    </h5>
                    
                    {/* Toggle to whether show weather or not */}
                    { this.state.showWeather && this.state.responseData.length !== 0
                        ?
                            <ButtonGroup aria-label="Basic example" className="date-buttongroup">
                                <Button variant="dark" className="day-option" value="today" onClick={this.handleChange}>
                                    {/* {moment().add(0, 'd').format("Do MMMM YYYY")} */}
                                    Today
                                </Button>
                                <Button variant="secondary" className="day-option" value="1day" onClick={this.handleChange}>
                                    {moment().add(1, 'd').format("Do MMMM YYYY")}
                                </Button>
                                <Button variant="secondary" className="day-option" value="2days" onClick={this.handleChange}>
                                    {moment().add(2, 'd').format("Do MMMM YYYY")}
                                </Button>
                                <Button variant="secondary" className="day-option" value="3days" onClick={this.handleChange}>
                                    {moment().add(3, 'd').format("Do MMMM YYYY")}
                                </Button>
                                <Button variant="secondary" className="day-option" value="4days" onClick={this.handleChange}>
                                    {moment().add(4, 'd').format("Do MMMM YYYY")}
                                </Button>
                            </ButtonGroup>
                        :
                        <div></div>  
                    }
                </div>
                { this.state.showWeather && this.state.responseData.length !== 0 
                    ? 
                        <div className="weather-readings">
                            {this.state.day !== "" && this.state.placeName !== "" 
                            ? <div className="day-container">{this.state.day}</div> : ""}
                            { 
                                this.state.dailyData.length !== 0 
                                ?   // If a coordinate have been received display weather
                                    
                                    this.state.dailyData.map((reading, index) =>
                                    <div className="weather-card" key={index}>
                                        <div className={index === 0 ? "weather-card-inner-today" : "weather-card-inner"}>
                                            <p className="text-muted">{moment(this.getDate(reading.dt)).format('MMMM Do, h:mm a')}</p>
                                            <i className={`owf owf-${reading.weather[0].id} owf-3x`}></i>
                                            <h4>{Math.round(reading.main.temp)} °C</h4>
                                            <div className="card-body">
                                                <p className="card-text">{reading.weather[0].description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                :
                                    <div className="emptyWeatherData">Enter a location to access weather data ... </div>
                            }
                        </div>
                    : 
                        <div></div>
                
                }
            </div>
        )
    }

}


export default WeatherComponent;