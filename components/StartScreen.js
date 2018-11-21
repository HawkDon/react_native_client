import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

class StartScreen extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
            <Text style={styles.paragraph}>In order to user our app, you will have to login</Text>
            <View style={{ margin: 20 }}>
            <Button
            onPress={() => navigate("Login")}
            title="Login"
            />
            </View>
            <View style={{ margin: 20 }}>
            <Button
            onPress={() => navigate("Register")}
            title="Register"
            />
            </View>
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
        padding: 20,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    }
});


export default StartScreen;