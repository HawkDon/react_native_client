import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Permissions, Location } from 'expo';
import GoogleMap from './GoogleMap';
import FetchFacade from '../rest/FetchFacade';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const inputValue = t.struct({
    inputValue: t.String
});


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        state = {
            response: {},
            watch: false
        }
    }

    componentWillMount() {
        const { response } = this.props;
        this.setState({
            response,
        }, () => {
            // this.tick(response.payload.username);
        })
    }

    tick = (username) => {
        setInterval(async () => {
            const newLocation = await this.getGeoLocation();
            const jsonParseObject = JSON.parse(newLocation);
            const response = await FetchFacade.updateUserPos({ username, longitude: jsonParseObject.longitude, latitude: jsonParseObject.latitude });
            this.setState({
                response,
            })
        }, 3000);
    }



    getGeoLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        // Get initial location
        let location = await Location.getCurrentPositionAsync({});
        return JSON.stringify(location.coords);
    }

    render() {
        const { response } = this.state;
        return (
            <View>
                <Text style={styles.paragraph}>{response.status}</Text>
                <GoogleMap
                    latitude={response.payload.latitude}
                    longitude={response.payload.longitude}
                    username={response.payload.username}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    }
});

export default HomeScreen;