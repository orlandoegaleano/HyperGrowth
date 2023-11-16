import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, FlatList, Button } from 'react-native';
import { Context as MesocycleContext } from '../context/MesocycleContext';
import NavBar from '../components/NavBar';
import ExerciseDisplay from '../components/ExerciseDisplay';


const WorkoutScreen = () => {

  const { state, generateMesocycle } = useContext(MesocycleContext);
  //Function to print the muscleGroups to check if the exercise details are being updated properly
  const checkDaysData = () => {
    state.days.forEach((day) => {
      console.log(`Day ${day.id}:`);
      day.muscleGroups.forEach((group, groupIndex) => {
        console.log(`  Muscle Group ${groupIndex + 1}:`, group);
      });
    });
  };

  const checkMesocycleData = () => {

    state.sixWeekCycle.forEach((week, weekIndex) => {
      console.log(`Week ${weekIndex + 1}`);
      week.forEach((day) => {
        console.log(`${day.id}`);
        day.muscleGroups.forEach((group) => {
          console.log(`Muscle Group: ${group.muscle}`);
          console.log(`Exercise: ${group.exercise}`);
          console.log(`Weight ${group.weight}`);
          console.log(`Number of Sets: ${group.sets}`);
        });
      });
    });
  };


  return(
    <View style={styles.container}>

      <NavBar/>

      <Text style={styles.text}>Hello WorkoutScreen</Text>
      <Button title="Check Days Data" onPress={checkDaysData}/>
      <Button title="Generate Mesocycle" onPress={() => generateMesocycle(state.days)}/>
      <Button title="Check Mesocycle Data" onPress={checkMesocycleData}/>


      <FlatList
        data={state.sixWeekCycle}
        keyExtractor={(week, index) => {return `Week ${index + 1}`}}
        renderItem={({item: week, index: weekIndex}) => {
          return <View>
            <View>
              <Text style={styles.weekHeader}> Week {weekIndex + 1}</Text>
            </View>
            {week.map((day, dayIndex) => {
              return <View key={dayIndex}>
              <Text style={styles.dayHeader}>Day {day.title}</Text>
              {day.muscleGroups.map((group) => {
                return <ExerciseDisplay
                  id={day.id}
                  muscle={group.muscle}
                  exercise={group.exercise}
                  propWeight = {group.weight}
                  propSets = {group.sets}
                />
              })}

              </View>
            })}
            

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
  weekHeader: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
  },
  dayHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
  },
});

export default WorkoutScreen;
