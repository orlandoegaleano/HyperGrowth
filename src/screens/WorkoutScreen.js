import React, { useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import NavBar from '../components/NavBar';
import ExerciseDisplay from '../components/ExerciseDisplay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutScreen = ({ navigation }) => {
  const mesocycle = navigation.state.params;
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    getCurrentWeekIndex().then((index) => {
      setCurrentWeekIndex(index);
    });
    getCurrentDayIndex().then((index) => {
      setCurrentDayIndex(index);
    });
  }, []);

  const saveCurrentWeekIndex = async (index) => {
    try {
      await AsyncStorage.setItem(`currentWeekIndex${mesocycle._id}`, String(index));
    } catch (error) {
      console.error('Error saving current week index:', error);
    }
  };

  const getCurrentWeekIndex = async () => {
    try {
      const index = await AsyncStorage.getItem(`currentWeekIndex${mesocycle._id}`);
      return index !== null ? Number(index) : 0;
    } catch (error) {
      console.error('Error retrieving current week index:', error);
      return 0; 
    }
  };

  const saveCurrentDayIndex = async (index) => {
    try {
      await AsyncStorage.setItem(`currentDayIndex${mesocycle._id}`, String(index));
    } catch (error) {
      console.error('Error saving current day index:', error);
    }
  };

  const getCurrentDayIndex = async () => {
    try {
      const index = await AsyncStorage.getItem(`currentDayIndex${mesocycle._id}`);
      return index !== null ? Number(index) : 0;
    } catch (error) {
      console.error('Error retrieving current day index:', error);
      return 0;
    }
  };

  const handleWeekChange = (direction) => {
    let newIndex = currentWeekIndex;
    if (direction === 'next' && currentWeekIndex < mesocycle.weeks.length - 1) {
      newIndex = currentWeekIndex + 1;
    } else if (direction === 'prev' && currentWeekIndex > 0) {
      newIndex = currentWeekIndex - 1;
    }
    setCurrentDayIndex(0);
    saveCurrentDayIndex(0);
    setCurrentWeekIndex(newIndex);
    saveCurrentWeekIndex(newIndex);
  };

  const handleDayChange = (direction) => {
    let newIndex = currentDayIndex;
    const currentWeek = mesocycle.weeks[currentWeekIndex];
    if (direction === 'next' && currentDayIndex < currentWeek.days.length - 1) {
      newIndex = currentDayIndex + 1;
    } else if (direction === 'prev' && currentDayIndex > 0) {
      newIndex = currentDayIndex - 1;
    }
    setCurrentDayIndex(newIndex);
    saveCurrentDayIndex(newIndex);
  };

  return (
    <View style={styles.container}>

      <NavBar />

      <View style={styles.weekNavigation}>

        <TouchableOpacity onPress={() => handleWeekChange('prev')}>
          <Ionicons 
            name="arrow-back-circle" 
            size={30} 
            color={currentWeekIndex === 0 ? 'gray' : 'black'} />
        </TouchableOpacity>

        <Text style={styles.weekHeader}>Week {currentWeekIndex + 1}</Text>

        <TouchableOpacity onPress={() => handleWeekChange('next')}>
          <Ionicons
            name="arrow-forward-circle"
            size={30}
            color={currentWeekIndex === 5 ? 'gray' : 'black'}
          />          
        </TouchableOpacity>

      </View>

      <View style={styles.dayNavigation}>

        <TouchableOpacity onPress={() => handleDayChange('prev')}>
          <Ionicons 
            name="arrow-back-circle" 
            size={30} 
            color={currentDayIndex === 0 ? 'gray' : 'black'} />
        </TouchableOpacity>

        <Text style={styles.dayHeader}>Day {currentDayIndex + 1}</Text>

        <TouchableOpacity onPress={() => handleDayChange('next')}>
          <Ionicons
            name="arrow-forward-circle"
            size={30}
            color={currentDayIndex === mesocycle.weeks[currentWeekIndex].days.length - 1 ? 'gray' : 'black'}
          />
        </TouchableOpacity>

      </View>

      <FlatList
        data={mesocycle.weeks[currentWeekIndex].days[currentDayIndex].exerciseDetails}
        renderItem={({ item: details }) => (

          <ExerciseDisplay
            key={details._id}
            mesocycleId={mesocycle._id}
            weekIndex={currentWeekIndex}
            dayTitle={mesocycle.weeks[currentWeekIndex].days[currentDayIndex].title}
            muscle={details.muscle}
            exerciseName={details.name}
          />  

        )}
        keyExtractor={(item) => item._id}
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
    marginHorizontal: 40,
  },
  dayHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WorkoutScreen;
