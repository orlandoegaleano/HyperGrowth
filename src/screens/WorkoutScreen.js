//WorkoutScreen.js
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import NavBar from '../components/NavBar';
import ExerciseDisplay from '../components/ExerciseDisplay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import findPreviousExerciseData from '../helpers/findPreviousExerciseData';

const screenWidth = Dimensions.get('window').width;

const WorkoutScreen = ({ navigation }) => {

  const mesocycle = navigation.state.params;
  //console.log("Received mesocycle:", JSON.stringify(mesocycle, null, 2));
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const handleWeekChange = (direction) => {
    if (direction === 'next' && currentWeekIndex < mesocycle.weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    } else if (direction === 'prev' && currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <NavBar />

      {/* Week Navigation */}
      <View style={styles.weekNavigation}>
        <TouchableOpacity onPress={() => handleWeekChange('prev')}>
          <Ionicons name="arrow-back-circle" size={30} color={currentWeekIndex === 0 ? "gray" : "black"} />
        </TouchableOpacity>
        <Text style={styles.weekHeader}>Week {currentWeekIndex + 1}</Text>
        <TouchableOpacity onPress={() => handleWeekChange('next')}>
          <Ionicons name="arrow-forward-circle" size={30} color={currentWeekIndex === mesocycle.weeks.length - 1 ? "gray" : "black"} />
        </TouchableOpacity>
      </View>

      {/* Displaying Exercises */}
      <FlatList
        data={mesocycle.weeks[currentWeekIndex].days}
        renderItem={({ item: day, index: dayIndex }) => (

          <ScrollView style={styles.scrollView} key={dayIndex}>

            <Text style={styles.dayHeader}>{day.title}</Text>

            {day.muscleGroups.map((group, groupIndex) => {

              let previousRepCounts = null;
              if (currentWeekIndex > 0) {

                const previousWeekDay = mesocycle.weeks[currentWeekIndex - 1].days.find(d => d.title === day.title);
                const previousGroup = previousWeekDay.muscleGroups[groupIndex];      

                if (previousGroup && previousGroup.repCounts) {
                  previousRepCounts = previousGroup.repCounts;
                }
              }
                            
              return (
                <ExerciseDisplay
                  key={group._id}
                  mesocycleId={mesocycle._id}
                  weekIndex={currentWeekIndex}
                  dayTitle={day.title}
                  muscle={group.muscle}
                  exerciseName={group.name}
                  previousRepCounts={previousRepCounts} 
                />
              );
            })}
          </ScrollView>
        )}
        keyExtractor={(item, index) => `day-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekHeader: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 10,
    marginHorizontal: 25,
  },
  dayHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 5,
    alignSelf: 'center',
  },
  scrollView: {
    flex: 1,
    width: screenWidth,
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default WorkoutScreen;
