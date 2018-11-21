import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import FetchFacade from '../rest/FetchFacade';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
        message: null
    }

    handleRegister = async () => {
        const struct = this.refs.form.getValue();
        if (struct) {
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
                message,
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>Register</Text>
                {this.state.message ?
                    this.state.message.error ? (
                        <Text style={styles.paragraphRed}>{this.state.message.status}</Text>
                    ) : (
                            <Text style={styles.paragraphGreen}>{this.state.message.status}</Text>
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
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#008000',
    },
    paragraphRed: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ff0000',
    }
});

export default Register;