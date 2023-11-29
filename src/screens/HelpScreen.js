import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import NavBar from '../components/NavBar';
import GeneralInformation from '../components/GeneralInformation';

// For question and answer styling
const FAQ = ({ questions, toggleCollapse, styles }) => {
  return questions.map((item, index) => (
    <View key={index}>
      <TouchableOpacity onPress={() => toggleCollapse(index)}>
        <Text style={styles.question}>{item.question}</Text>
      </TouchableOpacity>
      {!item.isCollapsed && item.answer.split('\n\n').map((sentence, i) => (
        <Text key={i} style={styles.answer}>{sentence}</Text>
      ))}
    </View>
  ));
};

const HelpScreen = () => {
  const initialData = [
    { question: 'How to setup a routine?', 
      answer: 'Once your account setup is complete, you can begin creating your workout routine by clicking on ‘Add a Routine’. You’ll be presented with two options: ‘Pre-made Routines’ and ‘Custom Routine’. ‘Pre-made Routines’ provide a basic, ready-to-follow workout plan. On the other hand, ‘Custom Routine’ offers more flexibility, allowing you to tailor your workout for each day and week. In the ‘Custom Routine’, you’ll be prompted to select a muscle group and an exercise. You have the option to add more exercises to a day, or even add more days to your week. After your routine is created, you can view your planned exercises for each day and week. This way, you’re always prepared for your next workout.', 
      isCollapsed: true },
    { question: 'What should I do If I experience pain/soreness during these workouts?', 
      answer: 'Stop the exercise: If an exercise causes pain, stop doing it. Pain is a signal from your body that something is wrong.\n\nDecrease the weight: If a particular weight is causing you discomfort, try reducing the weight. You can still get an effective workout with lighter weights, especially if you increase the number of repetitions.\n\nRest and recover: Give your body time to heal by taking a break from the activity that caused the pain.\n\nApply ice: If the pain is due to a minor injury, applying ice can help reduce inflammation and relieve pain.\n\nSeek medical advice: If the pain is severe, persists for more than a few days, or if you’re unsure of its cause, it’s important to seek advice from a healthcare professional.', 
      isCollapsed: true },
    { question: 'What can I do on rest days?', 
      answer: 'Rest days are an important part of any fitness routine. They allow your body to recover and repair itself, which is crucial for muscle growth and preventing injuries.\n\nLight Exercise: Engage in light activities like walking, cycling, or yoga. These activities can help increase blood flow and speed up the recovery process.\n\nStretch and Foam Roll: Stretching and foam rolling can help to relieve muscle tension and increase your range of motion.\n\nHydrate and Eat Nutritious Food: Drink plenty of water and eat a balanced diet to help your body recover and prepare for your next workout.\n\nSleep: Quality sleep is essential for muscle recovery and overall health.', 
      isCollapsed: true },
    { question: 'How long should each workout session typically take?', 
      answer: 'When you’re aiming to build muscle, the length and structure of your workout can play a big role.\n\nTypically, you might want to aim for around 10-20 sets per week for each muscle group, spread out over multiple days. This helps to stimulate muscle growth without overworking your muscles.\n\nIn terms of repetitions, a range of 6 to 12 reps per set is often recommended. This should be challenging enough to stimulate muscle growth, but not so heavy that you risk injury.\n\nAs for the length of each workout session, this can vary depending on your schedule and how long it takes you to complete your sets. However, a typical workout might last anywhere from 45 minutes to an hour and a half.', 
      isCollapsed: true },
    { question: 'Does the app offer video demonstrations or instructions for each exercise?', 
      answer: 'When selecting an exercise during your routine creation, you have the option to view a video demonstration of the exercise. Simply click on the play button adjacent to your chosen exercise. Once your routine is set and you can view your exercises along with their respective days and weeks, you’ll notice a play button next to each exercise for that day. This allows you to view the demonstration video at any time during your routine.', 
      isCollapsed: true },
    // Add more questions, answers, and isCollapsed properties as needed
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
