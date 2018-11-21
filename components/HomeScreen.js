import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Constants } from 'expo';
import GoogleMap from './GoogleMap';

class HomeScreen extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <GoogleMap />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    }
});

export default HomeScreen;