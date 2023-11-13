import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput} from 'react-native';

const InputBox = (props) => {
    const [userInput, setUserInput] = useState(props.backGroundText);
    return (
        <View style = {styles.container}>
            <TextInput
                style = {styles.textInput}
                autoCapitalize = 'none'
                autoCorrect = {false}
                value = {userInput}
                onChangeText = {(newText) => {setUserInput(newText)}}
            />
        </View>
    )
};

const styles = StyleSheet.create ({
    container: {
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
        paddingHorizontal: 20,
        marginHorizontal: 50

    }
});

export default InputBox;