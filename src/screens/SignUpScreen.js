import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputBox from '../components/InputBox';

const TITLE = "Register";

const SignUpScreen = () => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>{TITLE}</Text>

            <View style = {styles.rowContainer}>
                <InputBox
                    style = {styles.InputBoxOne}
                    backGroundText = "First Name"
                />

                <InputBox
                    style = {styles.InputBox2}
                    backGroundText = "Last Name"
                />  
            </View>

            <View>
                <InputBox
                    backGroundText = "email"
                />
                <InputBox
                    backGroundText = "password"
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create ({
    container: {
        
    },

    title: {
        textAlign: 'center',
        fontSize: 50,
        marginTop: 30,
        marginBottom: 90
    },

    rowContainer:{
        flexDirection: 'row',
        marginHorizontal: -30,
        alignContent: 'stretch'
    },




});

export default SignUpScreen;