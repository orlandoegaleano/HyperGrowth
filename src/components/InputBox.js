import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';

const InputBox = (props) => {
    const [userInput, setUserInput] = useState("");
    return (
        <View style = {styles.container}>
            <TextInput
                style = {styles.textInput}
                secureTextEntry = {props.textShowBoolean}
                autoCapitalize = 'none'
                autoCorrect = {false}
                placeholder = {props.backGroundText}
                //value = {props.text}
                value = {userInput}
                //onChangeText = {(newText) => props.setter(newText)}
                onChangeText = {(newText) => {setUserInput(newText)}}
            />
        </View>
    )
};

const styles = StyleSheet.create ({
    container: {
        alignItems: 'center',
        //justifyContent: 'space-between'
        //paddingHorizontal: 50,
        // borderWidth: 1,
        // borderColor: 'red',
    },

    textInput: {
        fontSize: 30,
        textAlign: 'center',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 30,
        paddingVertical: 5,
        //paddingHorizontal: 20,
        //marginHorizontal: 50,
        width: 350,
        //justifyContent: 'center'


    }
});

export default InputBox;