import React, { Component } from 'react';
import { MapView } from 'expo';

export default class GoogleMap extends Component {

    render() {
        const { latitude, longitude } = this.props;
        return (
            <MapView
                style={{ height: 400, width: 400 }}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
            >
                <MapView.Marker
                    key={1}
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={"Some Title"}
                    description={"Hello world"}
                />
            </MapView>
        );
    }
}