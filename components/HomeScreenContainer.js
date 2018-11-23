import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button, ScrollView, KeyboardAvoidingView } from 'react-native';
import HomeScreen from './HomeScreen';
import FetchFacade from '../rest/FetchFacade';

class HomeScreenContainer extends Component {

    state = {
        response: {},
        inputValue: "",
        friendResponse: [],
        didSearch: false,
        processing: false,
    }

    componentWillMount() {
        const { response } = this.props.navigation.state.params;
        this.setState({
            response,
        });
    }

    handleSearch = () => {
        // Handle search here
        const { inputValue, response } = this.state;
        const username = response.payload.username
        this.setState({
            processing: true,
        }, async () => {
            const friendResponse = await FetchFacade.getFriendsWithinRange({ username: username, radius: parseInt(inputValue) })
            this.setState({
                friendResponse: friendResponse,
                didSearch: true,
                processing: false,
            })
        })
    }

    handleChange = (value) => {
        this.setState({
            inputValue: value
        })
    }

    changeFriends = (friendResponse) => {
        this.setState({
            friendResponse: friendResponse
        })
    }

    render() {
        const { response, inputValue, friendResponse, didSearch, processing } = this.state;
        return (
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} behavior="padding" enabled keyboardVerticalOffset={100}>
                <ScrollView>
                    <View style={styles.container}>
                        <HomeScreen
                            response={response}
                            friendResponse={friendResponse}
                            didSearch={didSearch}
                            processing={processing}
                            changeFriends={this.changeFriends}
                        />
                        <TextInput
                            placeholder="Type to filter radius(km)"
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                            onChangeText={this.handleChange}
                            value={inputValue}
                        />
                        <Button
                            title="Søg efter venner"
                            onPress={this.handleSearch}
                            style={styles.buttonStyle}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    },
    buttonStyle: {
        margin: 24,
        padding: 24
    }
});

export default HomeScreenContainer;