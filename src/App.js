import React, {Component} from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootswatch/journal/bootstrap.css";
// import "bootswatch/superhero/bootstrap.css";
import "bootswatch/simplex/bootstrap.css";

import {Col, Grid, Nav, Navbar, NavItem, Row} from "react-bootstrap";

const PLACES_TR = [
    {
        name: "Ankara",
        country: "tr"
    },
    {
        name: "Istanbul",
        country: "tr"
    },
    {
        name: "Adana",
        country: "tr"
    },
    {
        name: "Mersin",
        country: "tr"
    },
    {
        name: "Duzce",
        country: "tr"
    },
];

class WeatherDisplay extends Component {

    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }

    componentDidMount() {
        let buildURLWithNameAndCountryCode = function (city, countryCode) {
            return "http://api.openweathermap.org/data/2.5/weather?q="
                + city
                + ","
                + countryCode
                + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b"
                + "&units=metric";
        };

        const URL = buildURLWithNameAndCountryCode(this.props.cityName, this.props.countryCode);

        fetch(URL)
            .then(res => res.json())
            .then(json => {
                this.setState({weatherData: json});
            });
    }

    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData)
            return <div>Loading</div>;
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
        return (
            <div>
                <h1>
                    {weather.main} in {weatherData.name}
                    <img src={iconUrl} alt={weatherData.description}/>
                </h1>
                <p>Current: {weatherData.main.temp}°</p>
                <p>High: {weatherData.main.temp_max}°</p>
                <p>Low: {weatherData.main.temp_min}°</p>
                <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: 0
        }
    }

    render() {
        const activePlace = this.state.activePlace

        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            React Simple Weather App
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                <Grid>
                    <Row>
                        <Col md={4} sm={4}>
                            <h3>Select a city</h3>
                            <Nav
                                bsStyle="pills"
                                stacked
                                activeKey={activePlace}
                                onSelect={index => {
                                    this.setState({activePlace: index});
                                }}
                            >
                                {
                                    PLACES_TR.map((place, index) => (
                                        <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                                    ))
                                }
                            </Nav>
                        </Col>
                        <Col md={8} sm={8}>
                            <WeatherDisplay key={activePlace}
                                            cityName={PLACES_TR[activePlace].name}
                                            countryCode={PLACES_TR[activePlace].country}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
