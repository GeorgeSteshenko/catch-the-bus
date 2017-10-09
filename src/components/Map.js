import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox, InfoWindow } from 'react-google-maps';

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            center: this.props.center,
            showingInfoWindow: true,
            activeMarker: false
        };

        this.onPlacesChanged = this.onPlacesChanged.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    }

    componentWillReceiveProps = (props) => {
        this.setState({ center: props.center })
    }

    onPlacesChanged() {
        const places = this.refs.searchBox.getPlaces();

        const lat = places[0].geometry.location.lat();
        const lng = places[0].geometry.location.lng();

        this.setState({ center: {lat, lng} });
        this.props.changeCenter(lat, lng);
    }

    onMarkerClick = (i) => {
        this.setState({
            activeMarker: i
        });
    }

    onInfoWindowClose = () => {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    }

    render(){
        const inputStyle = {
            "width": "300px",
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

            return <Marker
                        icon={'https://www.westsiderentals.com/images/2016/icons/pin-listingicon.png'}
                        key={i}
                        {...marker}
                        onClick={() => this.onMarkerClick(i)}
                    >
                    {this.state.activeMarker === i &&
                        <InfoWindow
                            marker={this.state.activeMarker}
                            onClose={this.onInfoWindowClose}
                            visible>
                            <div>
                                <h2 className="marker-title">{stops.name}</h2>
                            </div>
                        </InfoWindow>
                    }
                    </Marker>
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
                            placeholder="Search Address"
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
