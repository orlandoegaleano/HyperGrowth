import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NavBar from '../components/NavBar';
import GeneralInformation from '../components/GeneralInformation';
import FAQ from '../components/FAQ';

const HelpScreen = () => {
  const initialData = [
    { question: 'Question 1', answer: 'Answer 1', isCollapsed: true },
    { question: 'Question 2', answer: 'Answer 2', isCollapsed: true },
    // Add more questions, answers, and isCollapsed properties as needed
    // This is just for testing until we get everything else done.
  ];
  // Use the useState hook to manage the FAQ data and the active tab state
  const [questions, setQuestions] = useState(initialData);
  const [activeTab, setActiveTab] = useState('FAQ'); // 'FAQ' or 'GeneralInformation'

  // Function to toggle the collapse state of a FAQ item
  const toggleCollapse = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isCollapsed = !updatedQuestions[index].isCollapsed;
    setQuestions(updatedQuestions);
  };

  return (
    <View>
      <NavBar />
      <View style={styles.tabButtons}>
        <TouchableOpacity onPress={() => setActiveTab('FAQ')}>
          <Text style={activeTab === 'FAQ' ? styles.activeTab : styles.inactiveTab}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('GeneralInformation')}>
          <Text style={activeTab === 'GeneralInformation' ? styles.activeTab : styles.inactiveTab}>
            General Information
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'FAQ' ? (
  <FAQ questions={questions} toggleCollapse={toggleCollapse} styles={styles} />
) : (
  <GeneralInformation styles={styles} />
)}

    </View>
  );
};

const styles = StyleSheet.create({
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  activeTab: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  inactiveTab: {
    fontSize: 18,
    color: 'gray',
  },
  question: {
    fontSize: 30,
    textAlign: 'left',
    margin: 20,
    borderBottomWidth: 1,
  },
  dropdown: {
    fontSize: 20,
    textAlign: 'left',
    margin: 20,
  },
  generalInfo: {
    fontSize: 20,
    margin: 20,
  },
});

export default HelpScreen;
