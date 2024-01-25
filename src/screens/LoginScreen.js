import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';

const LOGO = '../../assets/logo.png';
const APP_NAME = "HyperGrowth";
const LOG_IN = 'login';
const NO_ACCOUNT_MSG = "No Account?"
const SIGN_UP_BUTTON_TITLE = "Sign Up!"
const EMAIL = "email";
const PASSWORD = "password";

const LoginScreen = (props) => {
    const { state, signIn, clearErrorMessage } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillFocus={() => { clearErrorMessage() }}
            />

            <Image
                style={styles.image}
                source={require(LOGO)}
            />

            <Text style={styles.appNameText}> {APP_NAME}</Text>

            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder={EMAIL}
                    value={email}
                    onChangeText={(newText) => { setEmail(newText) }}
                />

                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder={PASSWORD}
                    value={password}
                    onChangeText={(newText) => { setPassword(newText) }}
                />
            </View>

            {state.errorMessage ? <Text style={styles.errorText}> {state.errorMessage}</Text> : null}

            <View style={styles.loginButtonContainer}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => { signIn({ email, password }) }}
                >
                    <Text style={styles.loginButtonTitle}>{LOG_IN}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.noAccountText}>{NO_ACCOUNT_MSG}</Text>

            <TouchableOpacity
                onPress={() => { props.navigation.navigate("SignUp") }}
            >
                <Text style={styles.signUpText}>{SIGN_UP_BUTTON_TITLE}</Text>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },

    image: {
        width: 100,
        height: 100,
        alignItems: 'center',
        marginLeft: 167,
        marginTop: 20,
        marginBottom: 40,
    },

    appNameText: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 70,
    },

    loginButtonContainer: {
        paddingHorizontal: 120,
    },

    textInputContainer: {
        alignItems: 'center',
    },

    textInput: {
        fontSize: 30,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 30,
        paddingVertical: 10,
        width: 350,
    },

    loginButton: {
        borderWidth: 1,
        borderColor: 'black',
    },

    loginButtonTitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10,
    },

    noAccountText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40,
    },

    signUpText: {
        fontSize: 20,
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },

    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
    },
});

export default LoginScreen;
