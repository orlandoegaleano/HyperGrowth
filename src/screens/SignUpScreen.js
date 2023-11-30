import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext'
import { NavigationEvents } from 'react-navigation';
//import SignInButton from '../components/SignInButton';

import InputBox from '../components/InputBox';

const TITLE = "Register";
const FIRST_NAME = "First Name";
const LAST_NAME = "Last Name";
const EMAIL = "email";
const PASSWORD = "password";
const SIGN_UP = "Sign Up";

const SignUpScreen = () => {
    const {state, signUp, clearErrorMessage} = useContext(AuthContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let ERROR_MSG_TEXT = <Text style = {styles.errorMessage}> {state.errorMessage}</Text>;

    return (
        <View style = {styles.container}>
            <NavigationEvents
                onWillFocus={() => {clearErrorMessage()}}
            />

            <Text style = {styles.title}>{TITLE}</Text>

            <View style = {styles.rowContainer}>
                <TextInput
                    style = {styles.textInputRow}
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    placeholder = {FIRST_NAME}
                    value= {firstName}
                    onChangeText = {(newText) => {setFirstName(newText)}}
                />

                <TextInput
                    style = {styles.textInputRow}
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    placeholder = {LAST_NAME}
                    value= {lastName}
                    onChangeText = {(newText) => {setLastName(newText)}}
                />
                {/* <InputBox
                    style = {styles.InputBoxOne}
                    backGroundText = "First Name"
                    textShowBoolean = {false}
                />

                <InputBox
                    style = {styles.InputBox2}
                    backGroundText = "Last Name"
                    textShowBoolean = {false}
                />   */}
            </View>

            {/* <View>
                <InputBox
                    backGroundText = "email"
                    textShowBoolean = {false}
                />
                <InputBox
                    backGroundText = "password"
                    textShowBoolean = {true}
                />
            </View> */}

            <View style = {styles.textInputContainer}>
                <TextInput
                    style = {styles.textInput}
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    placeholder = {EMAIL}
                    value= {email}
                    onChangeText = {(newText) => {setEmail(newText)}}
                />

                <TextInput
                    style = {styles.textInput}
                    secureTextEntry = {true}
                    autoCapitalize = 'none'
                    autoCorrect = {false}
                    placeholder = {PASSWORD}
                    value = {password}
                    onChangeText = {(newText) => {setPassword(newText)}}
                />
            </View>

            {state.errorMessage ? <Text>{ERROR_MSG_TEXT}</Text> : null}

            {/* <SignInButton
                title = {SIGN_UP}
                onSubmit={({email, password}) => signUp({email, password})}
            >
                
            </SignInButton> */}

            <TouchableOpacity
                style = {styles.signUpButton}
                //onPress = {() => {props.navigation.navigate("Home")}}
                onPress = {() => {signUp({firstName, lastName, email, password})}}
            >
                <Text style = {styles.signUpText}>{SIGN_UP}</Text>
            </TouchableOpacity>
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
        marginBottom: 90,
    },

    rowContainer:{
        flexDirection: 'row',
        //marginLeft: -2,
        //marginHorizontal: -30,
        justifyContent: 'space-around',
        //justifyContent: 'space-evenly',
        
    },

    textInputRow: {
        fontSize: 30,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 30,
        paddingVertical: 10,
        //paddingHorizontal: 20,
        //marginHorizontal: 50,
        width: 190,
        //justifyContent: 'center'
    },

    textInput: {
        fontSize: 30,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 30,
        paddingVertical: 10,
        //paddingHorizontal: 20,
        //marginHorizontal: 50,
        width: 350,
        //justifyContent: 'center'
    },

    

    textInputContainer: {
        alignItems: 'center'
    },

    signUpButton: {
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 140
    },

    signUpText: {
        fontSize: 25,
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
        paddingBottom: 10
    },

    errorMessage: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    }




});

export default SignUpScreen;