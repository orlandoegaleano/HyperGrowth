import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import NavBar from '../components/NavBar';

const NonCustomScreen = () => {
  return(
    <View>
      <NavBar/>
      <Text style={styles.text}>Pre-made Workouts still need to be implemented</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default NonCustomScreen;
