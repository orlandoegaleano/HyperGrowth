import React from 'react';
import { withNavigation } from 'react-navigation';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const LOGO = '../../assets/logo.png';

const NavBar = ({navigation}) => {  
  return(
    <View style={styles.container}>        
        <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
            <Entypo name='home' size={40} color='#000'/>
        </TouchableOpacity>

  
        <Image 
          style = {styles.image}
          source = {require(LOGO)}
        />

        <TouchableOpacity onPress={() => {navigation.navigate('Help')}}>
            <Entypo name='help-with-circle' size={40} color='#000'/>
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
  image: {
    width: 40,
    height: 40,
  },
});

export default withNavigation(NavBar);
