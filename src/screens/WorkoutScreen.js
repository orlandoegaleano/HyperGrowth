import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, FlatList, Button } from 'react-native';
import { Context as MesocycleContext } from '../context/MesocycleContext';
import NavBar from '../components/NavBar';
import ExerciseDisplay from '../components/ExerciseDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutScreen = () => {

  const { state } = useContext(MesocycleContext);
  //Function to print the muscleGroups to check if the exercise details are being updated properly
  const checkData = () => {
    state.days.forEach((day) => {
      console.log(`Day ${day.id}:`);
      day.muscleGroups.forEach((group, groupIndex) => {
        console.log(`  Muscle Group ${groupIndex + 1}:`, group);
      });
    });
  };


  return(
    <View style={styles.container}>

      <NavBar/>

      <Text style={styles.text}>Hello WorkoutScreen</Text>
      <Button title="Checking Data" onPress={checkData}/>

      <FlatList
        data={state.days}
        keyExtractor={(day) => {return day.id}}
        renderItem={({item}) => {
          return <View>
              {item.muscleGroups.map((pair, index) => (
                <View key={index}>
                  <Text>{item.id}</Text>
                  <ExerciseDisplay
                    id={item.id}
                    muscle={pair.muscle}
                    exercise={pair.exercise}
                  />
                </View>
              ))}
          </View>
        }}
      />      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
  dayContainer: {
    
  },
});

export default WorkoutScreen;
