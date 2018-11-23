import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import HomeScreen from './HomeScreen';

class HomeScreenContainer extends Component {

    state = {
        response: {}
    }

    componentWillMount() {
        const { response } = this.props.navigation.state.params;
        this.setState({
            response,
        });
    }

    handleSearch = () => {
        // Handle search here
        console.log("Button pressed")
    }

    render() {
        const { response } = this.state;
        return (
            <View style={styles.container}>
                <HomeScreen
                    response={response}
                />
                <TextInput
                    placeholder="Type to filter radius(km)"
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                />
                <Button
                    title="Søg efter venner"
                    onPress={this.handleSearch}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        width: '95%',
        borderColor: 'gray',
        borderWidth: 1,
        margin: 20,
        padding: 5
    }
});

export default HomeScreenContainer;