import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import InputBox from '../components/InputBox';

const LOGO = '../../assets/logo.png';
const APP_NAME = "HyperGrowth";
const LOG_IN_BUTTON_TITLE = 'login';
const NO_ACCOUNT_MSG = "No Account?"
const SIGN_UP_BUTTON_TITLE = "Sign Up!"

const LoginScreen = (props) => {
    return (
        <View style = {styles.container}>
            <Image 
                style = {styles.image}
                source = {require(LOGO)}
            />

            <Text style = {styles.appNameText}> {APP_NAME}</Text>

            <InputBox
                backGroundText = 'email'
            />

            <InputBox
                backGroundText = 'password'
            />
            
            <View style = {styles.loginButtonContainer}>
                <TouchableOpacity
                    style = {styles.loginButton}
                    onPress = {() => {props.navigation.navigate("Home")}}
                >
                    <Text style = {styles.loginButtonTitle}>{LOG_IN_BUTTON_TITLE}</Text>
                </TouchableOpacity>
            </View>

            <Text style = {styles.noAccountText}>{NO_ACCOUNT_MSG}</Text>

            <TouchableOpacity
                onPress = {() => {props.navigation.navigate("SignUp")}}
            >
                <Text style = {styles.signUpText}>{SIGN_UP_BUTTON_TITLE}</Text>
            </TouchableOpacity>
            

        </View>
    )
};

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'center'
    },

    image: {
        width: 100,
        height: 100,
        alignItems: 'center',
        marginLeft: 167,
        marginTop: 20,
        marginBottom: 40
    },

    appNameText: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 70
    },

    loginButtonContainer: {
        paddingHorizontal: 120
    },

    loginButton: {
        borderWidth: 1,
        borderColor: 'black',
    },

    loginButtonTitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 5,
    },

    noAccountText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50
    },

    signUpText: {
        fontSize: 20,
        color: 'red',
        marginTop: 10,
        textAlign: 'center'
    }

});

export default LoginScreen;