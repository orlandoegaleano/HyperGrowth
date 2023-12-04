import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, FlatList, Button, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import YouTubeButton from './YouTubeButton';
import { Picker } from '@react-native-picker/picker'; 
import { Context as MesocycleContext } from '../context/MesocycleContext';

const ExerciseDisplay = ({weekIndex, dayTitle, muscle, exercise, propWeight, propSets, previousRepCounts}) => {
    const [selectedWeight, setSelectedWeight] = useState( (propWeight || '5').toString() );
    const [sets, setSets] = useState( Number(propSets || 2)  );
    const [repCounts, setrepCounts] = useState(Array.from({ length: propSets || 2 }, () => '1'));
    const { updateExerciseDetails } = useContext(MesocycleContext);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    
    // Using useEffect to re-render screen to reflect proper amount of rows
    // for rep input whenever sets changes such as the user manually adding or removing a set.
    // useEffect(() => {
    //     setrepCounts(Array.from({ length: propSets }, () => '1'));
    // }, [propSets]);


    // Populating the Picker options
    const weightOptions = Array.from({ length: (300 - 5) / 5 + 1 }, (_, i) => (5 * i).toString());
    const repOptions = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

    const handleRepChange = (itemValue, setIndex) => {
        const newrepCounts = [...repCounts];
        newrepCounts[setIndex] = itemValue;
        setrepCounts(newrepCounts);
    };

    const handleSaveExerciseDetails = () => {
        updateExerciseDetails(weekIndex, dayTitle, exercise, {
          weight: selectedWeight,
          sets: sets,
          repCounts: repCounts,
        });
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
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>{exercise}</Text>
                        <YouTubeButton
                        muscle={muscle}
                        exercise={exercise}                
                        />
                    </View>  

                    <View style={styles.data}>

                        <View>
                            <Text style={styles.dataText}>Weight(lbs)</Text>
                            <Picker
                                selectedValue={selectedWeight}
                                style={styles.picker}
                                onValueChange={(itemValue) => setSelectedWeight(itemValue)}
                            >
                                {weightOptions.map(weight => (
                                    <Picker.Item key={weight} label={weight} value={weight} />
                                ))}
                            </Picker>
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
                                    <Text key={index}>{reps}</Text>
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
        borderWidth: 1,
        borderColor: 'red',
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
});

export default ExerciseDisplay;