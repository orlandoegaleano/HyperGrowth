import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MesocycleList = ({ mesocycles, onMesocycleSelect }) => {
  return (
    <View style={styles.container}>
      {mesocycles.map(mesocycle => (
        <TouchableOpacity 
          key={mesocycle._id}
          style={styles.mesocycleItem}
          onPress={() => onMesocycleSelect(mesocycle)}
        >
          <Text style={styles.mesocycleText}>{mesocycle.title || `Mesocycle ${mesocycle._id}`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  mesocycleItem: {
    backgroundColor: '#e7e7e7',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  mesocycleText: {
    fontSize: 18,
    color: '#333',
  }
});

export default MesocycleList;
