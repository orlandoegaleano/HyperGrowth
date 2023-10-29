import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Entypo from 'react-native-vector-icons/Entypo';

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
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
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
                        <TouchableOpacity 
                            style={{flex:1}}
                            onPress={() => {
                                // Check if a muscle group and an exercise are selected
                                if (selectedMuscleGroups[index].muscle && selectedMuscleGroups[index].exercise) {
                                    // If selected, open the associated link
                                    const exerciseLink = exercises[selectedMuscleGroups[index].muscle].find(e => e.name === selectedMuscleGroups[index].exercise).link;
                                    openYouTubeLink(exerciseLink);
                                } else {
                                    // If not selected, show an error alert
                                    alert('Please select an exercise first.');
                                }
                            }}>
                            <Entypo name='youtube' size={30} color='#000'/>
                        </TouchableOpacity>

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

const openYouTubeLink = (watchID) => {
    // Check if the provided URL can be opened
    const url = "https://www.youtube.com/watch?v="+ watchID
    console.log(url);
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        // If we can open the URL, do it
        Linking.openURL(url);
      } else {
        console.error('Unable to open URI: ' + watchID);
      }
    });
  };
  





// Each muscle group has an array of exercise objects.
// Each exercise object has a name and a link.
const exercises = {
    Chest: [
        { name: 'Bench Press', link: 'gMgvBspQ9lk' },
        { name: 'Narrow Grip Bench Press', link: 'FiQUzPtS90E' },
        { name: 'Incline Bench Press', link: 'lJ2o89kcnxY' },
        { name: 'Incline Narrow Grip Bench Press', link: 'Zfi0KcIJi6c' },
        { name: 'Dumbbell Press', link: 'YQ2s_Y7g5Qk' },
        { name: 'Incline Dumbbell Press', link: '5CECBjd7HLQ' },
        { name: 'Push Up', link: 'mm6_WcoCVTA' },
        { name: 'Deficit Push-Up', link: 'gmNlqsE3Onc' },
        { name: 'Narrow Grip Push-Up', link: 'Lz1aFtuNvEQ' },
        { name: 'Machine Chest Press', link: 'NwzUje3z0qY' },
        { name: 'Smith Machine Bench Press', link: 'O5viuEPDXKY' },
        { name: 'Smith Machine Narrow Grip Bench Press', link: 'qf_FTh3QyYs' },
        { name: 'Incline Smith Machine Bench Press', link: '8urE8Z8AMQ4' },
        { name: 'Incline Smith Machine Narrow Grip Bench Press', link: 'qf_FTh3QyYs' }
    ],
    Back: [
        { name: 'Dumbbell Row', link: '5PoEksoJNaw' },
        { name: 'Cable Row', link: 'UCXxvVItLoM' },
        { name: 'Chest Supported Row', link: '0UBRfiO4zDs' },
        { name: 'Smith Machine Row', link: '3QcJggd_L24' },
        { name: 'Normal Grip Pullup', link: 'iWpoegdfgtc' },
        { name: 'Wide Grip Pullup', link: 'GRgWPT9XSQQ' },
        { name: 'Parallel Grip Pullup', link: 'XWt6FQAK5wM' },
        { name: 'Underhand Grip Pullup', link: '9JC1EwqezGY' },
        { name: 'Normal Grip Pulldown', link: 'EUIri47Epcg' },
        { name: 'Wide Grip Pulldown', link: 'YCKPD4BSD2E' },
        { name: 'Parallel Grip Pulldown', link: '--utaPT7XYQ' },
        { name: 'Underhand Grip Pulldown', link: 'VprlTxpB1rk' },
        { name: 'Assisted Normal Pullup', link: '8ygapPMYK1I' },
        { name: 'Assisted Wide Pullup', link: '0tiC6RUZL8Y' },
        { name: 'Assisted Underhand Pullup', link: 'L4ChTwrXTjc' }
    ],
    Biceps: [
        { name: 'Dumbbell Curl', link: 'yYB76DOBPsM' },
        { name: 'Incline Dumbbell Curl', link: 'aTYlqC_JacQ' },
        { name: 'Barbell Curl', link: 'JnLFSFurrqQ' },
        { name: 'Narrow Grip Barbell Curl', link: 'pUS6HBQjRmc' },
        { name: 'Cable Curl', link: 'nW7w5vG6IIc' },
        { name: 'Dumbbell Preacher Curl', link: 'fuK3nFvwgXk' },
        { name: 'Machine Preacher Curl', link: 'Ja6ZlIDONac' },
        { name: 'Dumbbell Hammer Curl', link: 'XOEL4MgekYE' }
    ],
    Shoulders: [
        { name: 'Dumbbell Upright Row', link: 'Ub6QruNKfbY' },
        { name: 'Barbell Upright Row', link: 'um3VVzqunPU' },
        { name: 'Cable Upright Row', link: 'qr3ziolhjvQ' },
        { name: 'Smith Machine Upright Row', link: 'QIpa-9dtkgA' },
        { name: 'Dumbbell Shoulder Press', link: 'HzIiNhHhhtA' },
        { name: 'Barbell Shoulder Press', link: 'IuzRCN6eG6Y' },
        { name: 'Machine Shoulder Press', link: 'WvLMauqrnK8' },
        { name: 'Smith Machine Shoulder Press', link: 'OLqZDUUD2b0' },
        { name: 'Dumbbell Front Raise', link: 'hRJ6tR5-if0' },
        { name: 'Barbell Front Raise', link: '_ikCPws1mbE' }
    ],
    Triceps: [
        { name: 'Dip', link: '4LA1kF7yCGo' },
        { name: 'Assisted Dip', link: 'yZ83t4mrPrI' },
        { name: 'Dumbbell Skullcrusher', link: 'jPjhQ2hsAds' },
        { name: 'Barbell Skullcrusher', link: 'l3rHYPtMUo8' },
        { name: 'Cable Pushdown', link: '6Fzep104f0s' },
        { name: 'Cable Pushdown with Rope', link: '-xa-6cQaZKY' },
        { name: 'Cable Overhead Extensions', link: '1u18yJELsh0' },
        { name: 'Cable Overhead Extensions with Rope', link: 'kqidUIf1eJE' }
    ],
    Glutes: [
        { name: 'Machine Glute Kickback', link: 'NLDBFtSNhqg' },
        { name: 'Barbell Hip Thrust', link: 'EF7jXP17DPE' },
        { name: 'Dumbbell Single Leg Hip Thrust', link: 'CSXVj047Ss4' },
        { name: 'Sumo Squat', link: 'wjw-4R5VR20' },
        { name: 'Cable Pull Through', link: 'pv8e6OSyETE' },
        { name: 'Deadlift', link: 'AweC3UaM14o' },
        { name: 'Deficit Deadlift', link: 'X-uKkAukJVA' },
        { name: 'Sumo Deadlift', link: 'xp1IeyTOB4U' }
    ],
    Quads: [
        { name: 'Leg Press', link: 'yZmx_Ac3880' },
        { name: 'Front Squat', link: 'HHxNbhP16UE' },
        { name: 'Narrow Stance Squat', link: '1IIPcUCKxcE' },
        { name: 'Smith Machine Forward Squat', link: '-eO_VydErV0' },
        { name: 'Machine Leg Extension', link: 'm0FOpMEgero' }
    ],    
    Hamstrings: [
        { name: '45 degree back raise', link: '5_ejbGfdAQE' },
        { name: 'Machine Leg Curl', link: 'Orxowest56U' },
        { name: 'Dumbbell Stiff Legged Deadlift', link: 'cYKYGwcg0U8' },
        { name: 'Barbell Stiff Legged Deadlift', link: 'CN_7cz3P-1U' },
        { name: 'Barbell Good Morning', link: 'dEJ0FTm-CEk' }
    ],
    Calves: [
        { name: 'Machine Calf Extension', link: 'N3awlEyTY98' },
        { name: 'Leg Press Calf Extension', link: 'KxEYX_cuesM' },
        { name: 'Smith Machine Calf Raises', link: 'hh5516HCu4k' },
        { name: 'Stair Calf Raises', link: '__qfDhdByMY' }
    ]
};
    
// List of all muscle groups based on the keys in the exercises object.
const muscleGroups = Object.keys(exercises);

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
