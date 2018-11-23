import React, { Component } from 'react';
import { MapView } from 'expo';
import FetchFacade from '../rest/FetchFacade';

export default class GoogleMap extends Component {

    state = {
        friends: [],
    }

    async componentDidMount() {
        const { username } = this.props;
        const friends = await FetchFacade.getAllFriends({ username: username });
        this.setState({
            friends
        })
    }

    async componentDidUpdate(prevProps) {
        if (!this.props.didSearch) {
            if (prevProps.latitude !== this.props.latitude || prevProps.longitude !== this.props.longitude) {
                const friends = await FetchFacade.getAllFriends({ username: this.props.username });
                this.setState({
                    friends,
                })
            }
        }
    }

    render() {
        const { latitude, longitude, username, didSearch, friendResponse } = this.props;
        const { friends } = this.state;
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
                    key={0}
                    coordinate={{ latitude: latitude, longitude: longitude }}
                    title={username}
                />

                {didSearch ? friendResponse.map((friend, index) => (
                    <MapView.Marker
                        key={index + 1}
                        coordinate={{ longitude: friend.position[0], latitude: friend.position[1] }}
                        title={friend.user}
                        pinColor='blue'
                    />
                )) : friends.map((friend, index) => (
                    <MapView.Marker
                        key={index + 1}
                        coordinate={{ longitude: friend.position[0], latitude: friend.position[1] }}
                        title={friend.user}
                        pinColor='blue'
                    />
                ))}
            </MapView>
        );
    }
}