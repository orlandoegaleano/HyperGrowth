import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ExercisePickerPair from './ExercisePickerPair';

// Defining the CustomDay component.
const CustomDay = (props) => {
    // State for managing selected muscle groups. Initially set as an array with an empty object.
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([{}]);

    // Function to add a new exercise pair. It appends an empty object to the selectedMuscleGroups array.
    const addExercisePair = () => {
        setSelectedMuscleGroups([...selectedMuscleGroups, {}]);
    };

    // Function to remove an exercise pair based on its index.
    const removeExercisePair = (indexToRemove) => {
        // Filtering selectedMuscleGroups array to exclude the item with the given index.
        const filteredMuscleGroups = selectedMuscleGroups.filter((_, index) => index !== indexToRemove);
        // Updating the state with the filtered array.
        setSelectedMuscleGroups(filteredMuscleGroups);
    };

    // Handling updates to the selectedMuscleGroups array.
    const handleUpdate = (index, key, value) => {
        // Creating a copy of the current selectedMuscleGroups array.
        const updatedMuscleGroups = [...selectedMuscleGroups];
        // Updating the specified index with the given key-value pair.
        updatedMuscleGroups[index][key] = value;
        // Setting the updated array to the state.
        setSelectedMuscleGroups(updatedMuscleGroups);
    };

    return (
        
        <View style={styles.container}>
            {/* Displaying the day ID.*/}
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>   
                <Text style={{ alignSelf: 'center', fontSize: 30, fontWeight: 'bold', }}>Day {props.id}</Text>
            </View> 
            {/* Mapping through the selectedMuscleGroups array to display each exercise pair.*/}
            {selectedMuscleGroups.map((muscleGroup, index) => (
                // Using a View for each exercise pair.
                <View key={index} style={{marginBottom: 10}}>
                    {/* Including the ExercisePickerPair component and passing necessary props.*/}
                    <ExercisePickerPair 
                        index={index} 
                        selectedMuscleGroup={muscleGroup} 
                        onUpdate={handleUpdate} 
                    />
                    {/* Button to remove the current exercise pair.*/}
                    <Button
                        title="Remove This Exercise"
                        onPress={() => removeExercisePair(index)}
                        // Disabling the button if there's only one exercise pair.
                        disabled={selectedMuscleGroups.length === 1}
                    />
                </View>
            ))}
            {/* Button to add a new exercise pair.*/}
            <Button title="Add an exercise to this Day" onPress={addExercisePair} />
        </View>
    );
};

const styles = StyleSheet.create({   
    container: {        
        margin: 5,       
    },
    picker: {
        borderWidth: 1,
        borderColor: 'black',
    },
});

export default CustomDay;
