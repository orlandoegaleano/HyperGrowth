import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
const RoutineButtons = (props) => {
    return (
        <View style = {styles.container}>
            <TouchableOpacity 
                styles = {styles.button}
                onPress={()=> {props.navigation.navigate("Workout")}}
            >
                <Text style = {styles.title}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },

    title: {
        fontSize: 30,
        textAlign: 'center',
        borderWidth: 1, 
        borderColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 50,
        marginBottom: 20
    }
});

export default withNavigation(RoutineButtons);