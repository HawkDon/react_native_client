import React, { Component } from 'react';
import { MapView } from 'expo';

export default class GoogleMap extends Component {

    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <MapView
                style={{ height: 400, width: 400 }}
                initialRegion={this.state.region}
            >
                <MapView.Marker
                    key={1}
                    coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }}
                    title={"Some Title"}
                    description={"Hello world"}
                />
            </MapView>
        );
    }
}