import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import NavBar from '../components/NavBar';

const AddRoutineScreen = ({navigation}) => {
  return(
    <View>
      <NavBar/>
      <Text style={styles.text}>Would you like to choose from a list of pre-made routines or create your own custom routine?</Text>
      <View style={styles.buttonContainer}>
        <Button 
        title={'Pre-made'}
        onPress={() => {navigation.navigate('NonCustom')}}
        />
        <Button 
        title={'Custom'}
        onPress={() => {navigation.navigate('Custom')}}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
});

export default AddRoutineScreen;
