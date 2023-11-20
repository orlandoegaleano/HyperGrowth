import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import RoutineButtons from '../components/RoutineButtons';
//import { withNavigation } from 'react-navigation';
import NavBar from '../components/NavBar';

const YOUR_ROUTINE = "Your Routines";

const HomeScreen = ({navigation}) => {
  return(
    <View>
      <NavBar/>
      <Text style={styles.text}>Welcome User</Text>
      <Text style={styles.yourRoutineText}>{YOUR_ROUTINE}</Text>

      <RoutineButtons
        title = "Beginner"
        navigationText = "Workout"
      >

      </RoutineButtons>
      <Button
        title={'Add a Routine'}
        onPress={() => {navigation.navigate('AddRoutine')}}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    textAlign: 'center',
    marginVertical: 20
  },

  yourRoutineText: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30
  },
});

export default HomeScreen;
