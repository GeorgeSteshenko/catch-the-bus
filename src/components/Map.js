import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            center: {
                lat: 51.501737,
                lng: -0.108588
            }
        };

        this.onPlacesChanged = this.onPlacesChanged.bind(this);
    }

    onPlacesChanged() {
        const places = this.refs.searchBox.getPlaces();
        console.log(places);

        const lat = places[0].geometry.location.lat();
        const lng = places[0].geometry.location.lng();

        this.setState({center: {lat, lng}});

        console.log(lat, lng);
    }

    render(){
        const inputStyle = {
            "width": "320px",
            "border": "none",
            "boxShadow": "0 2px 6px rgba(0, 0, 0, 0.3)",
            "fontSize": "16px",
            "padding": "10px 20px",
            "margin": "20px 0 0 20px",
            "textOverflow": "ellipses",
        }

        const mapContainer = <div className="map-container"></div>;

        const markers = this.props.markers.map((stops, i) => {

            const marker = {
                position: {
                    lat: stops.latitude,
                    lng: stops.longitude
                }
            }

            // console.log(marker);

            return <Marker key={i} {...marker} />
        })

        return (
            <GoogleMapLoader
                containerElement={mapContainer}
                googleMapElement={
                    <GoogleMap
                        defaultZoom={15}
                        center={this.state.center}
                        defaultCenter={this.props.defaultCenter}
                        options={{streetViewControl: false, mapTypeControl: false}}>
                        <SearchBox
                            style={inputStyle}
                            controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                            ref="searchBox"
                            onPlacesChanged={this.onPlacesChanged}
                            types='(cities)'
                        />
                        {markers}
                    </GoogleMap>
                }
            />
        )
    }
}

Map.propTypes = {
    center: React.PropTypes.object.isRequired
};

export default Map;
