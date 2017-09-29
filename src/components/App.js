import React from 'react';
import Map from './Map';
import Places from './Places';
import superagent from 'superagent';

class App extends React.Component {
    constructor() {
        super();

        this.getBusStations = this.getBusStations.bind(this);

        // getinitialstate
        this.state = {
            center: {},
            defaultCenter: {
                lat: 51.501737,
                lng: -0.108588
            },
            location: {},
            stops: []
        }
    }

    componentDidMount() {
        this.getBusStations(51.501737, -0.108588);
    }

    getBusStations(lat, lng) {
        const ROOT_URL = 'https://transportapi.com/v3/uk/bus/stops/near.json?';
        const API_KEY = 'a77967152dbe221695eb44eeb9530085';
        const APP_ID = '0100c952';
        const POSITION = `lat=${lat}&lon=${lng}`;

        const url = `${ROOT_URL}${POSITION}&api_key=${API_KEY}&app_id=${APP_ID}`;
        // superagent lib
        superagent
            .get(url)
            .query(null)
            .set('Accept', 'text/json')
            .end((error, response) => {

                const stops = response.body.stops;

                this.setState({
                    stops,
                    defaultCenter: {
                        lat: lat,
                        lng: lng
                    }
                 })
            })
    }

    render() {

        return (
            <div>
                {/* <h1>Cath the Bus!</h1> */}
                <div className="map-wrapper">
                    <Map
                        center={this.state.defaultCenter}
                        markers={this.state.stops}
                    />
                </div>
                <Places
                    stops={this.state.stops}
                />
            </div>
        )
    }
}

export default App;
