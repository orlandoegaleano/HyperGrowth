import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import { Context as MesocycleContext } from '../context/MesocycleContext';
import NavBar from '../components/NavBar';
import ExerciseDisplay from '../components/ExerciseDisplay';
import findPreviousExerciseData from '../helpers/findPreviousExerciseData';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const WorkoutScreen = () => {
  const { state: { mesocycle } } = useContext(MesocycleContext);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const handleWeekChange = (direction) => {
    if (direction === 'next' && currentWeekIndex < mesocycle.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    } else if (direction === 'prev' && currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <NavBar/>
      <View style={styles.weekNavigation}>
        <TouchableOpacity onPress={() => handleWeekChange('prev')}>
          <Ionicons name="arrow-back-circle" size={30} color={currentWeekIndex === 0 ? "gray" : "black"} />
        </TouchableOpacity>
        <Text style={styles.weekHeader}>Week {currentWeekIndex + 1}</Text>
        <TouchableOpacity onPress={() => handleWeekChange('next')}>
          <Ionicons name="arrow-forward-circle" size={30} color={currentWeekIndex === mesocycle.length - 1 ? "gray" : "black"} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mesocycle[currentWeekIndex]}
        renderItem={({ item: day, index: dayIndex }) => (
          <ScrollView 
            style={styles.scrollView}
            key={dayIndex}
          >
            <Text style={styles.dayHeader}>{day.title}</Text>
            {day.muscleGroups.map((group, groupIndex) => {
              let previousRepCounts = null;
              if (currentWeekIndex > 0) {
                const previousExerciseData = findPreviousExerciseData(mesocycle, currentWeekIndex, day.title, group.exercise);
                previousRepCounts = previousExerciseData ? previousExerciseData.repCounts : [];
              }
              return (
                <ExerciseDisplay
                  key={`${currentWeekIndex}${dayIndex}${group.exercise}`}
                  weekIndex={currentWeekIndex}
                  dayTitle={day.title}
                  muscle={group.muscle}
                  exercise={group.exercise}
                  propWeight={group.weight}
                  propSets={group.sets}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekHeader: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    marginHorizontal: 50,
  },
  dayHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
  },
  scrollView: {
    flex: 1, 
    width: screenWidth,
  },
  dayContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default WorkoutScreen;
