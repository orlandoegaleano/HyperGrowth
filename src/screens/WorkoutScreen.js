import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import NavBar from '../components/NavBar';

const WorkoutScreen = () => {
  return(
    <View>
      <NavBar/>
      <Text style={styles.text}>Hello WorkoutScreen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default WorkoutScreen;
