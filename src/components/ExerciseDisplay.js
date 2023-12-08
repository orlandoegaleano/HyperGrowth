import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Button } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import YouTubeButton from './YouTubeButton';
import { Picker } from '@react-native-picker/picker';
import { Context as MesocycleContext } from '../context/MesocycleContext';
import applyProgressiveOverload from '../helpers/applyProgressiveOverload';


const ExerciseDisplay = ({ mesocycleId, weekIndex, dayTitle, muscle, exerciseName }) => {
    const { state, updateMesocycle } = useContext(MesocycleContext);

    const currentMesocycle = state.find(m => m._id === mesocycleId);
    const currentDay = currentMesocycle.weeks[weekIndex].days.find(d => d.title === dayTitle);
    const currentExercise = currentDay.muscleGroups.find(mg => mg.name === exerciseName);


    let previousRepCounts = null;
    if (weekIndex > 0) {

    const previousWeekDay = currentMesocycle.weeks[weekIndex - 1].days.find(d => d.title === dayTitle);
    const previousExercise = previousWeekDay.muscleGroups.find(mg => mg.name === exerciseName);      

    if (previousExercise && previousExercise.repCounts) {
        previousRepCounts = previousExercise.repCounts;
    }
    }

    const [selectedWeight, setSelectedWeight] = useState(currentExercise.weight.toString());
    const [sets, setSets] = useState(Number(currentExercise.sets) || 2);
    const [repCounts, setRepCounts] = useState(
                                        currentExercise.repCounts && currentExercise.repCounts.length === currentExercise.sets 
                                        ? currentExercise.repCounts.map(String)
                                        : Array.from({ length: sets }, () => '1'));
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Populating the Picker options
    const weightOptions = Array.from({ length: (300 - 5) / 5 + 1 }, (_, i) => (5 * i).toString());
    const repOptions = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const handleRepChange = (itemValue, setIndex) => {
        const newRepCounts = [...repCounts];
        newRepCounts[setIndex] = itemValue;
        setRepCounts(newRepCounts);
    };

    const handleSaveExerciseDetails = () => {
        const mesocycleIndex = state.findIndex(m => m._id === mesocycleId);
        if (mesocycleIndex === -1) {
            console.error('Mesocycle not found');
            return;
        }
         
        const updatedMesocycle = JSON.parse(JSON.stringify(state[mesocycleIndex]));

        const targetMuscleGroup = updatedMesocycle.weeks[weekIndex].days
                                    .find(d => d.title === dayTitle).muscleGroups
                                        .find(mg => mg.name === exerciseName);
      
        targetMuscleGroup.weight = selectedWeight;
        targetMuscleGroup.sets = sets;
        targetMuscleGroup.repCounts = repCounts.map(Number);
      
        updateMesocycle(mesocycleId, applyProgressiveOverload(updatedMesocycle, weekIndex, dayTitle, exerciseName));
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
                        <Button title="Complete Exercise" onPress={handleSaveExerciseDetails}/>
                    </View>
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