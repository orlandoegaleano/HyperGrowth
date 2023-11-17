import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import NavBar from '../components/NavBar';

const HomeScreen = ({navigation}) => {
  return(
    <View>
      <NavBar/>
      <Text style={styles.text}>Welcome User</Text>
      <Button
        title={'Add a Routine'}
        onPress={() => {navigation.navigate('AddRoutine')}}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
