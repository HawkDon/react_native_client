import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';
import GoogleMap from './GoogleMap';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        state = {
            response: {}
        }
    }
    componentWillMount(){
        const { response } = this.props.navigation.state.params;
        this.setState({
            response,
        })
    }

    render() {
        const { response } = this.state;
        console.log(response);
        return (
            <View style={styles.container}>
            <Text style={styles.paragraph}>{response.status}</Text>
                <GoogleMap 
                latitude={response.payload.latitude}
                longitude={response.payload.longitude}
                />
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
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    }
});

export default HomeScreen;