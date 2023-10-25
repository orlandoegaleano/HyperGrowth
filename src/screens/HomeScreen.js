import React from "react";
import { Text, StyleSheet, View } from "react-native";
import NavBar from "../components/NavBar";

const HomeScreen = () => {
  return(
    <View>
      <NavBar/>
      <Text style={styles.text}>Hello HomeScreen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
