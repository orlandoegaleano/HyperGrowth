import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FAQ = ({ questions, toggleCollapse, styles }) => {
  return (
    <View>
      {questions.map((item, index) => (
        <View key={index}>
          <TouchableOpacity onPress={() => toggleCollapse(index)}>
            <Text style={styles.question}>{item.question}</Text>
          </TouchableOpacity>
          {!item.isCollapsed ? (
            <Text style={styles.dropdown}>{item.answer}</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
};

export default FAQ;
