import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, FlatList, Button } from 'react-native';
import { Context as MesocycleContext } from '../context/MesocycleContext';
import NavBar from '../components/NavBar';
import ExerciseDisplay from '../components/ExerciseDisplay';
import findPreviousExerciseData from '../helpers/findPreviousExerciseData';


const WorkoutScreen = () => {

  const { state: { mesocycle } } = useContext(MesocycleContext);


  return(
    <View style={styles.container}>

      <NavBar/>

      <FlatList
        data={mesocycle}
        keyExtractor={(week, index) => {return `Week ${index + 1}`}}
        renderItem={({item: week, index: weekIndex}) => {
          return (
          <View>

            <View>
              <Text style={styles.weekHeader}> Week {weekIndex + 1}</Text>
            </View>

            {week.map((day, dayIndex) => {

              return( 
                <View key={dayIndex}>

                <Text style={styles.dayHeader}>{day.title}</Text>

                {day.muscleGroups.map((group) => {
                  let previousRepCounts = null
                  if (weekIndex > 0){
                    const previousExerciseData = findPreviousExerciseData(mesocycle, weekIndex, day.title, group.exercise);
                    previousRepCounts = previousExerciseData.repCounts;
                  }
                  return (
                    <ExerciseDisplay
                      key={`${weekIndex}${dayIndex}${group.exercise}`}
                      weekIndex={weekIndex}
                      dayTitle={day.title}
                      muscle={group.muscle}
                      exercise={group.exercise}
                      propWeight = {group.weight}
                      propSets = {group.sets}
                      previousRepCounts = {previousRepCounts}
                    />
                  )
                })}

                </View>
              )
            })}
          </View>)

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
