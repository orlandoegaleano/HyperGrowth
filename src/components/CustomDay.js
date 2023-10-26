import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomDay = (props) => {
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([{}]);
    
    const addExercisePair = () => {
        setSelectedMuscleGroups([...selectedMuscleGroups, {}]);
    };

    return (
        <View style={styles.container}>
            <Text style={{alignSelf: 'center'}}>Day {props.id}</Text>
            
            {selectedMuscleGroups.map((_, index) => (
                <View key={index}>
                    <Picker
                        selectedValue={selectedMuscleGroups[index].muscle}
                        onValueChange={(itemValue) => {
                            const updatedMuscleGroups = [...selectedMuscleGroups];
                            updatedMuscleGroups[index].muscle = itemValue;
                            updatedMuscleGroups[index].exercise = undefined;
                            setSelectedMuscleGroups(updatedMuscleGroups);
                        }}
                    >
                        <Picker.Item label="Please select a muscle group first" value={null} />
                        {muscleGroups.map(group => (
                            <Picker.Item key={group} label={group} value={group} />
                        ))}
                    </Picker>

                    <Picker
                        selectedValue={selectedMuscleGroups[index].exercise}
                        onValueChange={(itemValue) => {
                            const updatedMuscleGroups = [...selectedMuscleGroups];
                            updatedMuscleGroups[index].exercise = itemValue;
                            setSelectedMuscleGroups(updatedMuscleGroups);
                        }}
                    >
                        <Picker.Item label="Please select an exercise" value={null} />
                        {selectedMuscleGroups[index].muscle && exercises[selectedMuscleGroups[index].muscle].map(exercise => (
                            <Picker.Item key={exercise.name} label={exercise.name} value={exercise.name} />
                        ))}
                    </Picker>
                </View>
            ))}

            <Button title="Add Exercise" onPress={addExercisePair} />
        </View>
    );
};



// Each muscle group has an array of exercise objects.
// Each exercise object has a name and a link.
const exercises = {
    Chest: [
        { name: 'Bench Press', link: 'https://www.youtube.com' },
        { name: 'Narrow Grip Bench Press', link: 'https://www.youtube.com' },
        { name: 'Incline Bench Press', link: 'https://www.youtube.com' },
        { name: 'Incline Narrow Grip Bench Press', link: 'https://www.youtube.com' },
        { name: 'Dumbbell Press', link: 'https://www.youtube.com' },
        { name: 'Incline Dumbbell Press', link: 'https://www.youtube.com' },
        { name: 'Push Up', link: 'https://www.youtube.com' },
        { name: 'Deficit Push-Up', link: 'https://www.youtube.com' },
        { name: 'Narrow Grip Push-Up', link: 'https://www.youtube.com' },
        { name: 'Machine Chest Press', link: 'https://www.youtube.com' },
        { name: 'Smith Machine Bench Press', link: 'https://www.youtube.com' },
        { name: 'Smith Machine Narrow Grip Bench Press', link: 'https://www.youtube.com' },
        { name: 'Incline Smith Machine Bench Press', link: 'https://www.youtube.com' },
        { name: 'Incline Smith Machine Narrow Grip Bench Press', link: 'https://www.youtube.com' }
    ],
    Back: [
        { name: 'Dumbbell Row', link: 'https://www.youtube.com' },
        { name: 'Cable Row', link: 'https://www.youtube.com' },
        { name: 'Chest Supported Row', link: 'https://www.youtube.com' },
        { name: 'Smith Machine Row', link: 'https://www.youtube.com' },
        { name: 'Normal Grip Pullup', link: 'https://www.youtube.com' },
        { name: 'Wide Grip Pullup', link: 'https://www.youtube.com' },
        { name: 'Parallel Grip Pullup', link: 'https://www.youtube.com' },
        { name: 'Underhand Grip Pullup', link: 'https://www.youtube.com' },
        { name: 'Normal Grip Pulldown', link: 'https://www.youtube.com' },
        { name: 'Wide Grip Pulldown', link: 'https://www.youtube.com' },
        { name: 'Parallel Grip Pulldown', link: 'https://www.youtube.com' },
        { name: 'Underhand Grip Pulldown', link: 'https://www.youtube.com' },
        { name: 'Assisted Normal Pullup', link: 'https://www.youtube.com' },
        { name: 'Assisted Wide Pullup', link: 'https://www.youtube.com' },
        { name: 'Assisted Underhand Pullup', link: 'https://www.youtube.com' }
    ],
    Biceps: [
        { name: 'Dumbbell Curl', link: 'https://www.youtube.com' },
        { name: 'Incline Dumbbell Curl', link: 'https://www.youtube.com' },
        { name: 'Barbell Curl', link: 'https://www.youtube.com' },
        { name: 'Narrow Grip Barbell Curl', link: 'https://www.youtube.com' },
        { name: 'Cable Curl', link: 'https://www.youtube.com' },
        { name: 'Dumbbell Preacher Curl', link: 'https://www.youtube.com' },
        { name: 'Machine Preacher Curl', link: 'https://www.youtube.com' },
        { name: 'Dumbbell Hammer Curl', link: 'https://www.youtube.com' }
    ],
    Shoulders: [
        { name: 'Dumbbell Upright Row', link: 'https://www.youtube.com' },
        { name: 'Barbell Upright Row', link: 'https://www.youtube.com' },
        { name: 'Cable Upright Row', link: 'https://www.youtube.com' },
        { name: 'Smith Machine Upright Row', link: 'https://www.youtube.com' },
        { name: 'Dumbbell Shoulder Press', link: 'https://www.youtube.com' },
        { name: 'Barbell Shoulder Press', link: 'https://www.youtube.com' },
        { name: 'Machine Shoulder Press', link: 'https://www.youtube.com' },
        { name: 'Smith Machine Shoulder Press', link: 'https://www.youtube.com' },
        { name: 'Dumbbell Front Raise', link: 'https://www.youtube.com' },
        { name: 'Barbell Front Raise', link: 'https://www.youtube.com' }
    ],
    Triceps: [
        { name: 'Dip', link: 'https://www.youtube.com' },
        { name: 'Assisted Dip', link: 'https://www.youtube.com' },
        { name: 'Dumbbell Skullcrusher', link: 'https://www.youtube.com' },
        { name: 'Barbell Skullcrusher', link: 'https://www.youtube.com' },
        { name: 'Cable Pushdown', link: 'https://www.youtube.com' },
        { name: 'Cable Pushdown with Rope', link: 'https://www.youtube.com' },
        { name: 'Cable Overhead Extensions', link: 'https://www.youtube.com' },
        { name: 'Cable Overhead Extensions with Rope', link: 'https://www.youtube.com' }
    ],
    Glutes: [
        { name: 'Machine Glute Kickback', link: 'https://www.youtube.com' },
        { name: 'Barbell Hip Thrust', link: 'https://www.youtube.com' },
        { name: 'Single Leg Hip Thrust', link: 'https://www.youtube.com' },
        { name: 'Sumo Squat', link: 'https://www.youtube.com' },
        { name: 'Cable Pull Through', link: 'https://www.youtube.com' },
        { name: 'Deadlift', link: 'https://www.youtube.com' },
        { name: 'Deficit Deadlift', link: 'https://www.youtube.com' },
        { name: 'Sumo Deadlift', link: 'https://www.youtube.com' }
    ],
    Quads: [
        { name: 'Leg Press', link: 'https://www.youtube.com' },
        { name: 'Front Squat', link: 'https://www.youtube.com' },
        { name: 'Narrow Stance Squat', link: 'https://www.youtube.com' },
        { name: 'Smith Machine Forward Squat', link: 'https://www.youtube.com' },
        { name: 'Machine Leg Extension', link: 'https://www.youtube.com' }
    ]
};
// List of all muscle groups based on the keys in the exercises object.
const muscleGroups = Object.keys(exercises);

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        margin: 5,
        
    },
});

export default CustomDay;
