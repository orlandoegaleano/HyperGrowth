import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import NavBar from '../components/NavBar';

const CustomScreen = () => {
  return(
    <View>
      <NavBar/>
      <Text style={styles.text}>Hello CustomScreen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default CustomScreen;
