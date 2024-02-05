import React from 'react'; 
import { View, Button } from 'react-native'; 
import { Picker } from '@react-native-picker/picker'; 
import { exercises, exerciseDetails } from './exercises';
import YouTubeButton from './YouTubeButton'; 


const ExercisePickerPair = ({ index, selectedMuscleGroup, onUpdate }) => {
    return (

        <View key={index} >
            
            <Picker
                selectedValue={selectedMuscleGroup.muscle} // This sets the default value for the Picker to the currently selected muscle.
                onValueChange={(itemValue) => { // A function that's called when a user selects a different muscle group.
                    onUpdate(index, 'muscle', itemValue); // Updating the muscle for the current Picker.
                    onUpdate(index, 'exercise', undefined); // Resetting the exercise when the muscle changes.
                }}
            >
                {/* Default Picker item prompting user to make a selection.*/}
                <Picker.Item label="Please select a muscle group first" value={null} />
                
                {/* Mapping through the exerciseDetails array to dynamically generate Picker items for each muscle group.*/}
                {exerciseDetails.map(group => (
                    // Each Picker.Item requires a unique 'key' for React's internal use.
                    // 'label' is what's displayed to the user and 'value' is the actual value that gets selected.
                    // In this case, 'group' is used for all three for simplicity since each muscle group has a unique name.
                    <Picker.Item key={group} label={group} value={group} />
                ))}
            </Picker>
            
   
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                
                <Picker
                    style={{ flex: 9 }} // Giving it a flex value so it occupies 90% of the space in its container.
                    selectedValue={selectedMuscleGroup.exercise} // This sets the default value for the Picker to the currently selected exercise.
                    onValueChange={(itemValue) => { // A function that's called when a user selects a different exercise.
                        onUpdate(index, 'exercise', itemValue); // Updating the exercise for the current Picker.
                    }}
                >
                    {/* Default Picker item prompting user to make a selection.*/}
                    <Picker.Item label="Please select an exercise" value={null} />
                    
                    {/* Checking if a muscle group is selected and then mapping through the exercises for that muscle group.*/}
                    {selectedMuscleGroup.muscle && exercises[selectedMuscleGroup.muscle].map(exercise => (
                        // For each exercise, a Picker.Item is created.
                        <Picker.Item key={exercise.name} label={exercise.name} value={exercise.name} />
                    ))}
                </Picker>
                

                <YouTubeButton
                    muscle={selectedMuscleGroup.muscle}
                    exercise={selectedMuscleGroup.exercise}
                />
            </View>
        </View>
    );
};


export default ExercisePickerPair;
