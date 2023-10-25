import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';



const NavBar = () => {
  return(
    <View style={styles.container}>
        
        <TouchableOpacity onPress={() => {console.log("Home Icon Has been pressed")}}>
            <Entypo name="home" size={40} color="#000"/>
        </TouchableOpacity>

        <Ionicons name="logo-bitcoin" size={40} color="#000"/>

        <TouchableOpacity onPress={() => {console.log("Help Icon Has been pressed")}}>
            <Entypo name="help-with-circle" size={40} color="#000"/>
        </TouchableOpacity>

        
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default NavBar;
