import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import NavBar from '../components/NavBar';
import GeneralInformation from '../components/GeneralInformation';
import FAQ from '../components/FAQ';

const HelpScreen = () => {
  const initialData = [
    { question: 'How to setup a routine?', answer: 'Answer 1', isCollapsed: true },
    { question: 'Is there a way to track my progress?', answer: 'Answer 2', isCollapsed: true },
    { question: 'What should I do If I experience pain/soreness during these workouts?', answer: 'Answer 3', isCollapsed: true },
    { question: 'What can I do on rest days?', answer: 'Answer 4', isCollapsed: true },
    { question: 'How long should each workout session typically take?', answer: 'Answer 5', isCollapsed: true },
    { question: 'Does the app offer video demonstrations or instructions for each exercise?', answer: 'Answer 6', isCollapsed: true },
    // Add more questions, answers, and isCollapsed properties as needed
    // This is just for testing until we get everything else done.
  ];
  // Use the useState hook to manage the FAQ data and the active tab state
  const [questions, setQuestions] = useState(initialData);
  const [activeTab, setActiveTab] = useState('GeneralInformation'); // 'FAQ' or 'GeneralInformation'

  // Function to toggle the collapse state of a FAQ item
  const toggleCollapse = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isCollapsed = !updatedQuestions[index].isCollapsed;
    setQuestions(updatedQuestions);
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.tabButtons}>
        <TouchableOpacity onPress={() => setActiveTab('GeneralInformation')}>
          <View style={activeTab === 'GeneralInformation' ? styles.activeTabBox : styles.inactiveTabBox}>
            <Text style={activeTab === 'GeneralInformation' ? styles.activeTabText : styles.inactiveTabText}>
              General Information
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('FAQ')}>
          <View style={activeTab === 'FAQ' ? styles.activeTabBox : styles.inactiveTabBox}>
            <Text style={activeTab === 'FAQ' ? styles.activeTabText : styles.inactiveTabText}>
              FAQ
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.tabContent}>
        {activeTab === 'FAQ' ? (
          <FAQ questions={questions} toggleCollapse={toggleCollapse} styles={styles} />
        ) : (
          <GeneralInformation styles={styles} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '70%', // Adjust the width of the tabButtons container
    alignSelf: 'center', // Center the container horizontally
  },
  activeTabBox: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  inactiveTabBox: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  activeTabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  inactiveTabText: {
    fontSize: 18,
    color: 'gray',
  },
  tabContent: {
    flexGrow: 1,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  answer: {
    fontSize: 18,
    marginBottom: 15,
    color: 'black',
    lineHeight: 24, 
  },
  generalInfoTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  generalInfoContent: {
    fontSize: 20, 
    color: 'black'
  },
  questionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 15,
  },
});

export default HelpScreen;