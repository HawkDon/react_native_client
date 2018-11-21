import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import FetchFacade from '../rest/FetchFacade';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password: t.String,
});

class Login extends Component {

    state = {
        errorMessage: null
    }

    handleLogin = async () => {

        // Get Form data
        const struct = this.refs.form.getValue();
        if (struct) {
            // Convert t-comb to a normal object and send it to node
            const user = {
                username: struct.username,
                password: struct.password,
            }
            // Get location
            const location = await this.getGeoLocation();
            const locationObject = JSON.parse(location);

            // Create our jsonPackage
            const jsonPackage = {
                user,
                latitude: locationObject.latitude,
                longitude: locationObject.longitude,
            }

            // Backend call
            const response = await FetchFacade.login(jsonPackage);

            if (response.error) {
                this.setState({
                    errorMessage: response.status
                })
            } else {
                const { navigate } = this.props.navigation;
                navigate('Home', {response: response});
            }
        }
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
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>Login</Text>
                {this.state.errorMessage ? <Text style={styles.paragraph}>{this.state.errorMessage}</Text> : null}
                <Form
                    ref="form"
                    type={User}
                />
                <Button
                    title="Submit"
                    onPress={this.handleLogin}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    }
});

export default Login;