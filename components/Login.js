import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password: t.String,
});

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>Login</Text>
                <Form type={User} />
                <Button
                    title="Submit"
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