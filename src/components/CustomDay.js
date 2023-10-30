import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { exercises, muscleGroups } from './exercises';
import YouTubeButton from './YouTubeButton';

const CustomDay = (props) => {
    // Create a state variable to store selected muscle groups and their exercises
    // Initial state is an array with an empty object to render a Picker pair on initial start
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([{}]);
    
    // Function that adds a new exercise pair to the selectedMuscleGroups state
    const addExercisePair = () => {
        setSelectedMuscleGroups([...selectedMuscleGroups, {}]);  // Append an empty object to the current state
    };

    // Function that removes an exercise pair based on its index
    const removeExercisePair = (indexToRemove) => {
        const filteredMuscleGroups = selectedMuscleGroups.filter((_, index) => index !== indexToRemove);
        setSelectedMuscleGroups(filteredMuscleGroups);
    };

    return (
        // Container View
        <View style={styles.container}>
            {/* Displaying the day number */}
            <Text style={{alignSelf: 'center'}}>Day {props.id}</Text>
            
            {/* Map over the selectedMuscleGroups array to render pickers for each muscle group. 
            The map function iterates over each item in the array, allowing for dynamic rendering based on the state.*/}
            {selectedMuscleGroups.map((_, index) => (
                // Render a View for each muscle group with a unique key based on its index
                <View key={index} style={styles.picker}>
                    {/* Picker is a dropdown list to select from a range of muscle groups.*/}
                    <Picker
                        // `selectedValue` is the value that is currently selected in the picker.
                        // For this picker, it refers to the muscle from the current item being mapped over in `selectedMuscleGroups`.
                        selectedValue={selectedMuscleGroups[index].muscle}

                        // `onValueChange` is a callback that gets triggered when a user selects a different value in the picker.
                        onValueChange={(itemValue) => {
                            // Create a shallow copy of the `selectedMuscleGroups` state array.
                            const updatedMuscleGroups = [...selectedMuscleGroups];

                            // Update the muscle value for the current item to the newly selected value.
                            updatedMuscleGroups[index].muscle = itemValue;

                            // Reset the exercise value for the current item since the muscle group has changed.
                            updatedMuscleGroups[index].exercise = undefined;

                            // Update the `selectedMuscleGroups` state with the modified array.
                            setSelectedMuscleGroups(updatedMuscleGroups);
                        }}
                    >

                        {/* Picker.Item represents an individual selectable item in the Picker. 
                        In this context, it's used to prompt the user to select a muscle group first.*/}
                        <Picker.Item label="Please select a muscle group first" value={null}/>
                        
                        {/* Map over muscleGroups to render each as an individual selectable item.
                        This allows for dynamic rendering based on available muscle groups.*/}
                        {muscleGroups.map(group => (
                            <Picker.Item key={group} label={group} value={group}/>
                        ))}
                    </Picker>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 5}}>
                        {/* Another Picker component, this time for selecting an exercise associated with the chosen muscle group.
                        It's dynamically populated based on the previously selected muscle group.*/}
                        <Picker
                            style={{flex: 9}}
                            selectedValue={selectedMuscleGroups[index].exercise}
                            onValueChange={(itemValue) => {
                                const updatedMuscleGroups = [...selectedMuscleGroups];
                                updatedMuscleGroups[index].exercise = itemValue;
                                setSelectedMuscleGroups(updatedMuscleGroups);
                            }}
                        >
                            <Picker.Item label="Please select an exercise" value={null}/>
                            
                            {/* Check if a muscle group has been selected. If yes, dynamically render exercises 
                            associated with the chosen muscle group.*/}
                            {selectedMuscleGroups[index].muscle && exercises[selectedMuscleGroups[index].muscle].map(exercise => (
                                <Picker.Item key={exercise.name} label={exercise.name} value={exercise.name}/>
                            ))}
                        </Picker>
                        <YouTubeButton 
                            muscle={selectedMuscleGroups[index].muscle}
                            exercise={selectedMuscleGroups[index].exercise}
                            exercises={exercises}
                        />

                    </View>
                    
                    {/* Button to remove the current pair of Pickers */}
                    <Button 
                    title="Remove This Exercise" 
                    onPress={() => removeExercisePair(index)}
                    disabled={selectedMuscleGroups.length === 1}
                    />
                </View>
            ))}
            {/* Button component to add a new exercise pair */}
            <Button 
            title="Add Exercise" 
            onPress={addExercisePair}/>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        margin: 5,        
    },
    picker: {
        borderWidth: 1,
        borderColor: 'red',
    },

});

export default CustomDay;
