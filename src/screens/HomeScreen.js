import React, {useContext} from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import RoutineButtons from '../components/RoutineButtons';
import {Context as AuthContext} from '../context/AuthContext'
//import { withNavigation } from 'react-navigation';
import NavBar from '../components/NavBar';

const YOUR_ROUTINE = "Your Routines";
const SIGN_OUT_TEXT = "Sign Out";

const HomeScreen = ({navigation}) => {
  const {signOut} = useContext(AuthContext);

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

      <TouchableOpacity
        style = {styles.signOutContainer}
        onPress={() => {signOut()}}
      >
        <Text style = {styles.signOutText}>{SIGN_OUT_TEXT}</Text>
        
      </TouchableOpacity>

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

  signOutContainer: {  //might need to be fixed for when new routine buttons are added
    marginTop: 350
  },

  signOutText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'red'
  }
});

export default HomeScreen;
