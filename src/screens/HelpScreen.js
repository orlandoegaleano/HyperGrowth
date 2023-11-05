import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar';

const HelpScreen = () => {
  const initialData = [
    { question: 'Question 1', answer: 'Answer 1', isCollapsed: true },
    { question: 'Question 2', answer: 'Answer 2', isCollapsed: true },
    // Add more questions, answers, and isCollapsed properties as needed
    //This is just for testing until we get everything else done.
  ];

  const [questions, setQuestions] = useState(initialData);

  const toggleCollapse = (index) => {
    // Create a copy of the questions array
    const updatedQuestions = [...questions];
    updatedQuestions[index].isCollapsed = !updatedQuestions[index].isCollapsed;
    setQuestions(updatedQuestions);
  };

  return (
    <View>
      <NavBar />
      {/* Map over the questions array and render each question */}
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

const styles = StyleSheet.create({
  question: {
    fontSize: 30,
    textAlign: 'left',
    margin: 20,
    borderBottomWidth: 1, // Add a border for a visual hint
  },
  dropdown: {
    fontSize: 20,
    textAlign: 'left',
    margin: 20,
  },
});

export default HelpScreen;

