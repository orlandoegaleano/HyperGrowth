import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NavBar from '../components/NavBar';
import GeneralInformation from '../components/GeneralInformation';
import { FontAwesome } from '@expo/vector-icons'; 

const FAQ = ({ questions, toggleCollapse, styles }) => {
  return questions.map((item, index) => (
    <View key={index}>
      <TouchableOpacity onPress={() => toggleCollapse(index)}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{item.question}</Text>
          <FontAwesome
            name={item.isCollapsed ? 'chevron-right' : 'chevron-down'} 
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {!item.isCollapsed && item.answer.split('\n\n').map((sentence, i) => (
        <Text key={i} style={styles.answer}>{sentence}</Text>
      ))}
    </View>
  ));
};

const HelpScreen = () => {
  const initialData = [
    {
      question: `What is a repetition (rep) and a set?`,
      answer: `A repetition, or "rep", refers to a single completion of the full range of motion for an exercise. For example, if you perform a bicep curl from the starting position to the \
top of the movement and back to the starting position, that would be considered 1 rep.\n\nA set refers to a group of repetitions performed consecutively. For example, if you perform 10 bicep curls in a row before taking a break, \
that would be considered 1 set of 10 reps.`,
      isCollapsed: true
    },

    {
      question: `What is hypertrophy training?`,
      answer: `Hypertrophy training is a type of strength training that focuses on stimulating muscle growth, called hypertrophy, rather than focusing solely on increasing strength. \
Typically, this type of training involves performing exercises with moderate to high repetition ranges and a moderate to low number of sets. \n\nThe basis for this program is to maximize muscle growth while minimizing Delayed Onset Muscle Soreness (DOMS) and injury.`,
      isCollapsed: true
    },

    {
      question: `How do I select the appropriate starting weight for an exercise?`,
      answer: `Selecting the appropriate weight for an exercise is crucial for ensuring that you are working out at the right intensity. If the weight is too light, you won't be challenging your muscles enough to stimulate growth. \
If the weight is too heavy, you risk injury and won't be able to achieve the proper volume requred to stimulate muscle growth.\n
For this specific program, it is recommended to start at 90% of your 10 Rep Max (10RM) for each exercise. Find your 10RM, multiply that number by 0.9, then round to the nearest 5lb increment to determine your starting weight.\n
The idea is to start with a weight that is challenging, but allows you to complete the desired number of repetitions with proper form. If you find that the weight is too light or too heavy, adjust it accordingly.`,
      isCollapsed: true
    },

    {
      question: `What is a good range for the number of repetitions for an exercise?`,
      answer: `For hypertrophy training, an ideal rep range is typically between 8 and 15 reps. Less than 8 reps will not stimulate the muscle enough. More than 15 reps indicates that the weight may too light and is not providing enough stimulation.`,
      isCollapsed: true
    },

    {
      question: `What does it mean to train "to failure" in fitness?`,
      answer: `Training "to failure" refers to performing repetitions of an exercise until the muscles can no longer complete another full repetition with proper form. It involves pushing oneself to maximal effort within a set, \
aiming to exhaust the targeted muscles. While it can stimulate muscle growth and strength gains, consistently training to failure may increase fatigue and the risk of overuse injuries.`,
      isCollapsed: true
    },

    {
      question: `What is "10 Rep Max" (10RM)?`,
      answer: `10RM is the maximum amount of weight you can lift for 10 repetitions of an exercise using proper form. This program uses your initial weight input, which should be 90% of your 10RM, \
to determine the appropriate weight for each exercise in the subsequent weeks in order to progressively overload your muscles at an accomplishable pace. When starting a new mesocycle, \
it is important to re-evaluate your 10RM and adjust your starting weight accordingly.`,
      isCollapsed: true
    },

    {
      question: `What is "Reps in Reserve" (RIR)?`,
      answer: `RIR stands for "Reps in Reserve". It is a measure of how many more repetitions you could have performed with a given weight before reaching failure. For example, if you complete a set of 10 repetitions and you feel that you could have done 2 more reps,\
then your RIR for that set is 2. RIR is a useful tool for gauging the intensity of your workouts and adjusting your training volume and load accordingly. Each week you will have a RIR goal to aim for, which will help you to progressively overload \
your muscles, improving your strength and endurance.`,
      isCollapsed: true
    },

    {
      question: `What is a "mesocycle"?`,
      answer: `A mesocycle is a specific period of time, during which you will be following a particular training program. It is typically several weeks long and is designed to help you achieve specific fitness goals.`,
      isCollapsed: true
    },

    {
      question: `What should I do If I experience pain/soreness during these workouts?`,
      answer: `Stop the exercise. If an exercise causes pain, stop doing it. Pain is a signal from your body that something is wrong.\n\nDecrease the weight: If a particular weight is causing you discomfort, try reducing the weight. \
You can still get an effective workout with lighter weights, especially if you increase the number of repetitions.\n\nRest and recover: Give your body time to heal by taking a break from the activity that caused the pain.\n
Apply ice: If the pain is due to a minor injury, applying ice can help reduce inflammation and relieve pain.\n\nSeek medical advice: If the pain is severe, persists for more than a few days, or if you're unsure of its cause, \
it's important to seek advice from a healthcare professional.`,
      isCollapsed: true
    },

    {
      question: `What can I do on rest days?`,
      answer: `Rest days are an important part of any fitness routine. They allow your body to recover and repair itself, which is crucial for muscle growth and preventing injuries.\n\nLight Exercise: Engage in light activities like walking, cycling, or yoga. \
These activities can help increase blood flow and speed up the recovery process.\n\nStretch and Foam Roll: Stretching and foam rolling can help to relieve muscle tension and increase your range of motion.\n
Hydrate and Eat Nutritious Food: Drink plenty of water and eat a balanced diet to help your body recover and prepare for your next workout.\n\nSleep: Quality sleep is essential for muscle recovery and overall health.`,
      isCollapsed: true
    },

    {
      question: `How long should each workout session typically take?`,
      answer: `This can vary depending on your routine and how long it takes you to complete your sets. However, a typical workout might last anywhere from 45 minutes to an hour and a half.`,
      isCollapsed: true
    },
    {
      question: `Does the app offer video demonstrations or instructions for each exercise?`,
      answer: `When selecting an exercise during your routine creation, you have the option to view a video demonstration of the exercise. Simply click on the play button adjacent to your chosen exercise. \
Once your mesocycle has been created, you'll notice a play button next to each exercise for that day. This allows you to view the demonstration video at any time during your routine.`,
      isCollapsed: true
    },

    {
      question: `Is it possible to select identical exercises for consecutive options in a program?`,
      answer: `While technically possible, it's strongly recommended to introduce variety with two distinct exercises. This strategy helps prevent rapid fatigue accumulation and could potentially enhance overall muscle development. \
However, if someone feels confident in enduring the repetition and has previously seen benefits from a consistent routine focusing on a specific muscle group, they might choose the same exercise multiple times within the week. \
This approach isn't advisable for most individuals seeking optimal muscle growth and balanced development.`,
      isCollapsed: true
    },

    {
      question: `What if I miss a day?`,
      answer: `In case you miss a workout day, aim to redistribute the exercises across the remaining days of the week and incorporate the missed day into your next training session. If you happen to miss multiple consecutive days, \
consider engaging in lighter workouts for the remainder of that week and recommence your current routine in the following week.`,
      isCollapsed: true
    },

    // Add more questions, answers, and isCollapsed properties as needed
  ];
  // Use the useState hook to manage the FAQ data and the active tab state
  const [questions, setQuestions] = useState(initialData);
  const [activeTab, setActiveTab] = useState('FAQ'); // 'FAQ' or 'GeneralInformation'

  // Function to toggle the collapse state of a FAQ item
  const toggleCollapse = (index) => {
    const updatedQuestions = questions.map((question, i) => ({
      ...question,
      isCollapsed: i === index ? !question.isCollapsed : true,
    }));
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
    width: '70%', 
    alignSelf: 'center', 
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
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  questionText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  answer: {
    fontSize: 16,
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
    color: 'black',
  },
  questionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 15,
  },
});

export default HelpScreen;