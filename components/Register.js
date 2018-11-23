import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native';
import FetchFacade from '../rest/FetchFacade';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
    firstname: t.String,
    lastname: t.String,
    username: t.String,
    password: t.String,
    email: t.String,
});

class Register extends Component {

    state = {
        message: null,
        processing: false,
    }

    handleRegister = () => {
        const struct = this.refs.form.getValue();
        if (struct) {
            this.setState({
                processing: true,
                message: null,
            }, async () => {
                // Convert t-comb to a normal object and send it to node
                const user = {
                    firstname: struct.firstname,
                    lastname: struct.lastname,
                    username: struct.username,
                    password: struct.password,
                    email: struct.email,
                }
                const message = await FetchFacade.register(user);
                this.setState({
                    processing: false,
                    message,
                })
            })
        }
    }

    render() {
        const { message, processing } = this.state;
        return (
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} behavior="padding" enabled keyboardVerticalOffset={100}>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.paragraph}>Register</Text>
                        {processing ? <ActivityIndicator size="large" color="#00ff00" /> : null}
                        {message ?
                            message.error ? (
                                <Text style={styles.paragraphRed}>{message.status}</Text>
                            ) : (
                                    <Text style={styles.paragraphGreen}>{message.status}</Text>
                                ) : (
                                null
                            )
                        }
                        <Form
                            ref="form"
                            type={User}
                        />
                        <Button
                            title="Submit"
                            onPress={this.handleRegister}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    },
    paragraphGreen: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#008000',
    },
    paragraphRed: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ff0000',
    }
});

export default Register;