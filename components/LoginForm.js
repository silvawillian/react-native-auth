import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state; 

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))  
          .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))  
            .catch(this.onLoginFail.bind(this));
          });
    }

    onLoginSuccess() {
        this.setState({ 
            loading: false,
            email: '',
            password: '',
            error: ''
        });
    }

    onLoginFail() {
        this.setState({ 
            error: 'Authentication failed.',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return <Button onPress={this.onButtonPress.bind(this)}>Log In</Button>;
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                      label={'E-mail'}
                      placeholder={'user@gmail.com'}
                      value={this.state.email}
                      onChangeText={email => this.setState({ email })} />
                </CardSection>

                <CardSection>
                    <Input
                      secureTextEntry
                      label={'Password'}
                      placeholder={'password'}
                      value={this.state.password}
                      onChangeText={password => this.setState({ password })} />
                </CardSection>
        
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = { 
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}