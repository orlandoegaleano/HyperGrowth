import React from 'react';
import { View, Text } from 'react-native';

const GeneralInformation = ({ styles }) => {
  return (
    <View>
      <Text style={styles.generalInfoTitle}>HyperGrowth: Customizable Workout App</Text>
      <Text style={styles.generalInfoContent}>
        HyperGrowth is a customizable workout app focusing on periodized hypertrophy training.
        Users can create custom or choose pre-made routines with progressive overloading that changes weekly based on
        feedback after workouts.
      </Text>
    </View>
  );
};

export default GeneralInformation;