import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext'

const SignInButton = (props) => {
    //const {state, signIn} = useContext(AuthContext);
    return(
        <View style = {styles.container}>
            <TouchableOpacity
                style = {styles.button}
                onPress={() => {onSubmit({email, password})}}
            >
                <Text style = {styles.title}>{props.title}</Text>

            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        //justifyContent: 'center',
        paddingHorizontal: 120
    },

    button: {
        borderWidth: 1,
        borderColor: 'black',
    },

    title: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10,
    }
});

export default withNavigation(SignInButton);