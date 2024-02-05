import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import ExercisePickerPair from './ExercisePickerPair';
import { Context as DayContext } from '../context/DayContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

let warningDisplayed = false;

const CustomDay = ({ title, id }) => {
    const { updateDay } = useContext(DayContext);
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([{}]);

    const addExercisePair = () => {
        const updatedMuscleGroups = [...selectedMuscleGroups, {}];
        setSelectedMuscleGroups(updatedMuscleGroups);
        updateDay({ title, id, exerciseDetails: updatedMuscleGroups });
    };

    const removeExercisePair = (indexToRemove) => {
        const updatedMuscleGroups = selectedMuscleGroups.filter((_, index) => index !== indexToRemove);
        setSelectedMuscleGroups(updatedMuscleGroups);
        updateDay({ title, id, exerciseDetails: updatedMuscleGroups });
    };

    const handleUpdate = (index, key, value) => {
        const updatedMuscleGroups = [...selectedMuscleGroups];
        if (key === 'muscle' && updatedMuscleGroups.some((details, i) => i !== index && details.muscle === value)) {
            if (!warningDisplayed) {
                Alert.alert(
                    'Duplicate Muscle Group',
                    "To maximize recovery time and minimize injury risk, it's best to only train the same muscle group once per day.",
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                updatedMuscleGroups[index][key] = value;
                                setSelectedMuscleGroups(updatedMuscleGroups);
                                updateDay({ title, id, exerciseDetails: updatedMuscleGroups });
                                warningDisplayed = true;
                                AsyncStorage.setItem('warningDisplayed', 'true');
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                updatedMuscleGroups[index][key] = value;
                setSelectedMuscleGroups(updatedMuscleGroups);
                updateDay({ title, id, exerciseDetails: updatedMuscleGroups });
            }
        } else {
            updatedMuscleGroups[index][key] = value;
            setSelectedMuscleGroups(updatedMuscleGroups);
            updateDay({ title, id, exerciseDetails: updatedMuscleGroups });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>{title}</Text>
            </View>
            {selectedMuscleGroups.map((exerciseDetails, index) => (
                <View key={index} style={styles.exerciseContainer}>
                    <ExercisePickerPair
                        index={index}
                        selectedMuscleGroup={exerciseDetails}
                        onUpdate={handleUpdate}
                    />
                    <Button
                        title="Remove This Exercise"
                        onPress={() => removeExercisePair(index)}
                        disabled={selectedMuscleGroups.length === 1}
                    />
                </View>
            ))}
            <Button title="Add an Exercise to This Day" onPress={addExercisePair} />
        </View>
    );
};

const updateWarningDisplayed = async (value) => {
    try {
        warningDisplayed = value;
        await AsyncStorage.setItem('warningDisplayed', value.toString());
    } catch (error) {
        console.error('Error updating warningDisplayed:', error);
    }
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        borderWidth: 2,
    },
    dayHeader: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    dayTitle: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    exerciseContainer: {
        marginBottom: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: 'black',
    },
});

export { CustomDay, updateWarningDisplayed};
