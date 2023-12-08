import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MesocycleList = ({ mesocycles, onMesocycleSelect, onDeleteMesocycle }) => {

  const handleDelete = (mesocycle) => {
    Alert.alert(
      'Delete Mesocycle',
      `Are you sure you want to delete "${mesocycle.mesocycleTitle}"?`,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDeleteMesocycle(mesocycle._id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {mesocycles.map((mesocycle) => (
        <View key={mesocycle._id} style={styles.mesocycleItem}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => onMesocycleSelect(mesocycle)}
          >
            <Text style={styles.mesocycleText}>
              {mesocycle.mesocycleTitle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(mesocycle)}
          >
            <Ionicons name="trash" size={25} color="black" />   
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  mesocycleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e7e7e7',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  mesocycleText: {
    fontSize: 18,
    color: '#333',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MesocycleList;
