import React, { useState, useContext, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Button } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import YouTubeButton from './YouTubeButton';
import { Picker } from '@react-native-picker/picker';
import { Context as MesocycleContext } from '../context/MesocycleContext';
import { applyProgressiveOverload, updateSetsBasedOnRatings } from '../helpers/applyProgressiveOverload';
import findExerciseDetails from '../helpers/findExerciseDetails'; 
import ExerciseRatings from './ExerciseRatings';  

const ExerciseDisplay = ({ mesocycleId, weekIndex, dayTitle, muscle, exerciseName }) => {
    const { state, updateMesocycle } = useContext(MesocycleContext);

    const { currentExercise, previousExercise } = findExerciseDetails(state.find(m => m._id === mesocycleId), weekIndex, dayTitle, exerciseName);
    const previousRepCounts = previousExercise ? previousExercise.repCounts : null;

    const [selectedWeight, setSelectedWeight] = useState(currentExercise.weight.toString());
    const [sets, setSets] = useState(Number(currentExercise.sets));
    const [repCounts, setRepCounts] = useState(
                                        currentExercise.repCounts && currentExercise.repCounts.length === currentExercise.sets 
                                            ? currentExercise.repCounts.map(String)
                                            : Array.from({ length: sets }, () => '1'));

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isExerciseRatingsVisible, setIsExerciseRatingsVisible] = useState(false);

    // Populating the Picker options
    const weightOptions = Array.from({ length: (300 - 5) / 5 + 1 }, (_, i) => (5 * i).toString());
    const repOptions = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const handleRepChange = (itemValue, setIndex) => {
        const newRepCounts = [...repCounts];
        newRepCounts[setIndex] = itemValue;
        setRepCounts(newRepCounts);
    };

    const handleSaveExerciseRatings = (sorenessRating, pumpRating) => {
        handleSaveExerciseDetails(sorenessRating, pumpRating);
    };    

    const handleSaveExerciseDetails = (sorenessRating, pumpRating) => {
        const mesocycleIndex = state.findIndex(m => m._id === mesocycleId);
        if (mesocycleIndex === -1) {
            console.error('Mesocycle not found');
            return;
        }

        const updatedMesocycle = state[mesocycleIndex];

        const targetMuscleGroup = updatedMesocycle.weeks[weekIndex].days
                                    .find(d => d.title === dayTitle).exerciseDetails
                                        .find(details => details.name === exerciseName);

        targetMuscleGroup.weight = selectedWeight;

        setSets(targetMuscleGroup.sets);

        setRepCounts(
            targetMuscleGroup.repCounts && targetMuscleGroup.repCounts.length === targetMuscleGroup.sets
                ? targetMuscleGroup.repCounts.map(String)
                : Array.from({ length: targetMuscleGroup.sets }, () => '1')
        );

        targetMuscleGroup.repCounts = repCounts.map(Number);
        targetMuscleGroup.sorenessRating = sorenessRating;
        targetMuscleGroup.pumpRating = pumpRating;

        updateMesocycle(mesocycleId, applyProgressiveOverload(updatedMesocycle));
        toggleCollapse();
  
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity>
                    <Entypo name='edit' size={30}/>
                </TouchableOpacity>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>{muscle}</Text>
                <TouchableOpacity onPress={toggleCollapse} >
                    <Entypo name={isCollapsed ? 'plus' : 'minus'} size={30}/>
                </TouchableOpacity>
            </View>


            {!isCollapsed && (

                <View>

                    <View style={styles.exercise}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>{exerciseName}</Text>
                        <YouTubeButton
                        muscle={muscle}
                        exercise={exerciseName}                
                        />
                    </View>  

                    <View style={styles.data}>

                        <View>
                            <Text style={styles.dataText}>Weight(lbs)</Text>
                            {
                                weekIndex === 0 ? 
                                    
                                <Picker
                                    selectedValue={selectedWeight}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setSelectedWeight(itemValue)}
                                >
                                    {weightOptions.map(option => (
                                        <Picker.Item key={option} label={option} value={option} />
                                    ))}
                                </Picker>
                                : 

                                <Text style={styles.weightText}>{selectedWeight} lbs</Text>
                                
                            }
                        </View>
                        <View>
                            <Text style={styles.dataText}>Reps - 3RIR</Text>
                            {repCounts.map((reps, index) => (
                            <View key={index}>
                                <Picker
                                    selectedValue={reps}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => handleRepChange(itemValue, index)}
                                >
                                    {repOptions.map(option => (
                                        <Picker.Item key={option} label={option} value={option} />
                                    ))}
                                </Picker>
                            </View>
                            ))}
                        </View>
                        <View>
                            <Text style={styles.dataText}>Previous</Text>
                            {previousRepCounts ? 
                                previousRepCounts.map((reps, index) => (
                                    <Text style={styles.previousText} key={index}>{reps}</Text>
                                ))
                                :
                                null
                            }
                        </View>
                    </View>

                    <View>
                        <Button title="Complete Exercise" onPress={() => setIsExerciseRatingsVisible(true)}/>
                    </View>
                    <ExerciseRatings
                        isVisible={isExerciseRatingsVisible}
                        onClose={() => setIsExerciseRatingsVisible(false)}
                        onSaveRatings={handleSaveExerciseRatings}
                    />
                </View>
            )}
            

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        borderBottom: 1,
        //borderLeft: 1,
        //borderColor: 'red',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        padding: 10,
    },
    exercise: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //padding: 20,
        marginHorizontal: 10,
    },
    data:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',
        padding: 10,
    },
    dataText: {
        marginHorizontal: 5,  
        fontSize: 20,
    },
    weightText: {
        fontSize: 20,
        marginTop: 15,
        textAlign: 'center',
    },
    previousText: {
        fontSize: 20,
        marginTop: 15,
        textAlign: 'center',
    },
});

export default ExerciseDisplay;